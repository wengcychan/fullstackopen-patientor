"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
const types_2 = require("./types");
const isString = (text) => {
    return (typeof text === 'string' || text instanceof String);
};
const isNumber = (param) => {
    return (typeof param === 'number' || param instanceof Number);
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_2.Gender).map(gender => gender.toString()).includes(param);
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseString = (text) => {
    if (!text || !isString(text))
        throw new Error('Incorrect or missing text.');
    return text;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error('Incorrect or missing date: ' + date);
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender))
        throw new Error('Incorrect or missing gender.');
    return gender;
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
const parseHealthCheckRating = (rating) => {
    if (rating === null || !isNumber(rating) || !isHealthCheckRating(rating))
        throw new Error('Incorrect or missing Health Check Rating.');
    return rating;
};
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
const parseEntry = (object) => {
    if ('type' in object) {
        switch (object.type) {
            case "Hospital":
                if ('discharge' in object) {
                    if (typeof object.discharge !== 'object' || !object.discharge)
                        throw new Error('Incorrect or missing data.');
                    if ('date' in object.discharge && 'criteria' in object.discharge) {
                        return {
                            type: object.type,
                            discharge: {
                                date: parseDate(object.discharge.date),
                                criteria: parseString(object.discharge.criteria)
                            }
                        };
                    }
                }
                break;
            case "OccupationalHealthcare":
                if ('employerName' in object) {
                    if (!('sickLeave' in object)) {
                        return {
                            type: object.type,
                            employerName: parseString(object.employerName),
                            sickLeave: undefined
                        };
                    }
                    else {
                        if (typeof object.sickLeave !== 'object' || !object.sickLeave)
                            throw new Error('Incorrect or missing data.');
                        if ('startDate' in object.sickLeave && 'endDate' in object.sickLeave)
                            return {
                                type: object.type,
                                employerName: parseString(object.employerName),
                                sickLeave: {
                                    startDate: parseDate(object.sickLeave.startDate),
                                    endDate: parseDate(object.sickLeave.endDate),
                                }
                            };
                    }
                }
                break;
            case "HealthCheck":
                if ('healthCheckRating' in object)
                    return {
                        type: object.type,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                break;
            default:
                return assertNever(object);
        }
    }
    throw new Error('Incorrect data: some fields are missing');
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object')
        throw new Error('Incorrect or missing data.');
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewPatient = toNewPatient;
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object')
        throw new Error('Incorrect or missing data.');
    if ('description' in object && 'date' in object && 'specialist' in object) {
        const baseEntry = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object)
        };
        const otherEntry = parseEntry(object);
        return Object.assign(Object.assign({}, baseEntry), otherEntry);
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewEntry = toNewEntry;
