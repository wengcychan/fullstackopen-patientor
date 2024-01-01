import { Container, TextField, Alert, Button, InputLabel, MenuItem, Select, SelectChangeEvent, ListItemText, Checkbox } from '@mui/material';
import { useState, SyntheticEvent } from "react";
import patientService from "../../services/patients";
import axios from 'axios';
import { Patient, BaseEntry, Diagnosis } from "../../types";
import HealthCheckForm from "./Forms/HealthCheckForm";
import HospitalForm from "./Forms/HospitalForm";
import OccupationalHealthcareForm from "./Forms/OccupationalHealthcareForm";

interface Props {
	patient: Patient;
	setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
	setShowAddEntriesForm: React.Dispatch<React.SetStateAction<boolean>>;
	diagnoses: Diagnosis[];
}

const AddEntriesForm = ({patient, setPatient, setShowAddEntriesForm, diagnoses} : Props) => {

	const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
	const [error, setError] = useState<string>();
	const [entryType, setEntryType] = useState('');

	const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      setEntryType(event.target.value);
			setDescription('');
			setDate('');
			setSpecialist('');
			setHealthCheckRating('');
			setDiagnosisCodes([]);
			setDischargeDate('');
			setDischargeCriteria('');
			setEmployerName('');
			setSickLeaveStartDate('');
			setSickLeaveEndDate('');
    }
  };

	const onDiagnosisCodeChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

	const addEntry = async (event: SyntheticEvent) => {
		event.preventDefault();

		const baseEntry: Omit<BaseEntry , 'id'> = {
			description,
			date,
			specialist,
			diagnosisCodes
		};

		let otherEntry;
		switch (entryType)
		{
			case 'Hospital':
				otherEntry = {
					discharge: {
						date: dischargeDate,
						criteria: dischargeCriteria
					},
					type: entryType
				};
				break;
			case 'HealthCheck':
				otherEntry = {
					healthCheckRating: parseInt(healthCheckRating, 10),
					type: entryType
				};
				break;
			case 'OccupationalHealthcare':
				otherEntry = {
					employerName,
					sickLeave: {
						startDate: sickLeaveStartDate,
						endDate: sickLeaveEndDate
					},
					type: entryType
				};
				break;
		}

		try {
			if (otherEntry)
			{
				const entry = await patientService.createEntry({...baseEntry, ...otherEntry}, patient.id);
				setPatient({...patient, entries: patient.entries.concat(entry)});
			}
			setDescription('');
			setDate('');
			setSpecialist('');
			setHealthCheckRating('');
			setDiagnosisCodes([]);
			setDischargeDate('');
			setDischargeCriteria('');
			setEmployerName('');
			setSickLeaveStartDate('');
			setSickLeaveEndDate('');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
			setTimeout(() => {
				setError('');
			}, 3000);
    }
	};
	return (
		<Container style={{ padding: '1.5em', border: '1px dotted #000', borderRadius: '0.2em', marginBottom: '4em' }}>
			<div style={{ marginBottom: '3em' }}>
				<InputLabel style={{ marginBottom: 2 }}>Please select entry type</InputLabel>
        <Select
          label="EntryType"
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
					sx={{ width: '300px' }}
        >
          <MenuItem
            value="Hospital"
          >
						Hospital
					</MenuItem>
					<MenuItem
            value="HealthCheck"
          >
						Health Check
					</MenuItem>
					<MenuItem
            value="OccupationalHealthcare"
          >
						Occupational Healthcare
					</MenuItem>
        </Select>
			</div>
	
			{entryType && 
				<div>
					<h3>New {entryType.replace(/([A-Z])/g, ' $1')} Entry</h3>
					{error && <Alert severity="error">{error}</Alert>}
					<form onSubmit={addEntry}>
						<InputLabel style={{ marginBottom: 2 }}>Description</InputLabel>
						<TextField
							fullWidth
							variant="standard"
							inputProps={{ autoComplete: 'off' }}
							sx={{ marginBottom: 2 }}
							value={description}
							onChange={({ target }) => setDescription(target.value)}
						/>
						<InputLabel style={{ marginBottom: 2 }}>Date</InputLabel>
						<TextField
							type="date"
							variant="standard"
							sx={{ marginBottom: 2, width: '200px' }}
							value={date}
							onChange={({ target }) => setDate(target.value)}
						/>
						<InputLabel style={{ marginBottom: 2 }}>Specialist</InputLabel>
						<TextField
							fullWidth
							variant="standard"
							inputProps={{ autoComplete: 'off' }}
							sx={{ marginBottom: 2 }}
							value={specialist}
							onChange={({ target }) => setSpecialist(target.value)}
						/>
						<InputLabel style={{ marginBottom: 2 }}>Diagnosis codes</InputLabel>
						<Select
							multiple
							value={diagnosisCodes}
							onChange={onDiagnosisCodeChange}
							renderValue={(selected) => selected.join(', ')}
							sx={{ marginBottom: 2, width: 250 }}
						>
							{diagnoses
								.map(diagnosis => diagnosis.code)
								.map(diagnosisCode => (
								<MenuItem key={diagnosisCode} value={diagnosisCode}>
									<Checkbox checked={diagnosisCodes.indexOf(diagnosisCode) > -1} />
									<ListItemText primary={diagnosisCode} />
								</MenuItem>
							))}
						</Select>
						{entryType === 'Hospital' && <HospitalForm dischargeDate={dischargeDate} setDischargeDate={setDischargeDate} dischargeCriteria={dischargeCriteria} setDischargeCriteria={setDischargeCriteria}/>}
						{entryType === 'HealthCheck' && <HealthCheckForm healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating}/>}
						{entryType === 'OccupationalHealthcare' && <OccupationalHealthcareForm employerName={employerName} setEmployerName={setEmployerName} sickLeaveStartDate={sickLeaveStartDate} setSickLeaveStartDate={setSickLeaveStartDate} sickLeaveEndDate={sickLeaveEndDate} setSickLeaveEndDate={setSickLeaveEndDate}/>}
						
						<div style={{ marginTop: '1em' }}>
							<Button
								style={{
									float: 'right',
								}}
								type="submit"
								variant="contained"
							>
								Add
							</Button>

							<Button
								variant="contained"
								onClick={() => setShowAddEntriesForm(false)}
							>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			}
		</Container>
	);
};

export default AddEntriesForm;