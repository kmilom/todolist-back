const db = require('../../db/mysql');

const TABLE = 'TaskStates';

function getAll () {
    return db.getAll(TABLE);
}

module.exports = {
    getAll,
}