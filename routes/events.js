/*
    Events Routes / Events
    host + /api/events
*/


const { Router } = require('express');
const router = Router();
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');


// Alls requests need are validations
router.use( validateJWT );


//All requests need token 
//Endpoints

// Get events
router.get('/', getEvents );

// Create event
router.post(
    '/',
    [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        validateFields
    ],
     createEvent );

// Update event
router.put(
    '/:id',
    check('title', 'The title is required').not().isEmpty(),
    check('start', 'Start date is required').custom( isDate ),
    check('end', 'End date is required').custom( isDate ),
    validateFields,
    updateEvent );

// Delete event
router.delete('/:id', deleteEvent );



module.exports = router;
