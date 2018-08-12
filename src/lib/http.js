const request = require('request');

function get(option) {
    var url;
    var header;
    var forceLocal = false;
    if (typeof option === 'string') {
        url = option;
        header = {};
    } else {
        url = option.url;
        header = option.header || {};
    }
    return _request({
        url: url,
        method: 'GET',
        header: header,
        data: ''
    });
}

function post(option) {
    option = option || {};
    if (typeof option.data === 'object') {
        option.data = JSON.stringify(option.data);
    }
    return _request({
        url: option.url,
        method: 'POST',
        forceLocal: option.forceLocal,
        header: option.header || {},
        data: option.data
    });
}

function _request(args) {
    return new Promise((resolve, reject) => {
        var reqData = {
            uri: args.url,
            headers: args.header || {},
            method: args.method,
            followAllRedirects: true,
            body: args.data
        };
        var defered = {
            resolve: resolve,
            reject: reject
        };
        var method = args.method.toLowerCase();
        if (method === 'get') {
            request.get(
                reqData,
                function (err, response) {
                    _handleRequest(defered, err, response);
                }
            );        
        } else if (method === 'post') {
            request.post(
                reqData,
                function (err, response) {
                    _handleRequest(defered, err, response);
                }
            );
        }
    });
}

function _handleRequest(defered, err, response) {
    if (err) {
        defered.reject(err);
    } else if (response.statusCode >= 400) {        
        var error = new Error(response.body);
        error.statusCode = response.statusCode
        defered.reject(error);
    } else {        
        defered.resolve(response.body);
    }
}


module.exports = {
    get: get,
    post: post
};