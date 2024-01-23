const jwt = require('jsonwebtoken');

const genereteJWT = ( uid, name ) => {

    return new Promise( (resolve, reject )  => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT, {
            expiresIn: '1h'
        }, ( err, token ) => {
            if( err ){
                console.log(err);
                reject(`Cannot generete token `);
            }

            resolve(token);

        });
    });


}

module.exports = {
    genereteJWT
}