const express = require('express');

const response = require("../../network/responses");
const controller = require('./controller')

const router = express.Router();

router.get('/', getAll);

async function getAll(req, res){
    try{
        const items = await controller.getAll();
        response.succes(req, res, items, 200);
    } catch(err){
        response.error(req, res, err, 500);
    }
}

module.exports = router;