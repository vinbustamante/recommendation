const _ = require('underscore');
const sinon = require('sinon');
const expect = require('expect');
var query = require('./query');
var config = require('../../config');

describe('lib => query', () => {
    
    beforeEach(() => {
        sinon.stub(config, 'search').value({
            attributes: ['age', 'monthlyIncome', 'experienced', 'lastname', 'longitude', 'latitude'],
            type : {},
            threshold : {}
        });

        sinon.stub(config, 'system').value({
            threshold : {}
        });
    });

    afterEach(() => {
        sinon.stub(config, 'search').restore();
        sinon.stub(config, 'system').restore();
    });

    describe('query.convert',  () => {
        it('should return query object', () => {
            var esQuery = query.convert([
                {
                    name : 'experience',
                    type : 'boolean',
                    value : true
                },
                {
                    name : 'age',
                    type : 'number',
                    value : 40
                },
                {
                    name : 'monthly_income',
                    type : 'number',
                    value : 1500
                },
                {
                    name : 'location',
                    type : 'geo',
                    value : {
                        lat : 19.56667,
                        lon : 40.71667
                    }
                }
            ]);
            //console.log('query 111111111 : ' , JSON.stringify(esQuery));
            //expect(_.isObject(esQuery)).toBe(true);
        });
    });
});