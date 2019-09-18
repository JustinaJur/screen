import React from "react";
import axios from "axios";
import { getClients } from "../data/api";

//import ClientsData from "../data/clients.json";

class ClientsList extends React.Component {
  componentDidMount() {
    this.getClientsData();
  }

  // getData = async () => {
  //   try {
  //     const response = axios.get("./clients.json");
  //     console.log(response);
  //     return response.data;
  //   } catch (ex) {
  //     return null;
  //   }
  // };

  getClientsData = async () => {
    // try {
    //   const response = await axios.get("./clients.json");
    //   console.log(response);
    //   return response.data;
    // } catch (ex) {
    //   return null;
    // }
    const response = await getClients();
  };

  render() {
    return (
      <div>
        {/* <h2>Doctor1</h2>
        {ClientsData.data.doctor1.map(client => {
          return ` ${client.name} ${client.surname}`;
        })}
        <h2>Doctor2</h2>
        {ClientsData.data.doctor2.map(client => {
          return (
            <p key={client.id}>
              {client.name}
              {client.surname}
            </p>
          );
        })} */}
      </div>
    );
  }
}

export default ClientsList;
