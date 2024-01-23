/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/


const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validators');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

//Endpoints 

// Register new user
router.post(
    '/new', 
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validateFields
    ], 
    createUser );

// Authentification User
router.post(
    '/', 
    [ //middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validateFields
    ], 
    loginUser );

// Renew Token
router.get('/renew', validateJWT, renewToken );



module.exports = router;