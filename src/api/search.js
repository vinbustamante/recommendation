const security = require('../lib/security');
const query = require('../lib/query');
const recommendation = require('../lib/recommendation');
const config = require('../../config');

function recommend(req, res) {   
    var attributes = security.getSearchableAttributes(req.query);    
    var recordSize = req.query[config.system.params.recordSize] || 10;
    return  recommendation.recommend(attributes, recordSize);
}


module.exports = {
    recommend : recommend
};