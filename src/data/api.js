import axios from "axios";

const CLIENTS_API = "http://localhost:3001/clients";

export const getAllClients = async () => {
  try {
    const response = await axios.get(CLIENTS_API);
    return response.data;
  } catch (ex) {
    return null;
  }
};

export const createNewClient = async (name, surname, selectedDoctor) => {
  try {
    const response = await axios.post(CLIENTS_API, {
      name,
      surname,
      selected_doctor: selectedDoctor,
      service_provided: "no"
    });

    return response.data;
  } catch (ex) {
    return null;
  }
};

export const deleteClient = async id => {
  try {
    const response = await axios.delete(`${CLIENTS_API}/${id}`);

    return response.data;
  } catch (ex) {
    return null;
  }
};
