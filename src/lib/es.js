const http = require('./http');
const config = require('../../config');

function search(query, recordCount) {
    recordCount = recordCount || 100;
    var url = config.es.host + '/recommendation-v1/_search?size=' + recordCount;
    return http.post({
        url : url,
        data : query
    }).then(response => {    
        return JSON.parse(response);
    });
}

module.exports = {
    search : search
};