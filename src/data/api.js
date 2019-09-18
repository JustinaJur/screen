import axios from "axios";

export const getAllClients = async () => {
  try {
    const response = await axios.get("http://localhost:3001/clients");
    return response.data;
  } catch (ex) {
    return null;
  }
};

export const createNewClient = async (name, surname, selectedDoctor) => {
  try {
    const response = await axios.post("http://localhost:3001/clients", {
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
