const express = require("express");
const app = express();
// npm i cookie parser
const cookieParser = require("cookie-parser");
// jsonwebtoken
// token name is -> JWT & mechanism -> cookies
// repersent -> collection
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const planRouter = require("./routes/planRoutes");
const reviewModel = require("./model/reviewModel");
// to  add post body data to req.body
app.use(express.json());
// add cookies to req.cookies
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/plan", planRouter);
app.post("/api/v1/review", async function (req, res) {
    try {
        let reviewData = req.body;
        let review = await reviewModel.create(reviewData);
        res.status(201).json({
            review,
            result: "created"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})
app.get("/api/v1/review", async function (req, res) {
    try {
        
        let reviews = await reviewModel.find()
        .populate("user plan")
        res.status(200).json({
            reviews,
            result: "all results send "
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
})
// update user Profile
// delete user profile

// locahost:3000 -> express API 
app.listen(3000, function () {
    console.log("server started at port 3000");
})









// create -> deleteUser, updateUser
// {
//     name: 'Jasbir',
//     password: 'abcd',
//     confirmPassword: 'abcd',
//     email: 'abc@gmail.com',
//     phonenumber: '8800953687',
//     pic: 'dp.png',
// -> unnique id
//     _id: new ObjectId("62d2f2c0aaa6d2fe55d1e68c"),
// mongoose
//     __v: 0
//   }