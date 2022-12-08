const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = require('dotenv').config().parsed.jwt;
const Users = require('../models/Users');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res){
    const loginUser = await Users.findOne({login:req.body.login})

    if (loginUser){
        // Пользователь существует, проверяем пароль
        const passwordResult = bcrypt.compareSync(req.body.password, loginUser.password)
        if (passwordResult){
            // пароли совпали
            const webToken = jwt.sign({
                login: loginUser.login,
                userId: loginUser._id,
            }, secretKey, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${webToken}`
            })
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают'
            })
        }
    } else {
        res.status(404).json({
            message: 'Такой логин не найден'
        })
    }
}

module.exports.register = async function (req, res){
    const register = await Users.findOne({email:req.body.email})

    if (register){
        // Пользователь существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Такой email уже зарегистрирован'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new Users({
            login: req.body.login,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            errorHandler(res, e);
        }
    }
}
