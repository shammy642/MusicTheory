const { Sequelize, DataTypes } = require('sequelize');
const express = require("express")
const cors = require('cors')
const app = express()
const router = express.Router();
const bcrypt = require("bcrypt")
const generateAccessToken = require("./generateAccessToken")
const authenticateAccessToken = require("./authenticateAccessToken")
require("dotenv").config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE

//Connect to database
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3001/',]
}));
app.use("/api", router)

sequelize.sync()
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const exercises = sequelize.define("exercises", {
    type: { type: DataTypes.TEXT, allowNull: false },
    question: { type: DataTypes.TEXT, allowNull: true },
    answer: { type: DataTypes.TEXT, allowNull: false }
});

const quizes = sequelize.define("quizes", {
    section: { type: DataTypes.TEXT, allowNull: false },
});

const quizExercises = sequelize.define("quizExercises", {
    quizId: {
        type: DataTypes.INTEGER,
        references: {
            model: quizes,
            key: 'id'
        }
    },
    exerciseId: {
        type: DataTypes.INTEGER,
        references: {
            model: exercises,
            key: 'id'
        }
    }
}, {
    timestamps: false
})

quizes.belongsToMany(exercises, {
    through: quizExercises,
    as: 'Exercises',
    foreignKey: 'quizId',
    otherKey: 'exerciseId',
    onDelete: 'CASCADE'
});
exercises.belongsToMany(quizes, {
    through: quizExercises,
    as: 'Quizes',
    foreignKey: 'exerciseId',
    otherKey: 'quizId',
    onDelete: 'CASCADE'
});


const userQuizes = sequelize.define("userQuizes", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    quizId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    indexes: [
        {
          unique: true,
          fields: ['userId', 'quizId']
        }
      ]
});

const users = sequelize.define("users", {
    userName: { type: DataTypes.TEXT, allowNull: false },
    classroomId: DataTypes.INTEGER,
    password: { type: DataTypes.TEXT, allowNull: false },
    emailAddress: { type: DataTypes.TEXT, allowNull: false }
})

router.get("/quizQuestions", async (req, res) => {
    const quizId = req.query.quizId;
    try {
        quizes.findByPk(quizId, {
            include: {
                model: exercises,
                as: 'Exercises',
                attributes: ['type', 'question', 'answer'],
                through: { attributes: [] }
            }
        }).then((data) => {
            res.status(200).send({ quizQuestions: data });
        });
    } catch (error) {
        console.error("Error fetching exercises for quiz:", error);
        res.status(500).send({ error: "Failed to fetch quiz questions." });
    }
});

router.post("/createUser", async (req, res) => {
    const userName = req.body.userName;
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const isExistingUserName = await users.findOne({ where: { userName: userName } });

        if (isExistingUserName) {
            return res.status(409).send({ message: 'Username already exists' });
        }

        const isExistingEmail = await users.findOne({ where: { emailAddress: emailAddress } });

        if (isExistingEmail) {
            return res.status(409).send({ message: 'Email already exists' });
        }

        const user = await users.create({
            userName: userName,
            emailAddress: emailAddress,
            password: hashedPassword
        });

        res.status(201).send({ message: 'User created successfully', user: user });

    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send({ message: 'Server error' });
    }
});

router.post("/login", async (req, res) => {
    const userName = req.body.name;
    const password = req.body.password;

    try {
        const user = await users.findOne({ where: { userName: userName } });

        if (!user) {
            console.log("User does not exist");
            return res.status(404).json({ message: 'User does not exist' });
        }

        const hashedPassword = user.password;
        const userId = user.id; 

        if (await bcrypt.compare(password, hashedPassword)) {
            console.log(`${userName}--------> Login successful`);
            console.log("---------> Generating accessToken");
            const token = generateAccessToken({ user: userName, userId: userId });
            res.json({ message: "User is logged in!", username: userName, accessToken: token });
        } else {
            console.log("Login unsuccessful");
            res.status(401).send('Password incorrect!');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server error' });
    }
});

router.post("/completeQuiz", authenticateAccessToken, async (req, res) => {
    const quizId = req.body.quizId;
    const userId = req.user.userId;

    try {
        const completedQuiz = await quizes.findOne({ where: { id: quizId } });

        if (!completedQuiz) {
            console.log("Quiz does not exist")
            return res.status(404).json({ message: 'Quiz does not exist' });
        }
        
        await userQuizes.upsert({
            userId: userId,
            quizId: quizId
        })
        
        res.status(200).send(`${userId} completed ${quizId} successfully`)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

router.get("/completeQuizes", authenticateAccessToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        userQuizes.findAll({
            attributes: [
                'quizId'
            ],
            where: {
                userId: userId
            }
        })
        .then((data) => {
            const completedQuizesList = data.map((data) => data.quizId)
            res.status(200).send({ completedQuizes: completedQuizesList });
        });
    } catch (error) {
        console.error("Error fetching quizes:", error);
        res.status(500).send({ error: "Failed to fetch completed quizes." });
    }
});

router.get("/quizes", async (req, res) => {
    try {
        quizes.findAll({
            attributes: [
                'id',
                'section'
            ]
        })
        .then((data) => {
            const quizListBySection = data.reduce((acc, quiz) => {
                if (!acc[quiz.section]) {
                    acc[quiz.section] = [];
                }
                acc[quiz.section].push(quiz.id);
                return acc;
            }, {});
            res.status(200).send({ Quizes: quizListBySection });
        });
    } catch (error) {
        console.error("Error fetching quizes:", error);
        res.status(500).send({ error: "Failed to fetch completed quizes." });
    }
});