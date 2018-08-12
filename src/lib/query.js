const _ = require('underscore');
const config = require('../../config');

function convert(attributes) {
    var conditions = [];
    var mustConditions = [];
    var subConditions = [];
    if (_.isArray(attributes)) {
        attributes.forEach(attribute => {
            if (attribute.type !== 'geo' && attribute.type !== 'boolean') {
                var termQuery = {};
                termQuery[attribute.name] = attribute.value;
                conditions.push({
                    term : termQuery
                });
            }
            if (attribute.type == 'geo') {
                var geoQuery = {
                    distance : '12km',
                };
                geoQuery[attribute.name] = {
                    lat : attribute.value.lat,
                    lon : attribute.value.lon
                };
                conditions.push({
                    geo_distance : geoQuery
                });
            }
            if (attribute.type == 'number') {
                var threshold = attribute.threshold || config.system.threshold[attribute.name] || 10;
                var value = attribute.value;
                var thresholdValue =  value * (threshold/100);
                var lowerValue = value - thresholdValue;
                var upperValue = value + thresholdValue;
                var rangeQuery = {};
                rangeQuery[attribute.name] = {
                    gte : lowerValue,
                    lte : upperValue
                };
                subConditions.push({
                    range : rangeQuery
                });
            }
            if (attribute.type == 'boolean') {
                var termQuery = {};
                termQuery[attribute.name] = attribute.value;
                mustConditions.push({
                    term : termQuery
                });
            }
        });
    }
    if (subConditions.length > 0) {
        conditions.push({
            bool : {
                should : subConditions
            }
        });
    }
    var esQuery = {
        query : {
            bool :{
                should : conditions
            }
        }
    };
    if (mustConditions.length > 0) {
        esQuery.query.bool.must = mustConditions;
    }
    return esQuery;
}


module.exports = {
    convert : convert
}