const { Router } = require("express");
const userRouter = Router();
const { hashPass, comparePass, updatePass, tokenCheck } = require("../middleware");
const { createUser, login, getAllUsers, readUser, updateUser, deleteUser } = require("./controllers");

userRouter.post("/user", hashPass, createUser);                 //? creates a user, hashes password
userRouter.get("/user", getAllUsers);                           //? displays list of current users names
userRouter.patch("/user", updatePass, updateUser);              //? Updates a user
userRouter.delete("/user", deleteUser);                         //? Delete's a user specified by username

userRouter.post("/login", comparePass, login);                  //? logs in by comparing entered Pass to hashed one
userRouter.get("/login", tokenCheck, login);                    //? logs in using a JSON Web Token


// userRouter.post("/test", comparePass, readUser);                //? <-- My own test route


module.exports = userRouter;