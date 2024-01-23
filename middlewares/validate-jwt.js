const { response } = require('express');
const jwt = require('jsonwebtoken');
const { NOT_TOKEN, INVALID_TOKEN } = require('../messages/errors/errorsMessages');

const validateJWT = ( req, res = response, next) => {
    
    // x-token headers
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            errorMessage: NOT_TOKEN.errorMessage,
            errorCode: NOT_TOKEN.errorCode,
            http_status: res.statusCode
        });
    }

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT
        );
        
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            errorMessage: INVALID_TOKEN.errorMessage,
            errorCode: INVALID_TOKEN.errorCode,
            http_status: res.statusCode
        });
        
    }

    next();
}


module.exports = {
    validateJWT
}
