const _ = require('underscore');
var query = require('./query');
var es = require('./es');
var promise = require('./promise');

function recommend(attributes, recordCount) {
    recordCount = recordCount || 10;
    return promise.exec(() => {
        if (_.isArray(attributes) && attributes.length > 0) {
            var esQuery = query.convert(attributes);
            var attributeCount = attributes.length;
            console.log('es query : ', JSON.stringify(esQuery));
            results = es.search(esQuery, recordCount)
                .then(response => {
                    var results = [];
                    if (response.hits && response.hits.total > 0) {
                        response.hits
                            .hits
                            .forEach(item => {
                                var src = item._source;
                                results.push({
                                    name: src.name,
                                    age: src.age,
                                    monthlyIncome: src.monthlyIncome,
                                    experienced: src.experienced,
                                    latitude: src.location.lat,
                                    longitude: src.location.lon,
                                    score: item._score / response.hits.max_score,
                                });
                            });
                    }
                    return results;
                });
        } else {
            results = [];
        }
        return results;
    });
}

module.exports = {
    recommend: recommend
};