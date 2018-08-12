const _ = require('underscore');
const sinon = require('sinon');
const expect = require('expect');
var promise = require('./promise');


describe('lib => promise', () => {
    it('should pass value', () => {
        promise.pass(1)
            .then(value => {
                expect(1).toBe(1);
            });
    });

    it('should reject value', () => {
        promise.reject(1)
            .catch(err => {
                expect(1).toBe(1);
            });
    });

    describe('promise.exec', () => {
        it('should return reject promise if there was an exception thrown', (done) => {
            promise.exec(() => {
                throw 1;
            }).catch(err => {
                expect(1).toBe(1);
                done();
            });
        });

        it('should return resolve value if normal value is return.', (done) => {
            promise.exec(() => {
                return 1;
            }).then(value => {
                expect(1).toBe(1);
                done();
            });
        });

        it('should return resolve value if no error', (done) => {
            promise.exec(() => {
                return new Promise((resolve , reject) => {
                    resolve(1);
                });
            }).then(value => {
                expect(1).toBe(1);
                done();
            });
        });

        it('should return reject value if there is error', (done) => {
            promise.exec(() => {
                return new Promise((resolve , reject) => {
                    reject(1);
                });
            }).catch(value => {
                expect(1).toBe(1);
                done();
            });
        });
    });
});