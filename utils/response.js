'use strict';
// utils response
// this code is for construct response message and data either success or error

const omitEmpty = require('omit-empty');

const responseData = function (response, statusCode, values) {
    let data = {
        success : true,
        data : values
    };

    response.status(statusCode).json(omitEmpty(data));
    response.end;
};

const responseMessage = function (response, statusCode, message, values) {
    let success = false;
    if (statusCode == 200 || statusCode == 201) {
        success = true;
    }

    let data = {
        success: success,
        message: message,
        data: values
    };

    response.status(statusCode).json(data);
    response.end;
};

const responseView = function (response, statusCode, data) {
    if (statusCode == 200) {
        response.render('profile_template', {
            profile: data,
        });
    } else {
        response.render('404', {
            profile: data,
        });
    }

    response.end;
}

module.exports = {
    responseData,
    responseMessage,
    responseView
}