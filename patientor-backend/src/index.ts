import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('dist'))

app.get('/api/ping', (_req, res) => {
	res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});