// /**
//  * This will be the starting file of a project
//  */
// const express = require("express")
// const mongoose = require("mongoose")
// const app = express()
// const server_config = require("./configs/server.config")
// const db_config = require("./configs/db.config")
// const user_model = require("./models/user.model")
// const bcrypt = require("bcryptjs")

// app.use(express.json()) //Middleware (used to convert POSTMAN[json] code to nodejs[jsObject]){means whenever u get json convert that into the jsObject}
// /**
//  * Create an admin user at the starting of the application
//  * if not already present
//  */

// // Connection with mongodb
// mongoose.connect(db_config.DB_URL)

// const db = mongoose.connection

// db.on("error" , ()=>{
//     console.log(('Error while connecting to the mongoDB'))
// })

// db.once("open", ()=>{
//     console.log("Connected to MongoDB")
//     init()
// })

// async function init() {
//     try{
//         let user = await user_model.findOne({userId : "admin"});

//         if(user){
//             console.log("Admin is already present")
//             return;
//         }

//     }catch(err){
//         console.log("Error while reading the data", err)
//     }
   

//     try{
//         user = await user_model.create({
//             name : "Vishwa",
//             userId : "admin",
//             email : "kank@gmail.com",
//             userType : "ADMIN",
//             password : bcrypt.hashSync("Welcome1", 8)
//         });
//         console.log("Admin Created ", user)
//     }catch(err){
//         console.log("Error while create admin", err)
//     }

// }


// /**
//  * Stich the route to the server                        [in this server.js file we will call this route]
//  */
// require("./routes/auth.routes")(app)


// /**
//  * Start the Server                      
//  */
// app.listen(server_config.PORT, ()=>{
//     console.log("Server Started at port number : ", server_config.PORT)
// })






/**
 * This will be the starting file of a project
 */
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const UserModel = require("./models/user.model");
const bcrypt = require("bcryptjs");

// Middleware to parse JSON request bodies
app.use(express.json()); 

/**
 * Create an admin user at the starting of the application
 * if not already present
 */

// Connect to MongoDB
mongoose.connect(dbConfig.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on("error", () => {
    console.error('Error while connecting to MongoDB');
});

db.once("open", () => {
    console.log("Connected to MongoDB");
    init();
});

async function init() {
    try {
        let user = await UserModel.findOne({ userId: "admin" });

        if (user) {
            console.log("Admin is already present");
            return;
        }

        // Create admin user if not present
        user = await UserModel.create({
            name: "Vishwa",
            userId: "admin",
            email: "kank@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome1", 8)
        });

        console.log("Admin Created:", user);
    } catch (err) {
        console.error("Error while creating admin:", err);
    }
}

/**
 * Attach routes to the server
 */
require("./routes/auth.routes")(app);

/**
 * Start the server
 */
app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port number: ${serverConfig.PORT}`);
});



















