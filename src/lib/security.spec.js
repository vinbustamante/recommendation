'use strict';
const _ = require('underscore');
const expect = require('expect');
const security = require('./security');
const sinon = require('sinon');
const config = require('../../config');

describe('lib => security', () => {
    beforeEach(() => {
        sinon.stub(config, 'search').value({
            attributes: ['age', 'monthlyIncome', 'experienced', 'lastname', 'longitude', 'latitude','zipCode'],
            type : {
                age : 'number',
                monthlyIncome : 'number',
                experienced : 'boolean',
                zipCode : 'number'
            }
        });
    });

    afterEach(() => {
        sinon.stub(config, 'search').restore();
    });

    describe('security.getSearchableAttributes', () => {
        it('should return empty array of pass in non object paramater', () => {
            var sampleParams = ['sample', [{
                name: 'test'
            }]];
            sampleParams.forEach(arg => {
                var attributes = security.getSearchableAttributes(arg);
                expect(_.isArray(attributes)).toBe(true);
                expect(attributes.length).toBe(0);
            });
        });

        it('should only return attributes that is define in config', () => {
            var queryParams = {
                age: '12',
                zipCode : '123',
                latitude: '19.56667',
                longitude: '40.71667',
                monthlyIncome: '12000.50',
                experienced: 'true',
                lastname: 'test',
                placeOfBirth: 'in here'
            };
            var attributes = security.getSearchableAttributes(queryParams);
            expect(_.isArray(attributes)).toBe(true);
            expect(attributes.length == config.search.attributes.length -1).toBe(true);
            _.each(config.search.attributes, key => {
                if(key !== 'longitude' && key !== 'latitude') {
                    var attribute = _.findWhere(attributes, {
                        name: key
                    });
                    expect(typeof attribute).toBe('object');
                    expect(attribute.value == queryParams[key]).toBe(true);
                }
            });
            var location = _.findWhere(attributes, {name : 'location'});
            expect(_.isNull(location)).toBe(false);
        });
    });
});