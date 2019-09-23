import React from "react";
import { Container, Table, Accordion, Icon, Button } from "semantic-ui-react";

import { getAllClients, deleteClient, updateClient } from "../data/api";
import { filterClientsByDoctor } from "../utils/utils.js";

class Doctor extends React.Component {
  state = {
    clientsOfDoctor1: [],
    clientsOfDoctor2: [],
    clientsByDoctor: "",
    activeIndex: 0
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  componentDidMount() {
    this.getClientsData();
  }

  onDeleteClient = async e => {
    const response = await deleteClient(e.target.id);

    if (!response) return;

    this.getClientsData();
  };

  getClientsData = async () => {
    const response = await getAllClients();

    const clientsByDoctor = filterClientsByDoctor(response);

    this.setState({
      clientsOfDoctor1: clientsByDoctor.doctor1,
      clientsOfDoctor2: clientsByDoctor.doctor2
    });

    this.countAverageAppointmentDuration(response);
  };

  saveAverageDurationtoLocalStorage = (doctor, duration) => {
    localStorage.setItem(doctor, JSON.stringify(duration));
  };

  countAverageAppointmentDuration = response => {
    const filteredDoctor1 = response.filter(
      client =>
        client.selectedDoctor === "doctor1" && client.serviceProvided === "yes"
    );

    const averageDurationDoctor1 =
      filteredDoctor1
        .map(client => client.appointmentDuration)
        .reduce((total, current) => total + current, 0) /
      filteredDoctor1.length;
    this.setState({
      averageDurationDoctor1
    });

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
  };

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
    const appointmentDuration =
      Math.round(difference / 60000) === 0 ? 1 : Math.round(difference / 60000);

    const clientData = {
      name,
      surname,
      selectedDoctor,
      registrationIn,
      registrationOut,
      appointmentDuration
    };

    const response = await updateClient(event.target.id, clientData);

    if (!response) return;

    this.getClientsData();
  };

  renderDoctorClients = doctor => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Number</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Surname</Table.HeaderCell>
            <Table.HeaderCell>Registered In </Table.HeaderCell>
            <Table.HeaderCell>Registered Out</Table.HeaderCell>
            <Table.HeaderCell>Appoinment duration</Table.HeaderCell>
            <Table.HeaderCell>Complete procedure</Table.HeaderCell>
            <Table.HeaderCell>Delete client</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {doctor.map((client, index) => {
          return (
            <Table.Body key={client.id}>
              <Table.Row>
                <Table.Cell textAlign="center">{client.id}</Table.Cell>
                <Table.Cell textAlign="center">{client.name}</Table.Cell>
                <Table.Cell textAlign="center">{client.surname}</Table.Cell>
                <Table.Cell textAlign="center">
                  {client.registrationIn}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {client.registrationOut}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {client.appointmentDuration
                    ? `${client.appointmentDuration} min`
                    : ""}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    basic
                    color="green"
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
                  </Button>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    basic
                    color="grey"
                    id={client.id}
                    onClick={event => this.onDeleteClient(event)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          );
        })}
      </Table>
    );
  };

  render() {
    const { clientsOfDoctor1, clientsOfDoctor2, activeIndex } = this.state;

    return (
      <Container>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Doctor1
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            {clientsOfDoctor1 && this.renderDoctorClients(clientsOfDoctor1)}
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Doctor2
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            {clientsOfDoctor2 && this.renderDoctorClients(clientsOfDoctor2)}
          </Accordion.Content>
        </Accordion>
      </Container>
    );
  }
}

export default Doctor;
