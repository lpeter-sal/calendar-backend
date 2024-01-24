/*
    Funciones para archivo /routes/events.js
    Endpoints get('/'), post('/'), put('/:id'), delete('/:id')
*/

require('mongoose');
const { response } = require('express');
const Event = require('../models/Events');
const { UNEXPECTED_ERROR, EVENTID_NOT_EXIST, NOT_PRIVILEGE } = require('../messages/errors/errorsMessages');
const { catchMessage } = require('../helpers/catchMessage');


const getEvents = async( req, res = response ) => {

    const events = await Event.find()
                              .populate('user', 'name');

    res.status(200).json({
        ok: true,
        msg: 'Get events',
        events
    });
}

const createEvent = async( req, res = response ) => {

    const event = new Event( req.body );

    try {
        event.user = req.uid;

        const saveEvent = await event.save();

        res.status(201).json({
            ok: true,
            msg: 'Create event',
            saveEvent
        });
        
    } catch (error) {
        catchMessage( error, res );
    }
}

const updateEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {
        
        const event = await Event.findById(eventId);

        if( !event ) {
            return res.status(404).json({
                ok: false,
                errorMessage: EVENTID_NOT_EXIST.errorMessage,
                errorCode: EVENTID_NOT_EXIST.errorCode,
                http_status: 404
            });
        }

        if( event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                errorMessage: NOT_PRIVILEGE.errorMessage,
                errorCode: NOT_PRIVILEGE.errorCode,
                http_status: 401
            });
        }
        
        const newEvent = {
            ...req.body,
            user: uid
        }

        const updateEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.status(200).json({
            ok: true,
            msg: 'Update event',
            updateEvent
        });

    } catch (error) {
        catchMessage( error, res );
    }
}

const deleteEvent = async( req, res = response ) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if( !event ) {
            return res.status(404).json({
                ok: false,
                errorMessage: EVENTID_NOT_EXIST.errorMessage,
                errorCode: EVENTID_NOT_EXIST.errorCode,
                http_status: 404
            });
        }

        if( event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                errorMessage: NOT_PRIVILEGE.errorMessage,
                errorCode: NOT_PRIVILEGE.errorCode,
                http_status: 401
            });
        }

        await Event.findByIdAndDelete( eventId );

        res.status(200).json({
            ok: true,
            msg: `Event removed with uid: ${ eventId }`,
        });

        
    } catch (error) {
        catchMessage( error, res );
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}