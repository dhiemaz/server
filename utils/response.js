// utils response
// this code is for construct response message and data either success or error
const responseData = function (response, statusCode, values) {
    let data = {
        success : true,
        data : values
    };

    response.status(statusCode).json(data);
    response.end;
};

const responseMessage = function (response, statusCode, message) {
    let data = {
        success: true,
        message: message
    };

    response.status(statusCode).json(data);
    response.end;
};

const responseView = function (response, data) {
    response.render('profile_template', {
        profile: data,
    });

    response.end;
}

module.exports = {
    responseData,
    responseMessage,
    responseView
}