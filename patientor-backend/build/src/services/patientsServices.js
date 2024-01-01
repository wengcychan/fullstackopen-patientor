"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addNewPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id, entries: [] }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const getPatientEntry = (id) => {
    const patient = patients_1.default.find(patient => patient.id === id);
    if (!patient)
        throw new Error('Incorrect id');
    return patient;
};
const addNewEntry = (entry, patientId) => {
    const entryId = (0, uuid_1.v1)();
    const newEntry = Object.assign({ id: entryId }, entry);
    const patient = patients_1.default.find(patient => patient.id === patientId);
    if (!patient)
        throw new Error('Incorrect id');
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = { getNonSensitiveEntries, addNewPatient, getPatientEntry, addNewEntry };
