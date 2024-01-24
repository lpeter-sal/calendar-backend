const { UNEXPECTED_ERROR } = require("../messages/errors/errorsMessages");


const catchMessage = (error, res) => {
    console.log(error);
    return res.status(500).json({
            ok: false,
            errorMessage: UNEXPECTED_ERROR.errorMessage,
            errorCode: UNEXPECTED_ERROR.errorCode,
            http_status: 500
        });
}

module.exports = {
    catchMessage
}