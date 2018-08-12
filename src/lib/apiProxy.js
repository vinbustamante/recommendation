var promise = require('./promise');

function action(handler) {
    return (req, res) => {
        return promise.exec(() => {
            return handler(req, res);
        })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);          
            res.status(500)
            res.json({
                status : 500,
                message : err.message
            });
            return promise.reject(err);
        });
    };
}

module.exports = {
    action : action
};