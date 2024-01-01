import { OccupationalHealthcareEntry } from "../../../types";

const OccupationalHealthcareEntryInfo = ({entry}: {entry: OccupationalHealthcareEntry}) => (
	<div>
		Employer Name: <i>{entry.employerName}</i>
		{entry.sickLeave && <p>Sick leave on <i>{entry.sickLeave.startDate}</i> - <i>{entry.sickLeave.endDate}</i></p>}
	</div>
);

export default OccupationalHealthcareEntryInfo;