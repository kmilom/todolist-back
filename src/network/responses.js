exports.succes = function (req, res, msg = '', status = 200){
    res.status(status).send({
        error: false,
        status: status,
        body: msg
    }); 
}

exports.error = function (req, res, msg = 'Error Interno', status = 500){
    res.status(status).send({
        error: true,
        status: status,
        body: msg
    });
}