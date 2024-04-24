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
const PORT = process.env.PORT;
const allowedOrigin = process.env.CORS_ORIGIN;

//Connect to database
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: 'sqlserver',
    dialect: 'postgres',
    schema: DB_DATABASE
});


app.use(express.json())
app.use(cors({
    origin: allowedOrigin
}));
app.use("/api", router)

sequelize.sync()
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

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
            res.status(200).send({ quizQuestions: data.Exercises });
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

    if (!userName || !emailAddress || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    if (userName.length > 50) {
        return res.status(400).send({ message: 'Username is too long' });
    }

    if (emailAddress.length > 100) {
        return res.status(400).send({ message: 'Email address is too long' });
    }

    if (password.length < 8 || password.length > 50) {
        return res.status(400).send({ message: 'Password should be between 8 and 50 characters' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
        return res.status(400).send({ message: 'Invalid email format' });
    }

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

    if (!userName || !password) {
        return res.status(400).send({ message: 'Username and password are required' });
    }

    if (userName.length > 50) {
        return res.status(400).send({ message: 'Username is too long' });
    }

    if (password.length < 8 || password.length > 50) {
        return res.status(400).send({ message: 'Password should be between 8 and 50 characters' });
    }

    try {
        const user = await users.findOne({ where: { userName: userName } });

        if (!user) {
            console.log("User does not exist");
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const hashedPassword = user.password;
        const userId = user.id;
        const emailAddress = user.emailAddress;

        if (await bcrypt.compare(password, hashedPassword)) {
            console.log(`${userName}--------> Login successful`);
            console.log("---------> Generating accessToken");
            const token = generateAccessToken({ userName: userName, userId: userId, emailAddress: emailAddress });
            res.json({ message: "User is logged in!", accessToken: token });
        } else {
            console.log("Login unsuccessful");
            res.status(401).json({ message: 'Invalid username or password' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
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
            res.status(200).send({ quizes: data });
        });
    } catch (error) {
        console.error("Error fetching quizes:", error);
        res.status(500).send({ error: "Failed to fetch completed quizes." });
    }
});