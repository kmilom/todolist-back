const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

function mysqlConnection (){
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if(err){
            console.log("Error en la db: ", err);
        } else{
            console.log("DB conectada!");
        }
    })

    connection.on('error', err => {
        console.log("Error en la db: ", err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            mysqlConnection();
        } else{
            throw err;
        }
    });
}

mysqlConnection();

function getAll(table) {
    return new Promise((resolve, reject) => {
        if (table === 'People') {
            connection.query(`SELECT Name, LastName, Birthdate, Email, Gender FROM ${table} INNER JOIN Genders ON People.IdGender = Genders.Id`, 
                (error, response) => {
                if (error) return reject(error);
                resolve(response);
            });
        } else {
            connection.query(`SELECT * FROM ${table}`, (error, response) => {
                if (error) return reject(error);
                resolve(response);
            });
        }
    });
}


function getById(table, id){
    return new Promise((resolve, reject) => {
        if (table === 'People') {
            connection.query(`SELECT Name, LastName, Birthdate, Email, Gender FROM ${table} INNER JOIN Genders ON People.IdGender = Genders.Id WHERE People.Id = ${id}`, 
                (error, response) => {
                if (error) return reject(error);
                resolve(response);
            });
        } else if (table === 'Tasks'){
            connection.query(`SELECT * FROM ${table} WHERE IdUser = ${id}`, (error, response) => {
                if (error) return reject(error);
                resolve(response);
            });
        } else {
            connection.query(`SELECT * FROM ${table} WHERE Id = ${id}`, (error, response) => {
                if (error) return reject(error);
                resolve(response);
            });
        }
    });
}

function addNew(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, response) => {
            if (error) return reject(error);
            resolve({ Id: response.insertId, ...data }); 
        });
    });
}

function updateElement(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE Id = ?`, [data, data.Id], (error, response) => {
            if (error) return reject(error);
            resolve(response);
        });
    });
}

function deleteElement(table, id){
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE Id = ${id}`, (error, response) => {
            if (error) return reject(error);
            resolve(response);
        });
    })
}

function query(table, data){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE Username = ?`, [data.Username], (error, response) => {
            if (error) return reject(error);
            if (response.length > 0) {
                resolve(response[0]); 
            } else {
                reject(new Error('Usuario no encontrado.'));
            }
        });
    });
}


module.exports = {
    getAll,
    getById,
    addNew,
    updateElement,
    deleteElement,
    query
}