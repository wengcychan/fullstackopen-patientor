import { TextField, InputLabel } from '@mui/material';

interface Props {
	employerName: string;
	setEmployerName: React.Dispatch<React.SetStateAction<string>>;
	sickLeaveStartDate: string;
	setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
	sickLeaveEndDate: string;
	setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareForm = ({employerName, setEmployerName, sickLeaveStartDate, setSickLeaveStartDate, sickLeaveEndDate, setSickLeaveEndDate}: Props) => (
	<>
		<InputLabel style={{ marginBottom: 2 }}>Employer name</InputLabel>
		<TextField
			fullWidth
			variant="standard"
			sx={{ marginBottom: 2 }}
			value={employerName}
			onChange={({ target }) => setEmployerName(target.value)}
		/>
		<InputLabel style={{ marginBottom: 2 }}>Sick leave start date</InputLabel>
		<TextField
			type="date"
			variant="standard"
			sx={{ marginBottom: 2, width: '200px' }}
			value={sickLeaveStartDate}
			onChange={({ target }) => setSickLeaveStartDate(target.value)}
		/>
		<InputLabel style={{ marginBottom: 2 }}>Sick leave end date</InputLabel>
		<TextField
			type="date"
			variant="standard"
			sx={{ marginBottom: 2, width: '200px' }}
			value={sickLeaveEndDate}
			onChange={({ target }) => setSickLeaveEndDate(target.value)}
		/>
	</>
);

export default OccupationalHealthcareForm;