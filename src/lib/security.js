const _ = require('underscore');
const config = require('../../config');

function getSearchableAttributes(params) {
    var attributes = [];
    if (typeof params === 'object') {
        Object.keys(params)
            .forEach(key => {
                if((key !== 'longitude' && key !== 'latitude') && config.search.attributes.indexOf(key) >= 0) {
                    var value = params[key];
                    var type = config.search.type[key];
                    if (type === 'number') {
                        if (value.indexOf('.') >= 0) {
                            value = parseFloat(value);
                        } else {
                            value = parseInt(value);
                        }
                    }
                    attributes.push({
                        name : key,
                        type : type,
                        value : value
                    });                    
                }
            });
        if (params.longitude && params.latitude) {
            attributes.push({
                name : 'location',
                type : 'geo',
                value : {
                    lat : params.latitude,
                    lon : params.longitude
                }
            });
        }
    }
    return attributes;
}

module.exports = {   
    getSearchableAttributes : getSearchableAttributes
};