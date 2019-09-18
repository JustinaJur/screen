import React from "react";

import { getAllClients } from "../data/api";

class ClientsList extends React.Component {
  state = {
    doctor1: [],
    doctor2: []
  };

  componentDidMount() {
    this.getClientsData();
  }

  getClientsData = async () => {
    const response = await getAllClients();
    console.log(response);

    this.setState({
      doctor1: response.filter(doctor => doctor.selected_doctor === "doctor1"),
      doctor2: response.filter(doctor => doctor.selected_doctor === "doctor2")
    });
  };

  render() {
    return (
      <div>
        {this.state.doctor1.length !== 0 && <h2>Doctor1</h2>}
        {this.state.doctor1.map((client, index) => {
          return (
            // `No. ${client.id} - ${client.name} ${client.surname} -`
            //  <p> {index === 0? "Now" :  index * 5}</p>
            <div key={client.id}>
              {client.id} {client.name} {client.surname}
              {index === 0 ? "Now" : index * 5}
            </div>
          );
        })}

        {this.state.doctor2.length !== 0 && <h2>Doctor2</h2>}
        {this.state.doctor2.map((client, index) => {
          return (
            <div key={client.id}>
              {client.id} {client.name} {client.surname}
              {index === 0 ? "Now" : index * 5}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ClientsList;
