import axios from "axios";
import { Patient, PatientFormValues, NewEntryWithoutId, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id : string) => {
  try
  {
    const { data } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    return data;
  }
  catch (error: unknown)
  {
    return null;
  }  
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (object: NewEntryWithoutId, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll, getPatient, create, createEntry
};

