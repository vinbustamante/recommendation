const _ = require('underscore');
const sinon = require('sinon');
const expect = require('expect');
const recommendation = require('./recommendation');
const query = require('./query');
var es = require('./es');

describe('lib => recommendation', () => {
    describe('recommendation.recommend', () => {

        beforeEach(() => {
            sinon.mock(query);
            sinon.mock(es);
        });

        afterEach(() => {
            sinon.mock(query).restore();
            sinon.mock(es).restore();
        });

        it('should return array for parameter that is not an array.', (done) => {
            recommendation.recommend({
                    isStudent: false
                })
                .then(results => {
                    expect(_.isArray(results)).toBe(true);
                    done();
                });
        });

        it('should return array base on attributes pass.', (done) => {
            recommendation.recommend([{
                    name: 'isStudent',
                    type: 'boolean',
                    value: true
                }])
                .then(results => {
                    expect(_.isArray(results)).toBe(true);
                    done();
                });
        });

        it('should call query.convert', (done) => {
            var attributes = [{
                name: 'isStudent',
                type: 'boolean',
                value: true
            }];
            var mockQuery = sinon.mock(query);
            mockQuery.expects('convert').once().withArgs(attributes);
            recommendation.recommend(attributes)
                .then(results => {
                    mockQuery.verify();
                    done();
                })
        });

        it('should call es.search', (done) => {
            var attributes = [{
                name: 'isStudent',
                type: 'boolean',
                value: true
            }];
            var mockEsResponse = {
                hits : {
                    total : 1,
                    max_score : 1,
                    hits : [
                        {
                            _score:1,
                            _source : {
                                name : 'test',
                                age : 20,
                                monthlyIncome : 1500,
                                experienced : true,
                                location : {
                                    lat : 1,
                                    lon : 1
                                }                               
                            }
                        }
                    ]
                }
            };
            var mockQuery = sinon.mock(query);
            var mockEs = sinon.mock(es);
            mockQuery.expects('convert').once().withArgs(attributes);
            mockEs.expects('search').once().returns(new Promise((resolve, reject) => {
                resolve(mockEsResponse);
            }));
            recommendation.recommend(attributes)
                .then(results => {
                    mockQuery.verify();
                    mockEs.verify();
                    done();
                });
        });

    });


});