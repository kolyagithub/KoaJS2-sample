const logger = require('./logger')(__filename)
    , LIVR = require('livr');

LIVR.Validator.defaultAutoTrim(true);

// <editor-fold desc="Validate requests">
/**
 * Check validate request dates
 * @param {Object} data - switch request type
 * @param {Object} req - request data
 * @returns {boolean} - true/false
 */
function validRequest(data, req) {
    if (data.headers) {
        let validHeaders = new LIVR.Validator(data.headers);
        if (!validHeaders.validate(req.headers)) {
            let _substring = req.request.originalUrl;
            logger.error('Cannot validate request headers: URL ' + _substring + '    ', validHeaders.getErrors());
            return false;
        }
    }
    if (data.params) {
        let validParams = new LIVR.Validator(data.params);
        if (!validParams.validate(req.params)) {
            let _substring = req.request.originalUrl;
            logger.error('Cannot validate request params: URL ' + _substring + '    ', validParams.getErrors());
            return false;
        }
    }
    if (data.body) {
        let validBody = new LIVR.Validator(data.body);
        if (!validBody.validate(req.request.body)) {
            let _substring = req.request.originalUrl;
            logger.error('Cannot validate request body: URL ' + _substring + '    ', validBody.getErrors());
            return false;
        }
    }
    if (data.query) {
        let validQuery = new LIVR.Validator(data.query);
        if (!validQuery.validate(req.query)) {
            let _substring = req.request.originalUrl;
            logger.error('Cannot validate request query: URL ' + _substring + '    ', validQuery.getErrors());
            return false;
        }
    }
    if (data.form_data) {
        let validFormData = new LIVR.Validator(data.form_data);
        if (!validFormData.validate(req.form_data)) {
            logger.error('Cannot validate request form-data: ', validFormData.getErrors());
            return false;
        }
    }
    return true;
}

// </editor-fold>

module.exports = {
    validRequest: validRequest
};