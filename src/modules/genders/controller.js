const db = require('../../db/mysql');

const TABLE = 'Genders';

function getAll () {
    return db.getAll(TABLE);
}

module.exports = {
    getAll,
}