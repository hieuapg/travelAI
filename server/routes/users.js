import express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("The token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json("The token is wrong")
            } else {
                req.email = decoded.email;
                req.username = decoded.username;
                next()
            }
        })
    }
}

router.get('/dashboard', verifyUser, (req, res) => {
    res.json("Login success")
})

router.get('/',verifyUser, (req, res) => {
    return res.json({email: req.email, username: req.username})
})

router.post('/signup', (req, res) => {
    const {username, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        User.create({username, email, password: hash})
        .then(user => res.json({user}))
        .catch(err => res.json(err));
    }).catch(err => res.json(err))
});

router.post('/login', (req, res) => {
    const {email, password} = req.body
    User.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({email: user.email, username: user.username},
                      "jwt-secret-key", {expiresIn: '1d'})
                    res.cookie('token', token)
                    res.json("Login success")
                } else {
                    res.json("Password is incorrect")
                }
            })
        } else {
            res.json("No account registered")
        }
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json("Success")
})

export default router;
