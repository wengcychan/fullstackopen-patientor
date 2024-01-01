import { Container } from '@mui/material';

import { Patient, Entry, Diagnosis } from "../../types";
import HospitalEntryInfo from "./EntryInfo/HospitalEntryInfo";
import OccupationalHealthcareEntryInfo from "./EntryInfo/OccupationalHealthcareEntryInfo";
import HealthCheckInfo from "./EntryInfo/HealthCheckInfo";

const Entries = ({patient, diagnoses} : {patient: Patient, diagnoses: Diagnosis[]}) => {

	const generateCodeDescription = (code: string) : string | null => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    if (!diagnosis)
      return null;
    return diagnosis.name;
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const entryDetails = (entry: Entry) => {
    switch (entry.type)
    {
      case "Hospital":
        return <HospitalEntryInfo entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryInfo entry={entry} />;
      case "HealthCheck":
        return <HealthCheckInfo entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

	if (!patient.entries.length)
		return <h3>No entries</h3>;

	return (
		<div>
			<h3>Entries</h3>
			{
				patient.entries.map(entry => {
					const {id, date, description, diagnosisCodes, specialist} = entry;
					return (
						<Container style={{ padding: '0.5em', border: '1px solid #777', borderRadius: '0.2em', marginBottom: '1em' }} key={id}>
							<p>{date} <i>{description}</i></p>
							<ul>
								{ diagnosisCodes && diagnosisCodes.map(code => <li key={code}>{code} {generateCodeDescription(code)} </li>) }
							</ul>
							{entryDetails(entry)}
							<p>Diagnose by <i>{specialist}</i></p>
						</Container>
				);
			})}
		</div>
	);
};

export default Entries;