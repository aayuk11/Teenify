const User = require('../models/user');
const {v4:uuidv4} = require('uuid')
const { setUser } = require ('../service/auth')
async function handleUserSignUp(req, res) {
    const {
        name,
        email,
        password, 
        confirmPassword
    } = req.body;
    // if (password !== confirmPassword) {
    //     return res.render('signup', { error: 'Passwords do not match' });
    // }
    // if (password !== confirmPassword) {
    //     return res.render('signup', { error: 'Passwords do not match' });
    // }

    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/');
}

async function handleUserSignIn(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if (!user) {
        return res.render('login', {
            error: 'Invalid username or password'
        });
    }
    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect('/');
}

module.exports = {
    handleUserSignUp,
    handleUserSignIn
}