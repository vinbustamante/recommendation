const _ = require('underscore');
const sinon = require('sinon');
const expect = require('expect');
var query = require('./query');
var http = require('./http');
var es = require('./es');

describe('lib => es', () => {
    beforeEach(() => {
        sinon.mock(http);
    });
    afterEach(() => {
        sinon.mock(http).restore();
    });

    it('search should support default recordsize if value is not pass', (done) => {
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
        var mockHttp = sinon.mock(http);
        mockHttp.expects('post').once().returns(new Promise((resolve, reject) => {
            resolve(JSON.stringify(mockEsResponse));
        }));

        es.search({})
            .then(response => {                
                mockHttp.verify();
                done();
            });            
    });
});