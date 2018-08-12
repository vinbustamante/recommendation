const _ = require('underscore');
const expect = require('expect');
const sinon = require('sinon');
const search = require('./search');
const security = require('../lib/security');
const recommendation = require('../lib/recommendation');
const config = require('../../config');

describe('api => search', () => {  
    describe('search.recommend', () => {
        beforeEach(() => {
            sinon.mock(security);
            sinon.stub(config, 'system').value({
                params : {
                    recordSize : '_totalSize'
                }
            });
        });

        afterEach(() => {
            sinon.mock(security).restore();
            sinon.mock(recommendation).restore();
            sinon.stub(config, 'system').restore();
        });

        it('should default recordsize to 10 if not supplied', () => {
            var queryParams = {
                age : 12
            };
            var atributes = [];
            var mockRecommendation = sinon.mock(recommendation);
            var mockSecurity = sinon.mock(security);
            var mockRes = sinon.mock({json : _.noOp });
            var req = {query:{}};

            sinon.stub(req,'query').value(queryParams);
            mockSecurity.expects('getSearchableAttributes').once().withArgs(queryParams).returns(atributes);
            mockRecommendation.expects('recommend').once().withArgs(atributes, 10);

            var resonse = search.recommend(req, mockRes.object);

            mockSecurity.verify();
            mockRecommendation.verify();
        });

        it('should get the recordsize from params if present', () => {
            var queryParams = {
                age : 12,
                _totalSize : 1000
            };
            var atributes = [];
            var mockRecommendation = sinon.mock(recommendation);
            var mockSecurity = sinon.mock(security);
            var mockRes = sinon.mock({json : _.noOp});
            var req = {query:{}};

            sinon.stub(req,'query').value(queryParams);
            mockSecurity.expects('getSearchableAttributes').once().withArgs(queryParams).returns(atributes);
            mockRecommendation.expects('recommend').once().withArgs(atributes, 1000);

            var resonse = search.recommend(req, mockRes.object);

            mockSecurity.verify();
            mockRecommendation.verify();
        });

        it('should return a promise', () => {
            var queryParams = {
                age : 12
            };
            var atributes = [];
            var mockRecommendation = sinon.mock(recommendation);
            var mockSecurity = sinon.mock(security);
            var mockRes = sinon.mock({json : _.noOp});
            var req = {query:{}};

            sinon.stub(req,'query').value(queryParams);
            mockSecurity.expects('getSearchableAttributes').once().withArgs(queryParams).returns(atributes);
            mockRecommendation.expects('recommend').once().withArgs(atributes, 10).returns(new Promise((resolve, reject) => {
            }));

            var response = search.recommend(req, mockRes.object);
            expect(_.isFunction(response.then)).toBe(true);

            mockSecurity.verify();
            mockRecommendation.verify();
        });

        it('should call the security.getSearchableAttributes', () => {            
            var queryParams = {
                age : 12
            };
            var mockSecurity = sinon.mock(security);
            var mockRes = sinon.mock({json : _.noOp});
            var req = {query:{}};

            sinon.stub(req,'query').value(queryParams);
            mockSecurity.expects('getSearchableAttributes').once().withArgs(queryParams);

            var resonse = search.recommend(req, mockRes.object);

            mockSecurity.verify();
        });

        
    });
});