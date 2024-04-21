import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js"
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import { MemoryStore } from "express-session";


const app = express();
export default app;
dotenv.config({
    path:"./config/.env",
});


//Using MiddleWares

app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,

    cookie:{
        maxAge: 86400000,
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },

    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
})
);

app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({
    extended:true,
}))




app.use(
    cors({
   credentials:true,
   origin: process.env.FRONTEND_URL,
   methods:["GET","POST","PUT","DELETE"]
}))

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");


connectPassport();





//Importing Routes

import userRoute from "./routes/user.js"
import orderRoute from "./routes/order.js"



app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);



//Using error middleware

app.use(errorMiddleware)