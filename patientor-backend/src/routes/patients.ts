import express from 'express';
import patientsServices from '../services/patientsServices';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientsServices.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientsServices.addNewPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown)
	{
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: '  + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.get('/:id', (req, res) => {
	try
	{
		const patient = patientsServices.getPatientEntry(req.params.id);
		res.json(patient);
	}
	catch (error: unknown)
	{
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: '  + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.post('/:id/entries', (req, res) => {
	try {
		const newEntry = toNewEntry(req.body);
		const addedEntry = patientsServices.addNewEntry(newEntry, req.params.id);
		res.json(addedEntry);
	} catch (error: unknown)
	{
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: '  + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
