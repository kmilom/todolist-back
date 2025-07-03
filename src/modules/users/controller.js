const db = require('../../db/mysql');
const bcrypt = require('bcryptjs');
const auth = require('../../auth')

const TABLE = 'Users';

async function login(Username, Password) {
    console.log("controlador:", Username);
    
    const data = await db.query(TABLE, { Username });
    console.log("Datos: ", data)

    if (!data || data.length === 0) {
        throw new Error('Usuario no encontrado.');
    }

    const isMatch = await bcrypt.compare(Password, data.Password);
    if (isMatch) {
        const token = auth.createToken({ Id: data.Id, Username: data.Username });
        return {
            token,
            Id:data.Id
        }
    } else {
        throw new Error('Información Incorrecta.');
    }
}

function getAll () {
    return db.getAll(TABLE);
}

function getById (id) {
    return db.getById(TABLE, id)
}

async function addNew (data) {

    const authData = {
        Id: data.Id,
        Username: data.Username
    }

    authData.Password = await bcrypt.hash(data.Password, 5);

    return db.addNew(TABLE, authData);
}

module.exports = {
    login,
    getAll,
    getById, 
    addNew
}