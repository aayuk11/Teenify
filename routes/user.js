// const express = require('express')
// const {handleUserLogin , handleUserSignup} = require("../controllers/user");

// const router = express.Router();


// router.post('/', handleUserSignup)
// router.post('/login',handleUserLogin)

// module.exports = router;
const express = require('express')
const router = express.Router();
const {handleUserSignIn , handleUserSignUp} = require("../controllers/user");



router.post('/signup', handleUserSignUp)
router.post('/login',handleUserSignIn)

router.get('/login', (req, res) => res.render('login'))
router.get('/signup', (req, res) => res.render('signup'))


module.exports = router;


