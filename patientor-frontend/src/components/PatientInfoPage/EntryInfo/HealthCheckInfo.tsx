import { HealthCheckEntry, HealthCheckRating } from "../../../types";

const HealthCheckInfo = ({entry}: {entry: HealthCheckEntry}) => (
	<div>
		Health Check Rating: <i>{HealthCheckRating[entry.healthCheckRating]}</i>
	</div>
);

export default HealthCheckInfo;