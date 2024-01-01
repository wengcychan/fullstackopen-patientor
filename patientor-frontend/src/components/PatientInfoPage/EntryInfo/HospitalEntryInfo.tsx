import { HospitalEntry } from "../../../types";

const HospitalEntryInfo = ({entry}: {entry: HospitalEntry}) => (
	<div>
		Discharge on <i>{entry.discharge.date}</i> because <i>{entry.discharge.criteria}</i>
	</div>
);

export default HospitalEntryInfo;