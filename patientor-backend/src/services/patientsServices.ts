import patients from '../../data/patients';
import { NonSensitivePatientEntry, NewPatientEntry, Patient, NewEntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
		{
			id,
			name,
			dateOfBirth,
			gender,
			occupation
		}));
};

const addNewPatient = (entry: NewPatientEntry): Patient => {
	const id = uuid();
	const newPatient = {
		id,
		entries: [],
		...entry
	};
	patients.push(newPatient);
	return newPatient;
};

const getPatientEntry = (id: string): Patient => {
	const patient = patients.find(patient => patient.id === id);
	if (!patient)
		throw new Error('Incorrect id');
	return patient;
};

const addNewEntry = (entry: NewEntryWithoutId, patientId: string): Entry => {
	const entryId = uuid();
	const newEntry = {
		id: entryId,
		...entry
	};
	const patient = patients.find(patient => patient.id === patientId);
	if (!patient)
		throw new Error('Incorrect id');
	patient.entries.push(newEntry);
	return newEntry;
};

export default { getNonSensitiveEntries, addNewPatient, getPatientEntry, addNewEntry };