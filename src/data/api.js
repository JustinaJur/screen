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

export const createNewClient = async (
  name,
  surname,
  selectedDoctor,
  registrationIn
) => {
  try {
    const response = await axios.post(CLIENTS_API, {
      name,
      surname,
      selectedDoctor,
      registrationIn,
      serviceProvided: "no"
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

export const updateClient = async (
  id,
  { name, surname, selectedDoctor, registrationIn, registrationOut }
) => {
  try {
    const response = await axios.put(`${CLIENTS_API}/${id}`, {
      name,
      surname,
      selectedDoctor,
      registrationIn,
      registrationOut,
      serviceProvided: "yes"
    });

    return response.data;
  } catch (ex) {
    return null;
  }
};
