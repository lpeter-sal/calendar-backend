/*
    Funciones para archivo /routes/auth.js
    Endpoints /new, /, /renew
*/


const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { REGISTERED_USER, USER_NOT_EXIST, USER_CREDENTIALS, UNEXPECTED_ERROR } = require('../messages/errors/errorsMessages');
const { genereteJWT } = require('../helpers/jwt');
const { catchMessage } = require('../helpers/catchMessage');

const createUser = async( req, res = response ) => {

    const {  email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if ( user ){
            return res.status(409).json({
                ok: false,
                errorMessage: REGISTERED_USER.errorMessage,
                errorCode: REGISTERED_USER.errorCode,
                http_status: res.statusCode
            });
        }

        user = new User( req.body );

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
        await user.save();

        const token = await genereteJWT( user.id, user.name );
    
        res.status(201).json({
            ok: true,
            msg: 'Register',
            name: user.name,
            email: user.email,
            token
        });
        
    } catch (error) {
        catchMessage( error, res );
    }
}

const loginUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if ( !user ){
            return res.status(404).json({
                ok: false,
                errorMessage: USER_NOT_EXIST.errorMessage,
                errorCode: USER_NOT_EXIST.errorCode,
                http_status: res.statusCode
            });
        }

        // Confirm the password
        const validPassword = bcrypt.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                errorMessage: USER_CREDENTIALS.errorMessage,
                errorCode: USER_CREDENTIALS.errorCode,
                http_status: res.statusCode
            });
        }

        //GENERETE OUR JWT
        const token = await genereteJWT( user.id, user.name );

        res.json({
            ok: true,
            msg: 'Login',
            uid: user.id,
            name: user.name,
            token
        });

        
    } catch (error) {
        catchMessage( error, res );
    }
}

const renewToken = async(req, res = response ) => {

    const { uid, name } = req;

    const token = await genereteJWT( uid, name );

    res.json({
        ok: true,
        msg: 'Renew',
        token
    });

}



module.exports = {
    createUser,
    loginUser,
    renewToken
}