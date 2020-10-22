'use strict';
const vesselDb = require('../../db/vessels.db');

class ErrorResponseContainer extends ResponseContainer {
    constructor(code, data, errorMessage) {
        this.code = code;
        this.data = data;
        this.errorMessage = errorMessage;

    }
}

module.exports = ResponseContainer;