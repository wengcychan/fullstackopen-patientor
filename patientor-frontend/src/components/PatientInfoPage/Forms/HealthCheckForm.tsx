import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface Props {
	healthCheckRating: string;
	setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
}

const HealthCheckForm = ({healthCheckRating, setHealthCheckRating}: Props) => {
	const onRatingChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		if ( typeof event.target.value === "string") {
			setHealthCheckRating(event.target.value);
		}
	};

	return (
	<div style={{ marginBottom: '1em' }}>
		<InputLabel style={{ marginBottom: 2 }}>Healthcheck rating</InputLabel>
		<Select
			label="healthCheckRating"
			fullWidth
			value={healthCheckRating}
			onChange={onRatingChange}
			sx={{ width: '200px' }}
		>
			<MenuItem
				value="0"
			>
				Healthy
			</MenuItem>
			<MenuItem
				value="1"
			>
				LowRisk
			</MenuItem>
			<MenuItem
				value="2"
			>
				HighRisk
			</MenuItem>
			<MenuItem
				value="3"
			>
				CriticalRisk
			</MenuItem>
		</Select>
	</div>
	);
};

export default HealthCheckForm;