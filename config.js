var environments = {};

environments.staging = {
    port: 3000,
    envName: 'Staging'
};

environments.production = {
    port: 5000,
    envName: 'Production'
};

var currentEnv = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV : 'staging';

var envToExport = typeof environments[currentEnv] == 'object' ? environments[currentEnv] : environments['staging'];

module.exports = envToExport;
