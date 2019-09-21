import React, { Fragment } from "react";
import {
  Dropdown,
  Container,
  Divider,
  Card,
  Table,
  Accordion
} from "semantic-ui-react";

import { getAllClients, deleteClient, updateClient } from "../data/api";

class Doctor extends React.Component {
  state = {
    doctor1: [],
    doctor2: []
  };

  componentDidMount() {
    this.getClientsData();
  }
  onDeleteClient = async e => {
    const response = await deleteClient(e.target.id);
    this.getClientsData();
  };

  getClientsData = async () => {
    const response = await getAllClients();

    this.setState({
      doctor1: response.filter(doctor => doctor.selectedDoctor === "doctor1"),
      doctor2: response.filter(doctor => doctor.selectedDoctor === "doctor2")
    });

    this.countAverageAppointmentDuration(response);
  };

  /////////////////////////////////////////////////////////////////////////////////
  saveAverageDurationtoLocalStorage = (doctor, duration) => {
    // console.log(doctor, duration);
    localStorage.setItem(doctor, JSON.stringify(duration));
    // console.log(localStorage.getItem("doctor1")) ;
  };

  countAverageAppointmentDuration = response => {
    console.log(response);

    const filteredDoctor1 = response.filter(
      client =>
        client.selectedDoctor === "doctor1" && client.serviceProvided === "yes"
    );
    console.log(filteredDoctor1);
    const averageDurationDoctor1 =
      filteredDoctor1
        .map(client => client.appointmentDuration)
        .reduce((total, current) => total + current, 0) /
      filteredDoctor1.length;
    this.setState({
      averageDurationDoctor1
    });
    console.log(averageDurationDoctor1);
    this.saveAverageDurationtoLocalStorage("doctor1", averageDurationDoctor1);

    const filteredDoctor2 = response.filter(
      client =>
        client.selectedDoctor === "doctor2" && client.serviceProvided === "yes"
    );

    const averageDurationDoctor2 =
      filteredDoctor2
        .map(client => client.appointmentDuration)
        .reduce((total, current) => total + current, 0) /
      filteredDoctor1.length;
    this.setState({
      averageDurationDoctor2
    });
    this.saveAverageDurationtoLocalStorage("doctor2", averageDurationDoctor2);
    console.log(averageDurationDoctor2);
  };
  ////////////////////////////////////////////////////////

  onUpdateClient = async (
    event,
    name,
    surname,
    selectedDoctor,
    registrationIn
  ) => {
    const registrationDate = new Date().toISOString().slice(0, 10);
    const registrationTime = new Date().toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit"
    });
    const registrationOut = `${registrationDate} ${registrationTime}`;

    const startTime = new Date(registrationIn);
    const endTime = new Date(registrationOut);
    const difference = endTime.getTime() - startTime.getTime();
    const appointmentDuration = Math.round(difference / 60000);

    const clientData = {
      name: name,
      surname: surname,
      selectedDoctor,
      registrationIn,
      registrationOut,
      appointmentDuration
    };

    const response = await updateClient(event.target.id, clientData);

    this.getClientsData();
  };

  renderDoctorClients = doctor => {
    const { appointmentDuration } = this.state;

    return (
      <Table>
        {doctor.map((client, index) => {
          return (
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{client.id}</Table.HeaderCell>
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
                  <button className="ui yellow basic button">
                    Appointment duration in min: {client.appointmentDuration}
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

    const rootPanels = [
      {
        key: "panel-1",
        title: "Doctor1",
        content: {
          content: (
            <Fragment>
              {doctor1.length > 0
                ? this.renderDoctorClients(doctor1)
                : "No data"}
            </Fragment>
          )
        }
      },
      {
        key: "panel-2",
        title: "Doctor2",
        content: (
          <Fragment>
            {doctor2.length > 0 ? this.renderDoctorClients(doctor2) : "No data"}
          </Fragment>
        )
      }
    ];

    return (
      <Container>
        <Accordion defaultActiveIndex={0} panels={rootPanels} />
      </Container>
    );
  }
}

export default Doctor;
