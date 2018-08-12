module.exports = {
    server : {
        port : process.env.port || 3000
    },
    cors : {
        origin : '*'
    },
    search: {
        attributes : ['age','latitude','longitude','monthlyIncome','experienced'],
        type : {
            age : 'number',
            monthlyIncome : 'number',
            experienced : 'boolean'
        }        
    },
    es : {
        host : process.env.esHost || 'http://localhost:9200'
    },
    system: {
        params : {
            recordSize : '_recordSize'
        },
        threshold : {
            age : 3
        }
    }
};