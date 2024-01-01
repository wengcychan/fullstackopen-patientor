import { NewPatientEntry, NewEntryWithoutId, BaseEntry, HealthCheckRating, NewEntryWithoutBase } from './types';
import { Gender, Diagnose } from './types';

const isString = (text: unknown): text is string => {
	return (typeof text === 'string' || text instanceof String);
};

const isNumber = (param: unknown): param is number => {
	return (typeof param === 'number' || param instanceof Number);
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(gender => gender.toString()).includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(param);
};

const parseString = (text: unknown): string => {
	if (!text || !isString(text))
		throw new Error('Incorrect or missing text.');
	return text;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date))
		throw new Error('Incorrect or missing date: ' + date);
	return date;
};

const parseGender = (gender: unknown): string => {
	if (!gender || !isString(gender) || !isGender(gender))
		throw new Error('Incorrect or missing gender.');
	return gender;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnose['code']>;
  }
  return object.diagnosisCodes as Array<Diagnose['code']>;
};

const parseHealthCheckRating = (rating: unknown): number => {
	if (rating === null || !isNumber(rating) || !isHealthCheckRating(rating))
		throw new Error('Incorrect or missing Health Check Rating.');
	return rating;
};

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const parseEntry = (object: object): NewEntryWithoutBase => {
	if ('type' in object)
	{
		switch(object.type)
		{
			case "Hospital":
				if ('discharge' in object)
				{
					if (typeof object.discharge !== 'object' || !object.discharge)
						throw new Error('Incorrect or missing data.');
					if ('date' in object.discharge && 'criteria' in object.discharge)
					{
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
				if ('employerName' in object)
				{
					if (!('sickLeave' in object))
					{
						return {
							type: object.type,
							employerName: parseString(object.employerName),
							sickLeave: undefined
						};
					}
					else
					{
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
				return assertNever(object as never);
		}
	}
	throw new Error('Incorrect data: some fields are missing');
};

export const toNewPatient = (object: unknown): NewPatientEntry => {

	if (!object || typeof object !== 'object')
		throw new Error('Incorrect or missing data.');
	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)
	{
		const newEntry: NewPatientEntry = {
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

export const toNewEntry = (object: unknown): NewEntryWithoutId => {

	if (!object || typeof object !== 'object')
		throw new Error('Incorrect or missing data.');
	if ('description' in object && 'date' in object && 'specialist' in object)
	{
		const baseEntry: Omit<BaseEntry, 'id'> = {
			description: parseString(object.description),
			date: parseDate(object.date),
			specialist: parseString(object.specialist),
			diagnosisCodes: parseDiagnosisCodes(object)
		};
		const otherEntry = parseEntry(object);
		return {...baseEntry, ...otherEntry};
	}
	throw new Error('Incorrect data: some fields are missing');
};
