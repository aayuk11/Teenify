const express = require("express");
const { connectToMongoDB } = require('./connect')
const path = require("path")
const URL = require('./models/url');
const cookieParser = require('cookie-parser')
// const {restrictToLoggedinUserOnly , checkAuth} = require('./middlewares/auth')
const { checkForAuthentication , restrictTo} = require('./middlewares/auth')

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRoute')
const userRoute = require('./routes/user')

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/teenify')
.then (()=> console.log("MongoDB connected"))

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false})) //for form data
app.use(cookieParser())
app.use(checkForAuthentication)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req , res)=>{
  const allUrls = await URL.find({});

  return res.render("index",{
    urls: allUrls,
  })
})

app.use("/url" ,restrictTo(["NORMAL"])  , urlRoute)
app.use("/user", userRoute)
app.use("/" , staticRoute)

// Server Side Rendering -> 
// Write html on server side -> complicated
// For ease we use EJS
// app.get('/' ,checkAuth, async(req , res)=>{


app.get("/url/:shortID", async (req, res) => {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
      {
        shortID : shortID,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL); 
 });

// app.use("/url" , restrictToLoggedinUserOnly , urlRoute)


// app.use("/user", userRoute)
// app.use("/" , checkAuth , staticRoute)

app.listen(PORT , ()=> console.log(`Server started at port : ${PORT}`))