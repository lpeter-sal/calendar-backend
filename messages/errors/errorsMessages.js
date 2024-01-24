
const REGISTERED_USER   = ({ errorCode: '-1', errorMessage: 'REGISTERED USER IN DB' });
const USER_NOT_EXIST    = ({ errorCode: '-2', errorMessage: 'THE USER DOES NOT EXIST IN DB' });
const USER_CREDENTIALS  = ({ errorCode: '-3', errorMessage: 'INCORRECT USER CREDENTIALS' });
const EVENTID_NOT_EXIST = ({ errorCode: '-4', errorMessage: 'THERE IS NO EVENT WITH THAT ID' });
const NOT_PRIVILEGE     = ({ errorCode: '-4', errorMessage: 'YOU DO NOT HAVE THE PRIVILEGE TO EDIT THIS EVENT' });

const NOT_TOKEN         = ({ errorCode: '-27', errorMessage: 'ENTER THE TOKEN IN THE REQUEST' });
const INVALID_TOKEN     = ({ errorCode: '-28', errorMessage: 'INVALID TOKEN' });
const UNEXPECTED_ERROR  = ({ errorCode: '-50', errorMessage: 'AN UNEXPECTED ERROR HAS OCCURRED, PLEASE TRY LATER OR CONTACT THE ADMINISTRATOR' });




module.exports = {
    REGISTERED_USER,
    USER_NOT_EXIST,
    USER_CREDENTIALS,
    EVENTID_NOT_EXIST,
    NOT_PRIVILEGE,
    
    NOT_TOKEN,
    INVALID_TOKEN,
    UNEXPECTED_ERROR
}