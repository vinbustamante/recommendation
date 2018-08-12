const _ = require('underscore');
const sinon = require('sinon');
const expect = require('expect');
const request = require('request');
var http = require('./http');

describe('lib => http', () => {
    beforeEach(() => {
        sinon.mock(request);
        //sinon.stub(request, 'get');
    });

    afterEach(() => {
        sinon.mock(request).restore();
        //request.restore();
    });

    describe('http.get', () => {
        it('should accept string', (done) => {
            var mockRequest = sinon.mock(request);
            mockRequest.expects('get').once().yields(null, {});
            http.get('http://sample.com')
                .then(response => {
                    mockRequest.verify();
                    done();
                });
        });

        it('should accept object', (done) => {
            var mockRequest = sinon.mock(request);
            mockRequest.expects('get').once().yields(null, {});
            http.get({
                    url: 'http://sample.com'
                })
                .then(response => {
                    mockRequest.verify();
                    done();
                });
        });

        it('should reject promise if there was an error', (done) => {
            var mockRequest = sinon.mock(request);
            mockRequest.expects('get').once().yields('this is a test', {});
            http.get({
                    url: 'http://sample.com'
                })
                .catch(response => {
                    mockRequest.verify();
                    done();
                });
        });

        it('should reject promise if status code is >= 400', (done) => {
            var mockRequest = sinon.mock(request);
            mockRequest.expects('get').once().yields(null, {
                statusCode: 400,
                body: 'hello world'
            });
            http.get({
                    url: 'http://sample.com'
                })
                .catch(response => {
                    mockRequest.verify();
                    done();
                });
        });
    });

    describe('http.post', () => {
        it('should accept object', (done) => {
            var mockRequest = sinon.mock(request);
            mockRequest.expects('post').once().yields(null, {});
            http.post({
                    url: 'http://sample.com',
                    data: {}
                })
                .then(response => {
                    mockRequest.verify();
                    done();
                });
        });
    });

});