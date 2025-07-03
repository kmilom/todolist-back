const express = require('express');

const response = require("../../network/responses");
const controller = require('./controller');
const authenticateToken = require('./middleware/auth');

const router = express.Router();

router.get('/login', login);
router.get('/', getAll);
router.get('/:id', authenticateToken, getById);
router.post('/', addNew);

async function login(req, res) {
    console.log("Usuario recibido: ", req.query.Username);
    try {
        
        const token = await controller.login(req.query.Username, req.query.Password);
        response.succes(req, res, token, 200); 
    } catch (err) {
        console.error(err); 
        response.error(req, res, err.message || 'Error en el servidor', 500);
    }
}


async function getAll(req, res){
    try{
        const items = await controller.getAll();
        response.succes(req, res, items, 200);
    } catch(err){
        response.error(req, res, err, 500);
    }
}

async function getById(req, res){
    try{
        const item = await controller.getById(req.params.id);
        response.succes(req, res, item, 200);
    } catch(err){
        response.error(req, res, err, 500);
    }
    
}

async function addNew(req, res) {
    try{
        const item = await controller.addNew(req.body);
        console.log(item.Id);
        response.succes(req, res, item.Id, 201);
    } catch(err){
        console.error("Error en addNew: ", err);
        response.error(req, res, err, 500);
    }
}

module.exports = router;