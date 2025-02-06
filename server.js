const { use } = require("chai");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

// ------ WRITE YOUR SOLUTION HERE BELOW ------//

// Your solution should be written here

//Write the signup endpoint
app.post("/signup", (req, res) => {

  const userHandle = req.body.userHandle;
  const password = req.body.password;

  if (!userHandle || !password) {
    res.status(400).send("Invalid request body");
  } 

  //should reject if userHandle is shorter than 6 chars
  //should reject if password is shorter than 6 chars
  if (userHandle.length < 6 || password.length < 6) {
    res.status(400).send("Invalid request body");
  } 


  

  
  res.status(201).send("User registered successfully");  
});



// ------------------ Login endpoint ------------------


const jwt = require("jsonwebtoken");
const JWTSECRET = "123";

// Dummy users for testing
const users = [
  { userHandle: "DukeNukem", password: "123456" },
  { userHandle: "DukeNukem1", password: "correctpassword" }
];

//The login endpoint
app.post("/login", (req, res) => {

  const { userHandle, password, ...extraFields } = req.body;

  // Check if extra fields exist (only allow userHandle and password)
  if (Object.keys(extraFields).length > 0) {
    return res.status(400).send("Invalid request body: contains extra fields");
  }



  if (!userHandle || !password) {
    return res.status(400).send("Invalid request body: Missing username or password");
  } 

  // Ensure userHandle and password are strings
  if (typeof userHandle !== "string" || typeof password !== "string") {
    return res.status(400).send("Invalid request body: Username and password must be strings");
  }


  //should reject if userHandle is shorter than 6 chars
  //should reject if password is shorter than 6 chars
  if (userHandle.length < 6 || password.length < 6) {
    return res.status(400).send("Invalid request body: userHandle and password must be at least 6 characters long");
  } 
  

  // Verify if the provided username and password match any stored user
  const user = users.find(element => element.userHandle === userHandle && element.password === password);

  if (!user) {
    return res.status(401).send("Unauthorized: Incorrect username or password");
  }
  


  try {
    const token = jwt.sign(
      //payload
      { userHandle: userHandle }, 
      //secret
      JWTSECRET
    );
    res.status(200).send({ jsonWebToken: token });
  } 
  catch (error) {
    res.status(500).send("Internal server error");
  }  
  
});



























//------ WRITE YOUR SOLUTION ABOVE THIS LINE ------//

let serverInstance = null;
module.exports = {
  start: function () {
    serverInstance = app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  },
  close: function () {
    serverInstance.close();
  },
};
