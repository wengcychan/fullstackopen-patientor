import { TextField, InputLabel } from '@mui/material';

interface Props {
	dischargeDate: string;
	setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
	dischargeCriteria: string;
	setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalForm = ({dischargeDate, setDischargeDate, dischargeCriteria, setDischargeCriteria}: Props) => (
	<>
		<InputLabel style={{ marginBottom: 2 }}>Discharge date</InputLabel>
		<TextField
			type="date"
			variant="standard"
			sx={{ marginBottom: 2, width: '200px' }}
			value={dischargeDate}
			onChange={({ target }) => setDischargeDate(target.value)}
		/>
		<InputLabel style={{ marginBottom: 2 }}>Discharge criteria</InputLabel>
		<TextField
			variant="standard"
			fullWidth
			sx={{ marginBottom: 2 }}
			value={dischargeCriteria}
			onChange={({ target }) => setDischargeCriteria(target.value)}
		/>
	</>
);

export default HospitalForm;