import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from '@mui/material';

import { Patient, Gender, Diagnosis } from "../../types";

import patientService from "../../services/patients";
import Entries from "./Entries";
import AddEntriesForm from "./AddEntriesForm";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientInfoPage = ({diagnoses}: {diagnoses: Diagnosis[]}) => {
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showAddEntriesForm, setShowAddEntriesForm] = useState<boolean>(false);

  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      if (id)
      {
        const patient = await patientService.getPatient(id);
        if (patient)
          setPatient(patient);
      }
    };
    void fetchPatient();

  }, [id]);

  const generateGenderIcon = (gender: Gender) => {
    if (gender === Gender.Male)
      return <MaleIcon/>;
    else if (gender === Gender.Female)
      return <FemaleIcon/>;
    else
      return <TransgenderIcon/>;
  };

  if (patient)
  {
    return (
      <div>
        <h2>{patient.name} <span>{generateGenderIcon(patient.gender)}</span></h2>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        {showAddEntriesForm && <AddEntriesForm patient={patient} setPatient={setPatient} setShowAddEntriesForm={setShowAddEntriesForm} diagnoses={diagnoses}/>}
        <Entries patient={patient} diagnoses={diagnoses}  />
        <Button variant="contained" onClick={() => setShowAddEntriesForm(true)}>
          Add new entry
        </Button>
      </div>
    );
  }
};

export default PatientInfoPage;