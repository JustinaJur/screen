import axios from "axios";

export const getClients = async () => {
  try {
    const response = await axios.get("./clients.json");
    console.log(response);
    return response.data;
  } catch (ex) {
    return null;
  }
};
