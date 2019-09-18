import React, { Fragment } from "react";

import { getAllClients, deleteClient } from "../data/api";

class Doctor extends React.Component {
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

  onDeleteClient = async e => {
    console.log(e.target.id);
    const response = await deleteClient(e.target.id);
    this.getClientsData();
    console.log(response);
  };

  render() {
    return (
      <div>
        <h2 onClick={this.showClientsList}>Doctor1</h2>
        {this.state.doctor1.map((client, index) => {
          return (
            <div>
              <p key={client.id}>
                {client.name} {client.surname}
              </p>
              <button id={client.id} onClick={e => this.onDeleteClient(e)}>
                Finished
              </button>
            </div>
          );
        })}

        <h2>Doctor2</h2>
        {this.state.doctor2.map((client, index) => {
          return (
            <Fragment>
              <p key={client.id}>
                {client.name} {client.surname}
              </p>
              <button id={client.id} onClick={e => this.onDeleteClient(e)}>
                Finished
              </button>
            </Fragment>
          );
        })}
      </div>
    );
  }
}

export default Doctor;
