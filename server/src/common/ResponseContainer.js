'use strict';
const vesselDb = require('../../db/vessels.db');

class ResponseContainer {
    constructor(data, errorMessage) {
        this.data = data;
        this.error = errorMessage;

    }
}

module.exports = ResponseContainer;