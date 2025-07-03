const db = require('../../db/mysql');

const TABLE = 'Tasks';

function getAll () {
    return db.getAll(TABLE);
}

function getById (id) {
    return db.getById(TABLE, id);
}

function addNew (data) {
    return db.addNew(TABLE, data);
}

function updateElement (data) {
    return db.updateElement(TABLE, data);
}

function deleteElement (id) {
    return db.deleteElement(TABLE, id);
}

module.exports = {
    getAll,
    getById,
    addNew,
    updateElement,
    deleteElement
}