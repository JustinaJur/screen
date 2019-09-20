import React, { Fragment } from "react";
import { Dropdown, Container, Divider, Card, Table } from "semantic-ui-react";

import { getAllClients, deleteClient, updateClient } from "../data/api";

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

    this.setState({
      doctor1: response.filter(doctor => doctor.selectedDoctor === "doctor1"),
      doctor2: response.filter(doctor => doctor.selectedDoctor === "doctor2")
    });
  };

  onDeleteClient = async e => {
    const response = await deleteClient(e.target.id);
    this.getClientsData();
  };

  onUpdateClient = async (
    event,
    name,
    surname,
    selectedDoctor,
    registrationIn
  ) => {
    //  const registrationOut = new Date();
    // const hours = time.getHours();
    // const minutes = time.getMinutes();
    // const seconds = time.getSeconds();
    // const registrationOut = hours + "." + minutes;
    // console.log(hours + ":" + minutes + ":" + seconds);
    // console.log(doctor);
    const date = Date.now();

    var registrationOut = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(date);

    const clientData = {
      name: name,
      surname: surname,
      selectedDoctor,
      registrationIn,
      registrationOut
    };

    const response = await updateClient(event.target.id, clientData);

    this.getClientsData();
  };

  renderDoctorClients = doctor => {
    // console.log(doctor);
    // let d = new Date();
    // var juste = doctor[0].registrationIn;
    // console.log(juste.toLocaleTimeString());
    // console.log(d);
    // console.log(d.toLocaleTimeString());
    // console.log(function prettyDate2(time) {
    //   var date = new Date(parseInt(d));
    //   return date.toLocaleTimeString(navigator.language, {
    //     hour: "2-digit",
    //     minute: "2-digit"
    //   });
    // });

    // console.log(doctor[0].registrationIn.toLocaleTimeString());
    return (
      <Table>
        {doctor
          // .filter(client => client.service_provided == "no")
          .map((client, index) => {
            return (
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>{client.name}</Table.HeaderCell>
                  <Table.HeaderCell>{client.surname}</Table.HeaderCell>
                  <Table.HeaderCell>{client.registrationIn}</Table.HeaderCell>
                  <Table.HeaderCell>{client.registrationOut}</Table.HeaderCell>
                  <Table.HeaderCell>
                    <button
                      className="ui green basic button"
                      id={client.id}
                      onClick={event =>
                        this.onUpdateClient(
                          event,
                          client.name,
                          client.surname,
                          client.selectedDoctor,
                          client.registrationIn
                        )
                      }
                    >
                      Done
                    </button>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <button
                      className="ui grey basic button"
                      id={client.id}
                      onClick={event => this.onDeleteClient(event)}
                    >
                      Delete
                    </button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            );
          })}
      </Table>
    );
  };

  render() {
    const { doctor1, doctor2 } = this.state;

    return (
      <Fragment>
        <h2>Doctor1</h2>
        {doctor1.length > 0 ? this.renderDoctorClients(doctor1) : "No data"}
        <h2>Doctor2</h2>
        {doctor2.length > 0 ? this.renderDoctorClients(doctor2) : "No data"}
      </Fragment>
    );
  }
}

export default Doctor;
