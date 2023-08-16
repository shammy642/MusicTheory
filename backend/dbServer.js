const express = require("express")
const app = express()
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const generateAccessToken = require("./generateAccessToken")
const authenticateAccessToken = require("./authenticateAccessToken")

require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})

db.getConnection((err, connection) => {
   if (err) throw (err)
   console.log("DB connected successful: " + connection.threadId)
})
const port = process.env.PORT
app.listen(port, () => console.log(`Server Started on port ${port}...`))

app.use(express.json())

app.post("/createUser", async (req, res) => {
   const user = req.body.name;
   try {
      await bcrypt.hash(req.body.password, 10)
         .then(async (result) => {
            db.getConnection(async (err, connection) => {
               if (err) throw (err)
               const sqlSearch = "SELECT * FROM userTable WHERE user = ?"
               const search_query = mysql.format(sqlSearch, [user])
               const sqlInsert = "INSERT INTO userTable VALUES (0,?,?)"
               const insert_query = mysql.format(sqlInsert, [user, result])
              
               try {
                  await connection.query(search_query, async (err, result) => {
                     if (err) throw (err)
                     console.log("------> Search Results")
                     console.log(result.length)
                     if (result.length != 0) {
                        connection.release()
                        console.log("------> User already exists")
                        res.sendStatus(409)
                     }
                     else {
                        await connection.query(insert_query, (err, result) => {
                           connection.release()
                           if (err) throw (err)
                           console.log("--------> Created new User")
                           console.log(result.insertId)
                           res.sendStatus(201)
                        })
                     }
                  })
               }
               catch (error) {
                  connection.release()
                  console.log("Error: ", error)
               }
            })
         })
   }
   catch (error) {
      console.log(error)
   }
})

//Login
app.post("/login", async (req, res) => {
   const user = req.body.name;
   const password = req.body.password;
   db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const sqlSearch = "SELECT * FROM userTable WHERE user = ?"
      const search_query = mysql.format(sqlSearch, [user])
      try {
         await connection.query(search_query, async (err, result) => {
            connection.release()
            if (err) throw (err)
            if (result.length == 0) {
               console.log("User does not exist")
               res.sendStatus(404)
            }
            else {
               const hashedPassword = result[0].password
               const userId = result[0].userId
               if (await bcrypt.compare(password, hashedPassword)) {
                  console.log(`${user}--------> Login successful`)
                  console.log("---------> Generating accessToken")
                  const token = generateAccessToken({ user: user, userId: userId })
                  console.log(token)
                  res.json({ message: `${user}: ${userId} is logged in!`, accessToken: token })
               }
               else {
                  console.log("Login unsuccessful")
                  res.send('Password incorrect!')
               }
            }
         })
      }
      catch (error) {
         console.log(error)
      }
   })
})

app.post("/completeSection", authenticateAccessToken, async (req, res) => {
   const sectionName = req.body.sectionName;
   const userId = req.user.userId;

   db.getConnection(async (err, connection) => {
      if (err) throw (err);

      const sqlGetSelection = "SELECT sectionId FROM sectionsTable WHERE sectionName = ?";
      const getSectionQuery = mysql.format(sqlGetSelection, [sectionName]);

      try {
         await connection.query(getSectionQuery, async (err, sectionResult) => {
            if (err || sectionResult.length == 0) {
               connection.release();
               return res.status(400).send("Invalid section name.")
            }

            const sectionId = sectionResult[0].sectionId;

            const sqlInsert = "INSERT INTO userSectionsCompleted (userId, sectionID) VALUES (?, ?)";
            const insert_query = mysql.format(sqlInsert, [userId, sectionId]);

            await connection.query(insert_query, (err) => {

               connection.release();
               if (err) throw (err);
               console.log(`User ${userId} completed section ${sectionName}`);
               res.status(201).send(`User ${userId} completed section ${sectionName}`);
            });
         });
      } catch (error) {
         console.log(error);
      }
   })
})

app.get("/getCompletedSections", authenticateAccessToken, async (req, res) => {
   const userId = req.user.userId;

   const sqlGetSections = "SELECT sectionId FROM userSectionsCompleted WHERE userId = ?";
   const getSectionQuery = mysql.format(sqlGetSections, [userId]);

   db.getConnection((err, connection) => {
       if (err) {
           console.error("Error connecting to the database:", err);
           return res.status(500).send("Internal server error");
       }

       connection.query(getSectionQuery, (err, results) => {
           connection.release();

           if (err) {
               console.error("Error fetching data from the database:", err);
               return res.status(500).send("Internal server error");
           }

           if (results.length == 0) {
               return res.status(404).send("No completed sections found for this user");
           }

           const completedSections = results.map(row => row.sectionId);
           
           return res.json({"completedSections": completedSections});
       });
   });
});

