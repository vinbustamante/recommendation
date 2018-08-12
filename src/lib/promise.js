const _ = require('underscore');

function exec(fn) {
    return new Promise((resolve, reject) => {
        try {
            var value = fn();
            if (_.isFunction(value.then)) {               
                value.then(value => {
                        resolve(value);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } else {
                resolve(value);
            }
        } catch (err) {
            reject(err);
        }
    });
}

function pass(value) {
    return Promise.resolve(value);
}

function reject(value) {
    return Promise.reject(value);
}

module.exports = {
    exec: exec,
    pass : pass,
    reject : reject
};