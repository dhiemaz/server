// utils validation
// this code is use for validation profile data

const validate = require('validate.js');

// validateProfile data
const validateProfile = (data) => {
    let constraint= {
        name : {
            presence: {
                allowEmpty: false
            }
        },
        description : {
            presence: {
                allowEmpty: false
            }
        },
        mbti : {
            presence: {
                allowEmpty: false
            }
        },
        enneagram :{
            presence : {
                allowEmpty: false
            }
        },
        variant : {
            presence : {
                allowEmpty: false
            }
        },
        tritype : {
            presence : {
                allowEmpty: false
            }
        },
        socionics : {
            presence : {
                allowEmpty: false
            }
        },
        sloan : {
            presence : {
                allowEmpty: false
            }
        },
        psyche : {
            presence : {
                allowEmpty: false
            }
        },
        image : {
            presence : {
                allowEmpty: false
            }
        }
    }

    return validate(data, constraint, {format: 'flat'})
}

module.exports = {
    validateProfile
}