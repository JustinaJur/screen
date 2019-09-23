import React, { Fragment } from "react";
import { Container, Table } from "semantic-ui-react";

import { getAllClients } from "../data/api";
import { filterClientsByService, filterClientsByDoctor } from "../utils/utils";

class ClientsList extends React.Component {
  state = {
    clientsOfDoctor1: null,
    clientsOfDoctor2: null,
    isNoDataMessageVisible: false
  };

  componentDidMount() {
    this.getClientsData();
  }

  getClientsData = async () => {
    const response = await getAllClients();

    const filteredClientsByService = filterClientsByService(response, "no");

    const filteredClientsByDoctor = filterClientsByDoctor(
      filteredClientsByService
    );

    this.setState({
      clientsOfDoctor1: filteredClientsByDoctor.doctor1,
      clientsOfDoctor2: filteredClientsByDoctor.doctor2
    });

    this.handleAverageAppointmentDuration(response);

    if (!response)
      this.setState({
        isNoDataMessageVisible: true
      });
  };

  saveAverageDurationtoLocalStorage = (doctor, duration) => {
    localStorage.setItem(doctor, JSON.stringify(duration));
  };

  countAverageAppointmentDuration = clientsByDoctor => {
    const averageDuration =
      clientsByDoctor
        .map(client => client.appointmentDuration)
        .reduce((total, current) => total + current, 0) /
      clientsByDoctor.length;

    return averageDuration;
  };

  handleAverageAppointmentDuration = response => {
    const filteredClientsByService = filterClientsByService(response, "yes");

    const filteredClientsByDoctor = filterClientsByDoctor(
      filteredClientsByService
    );

    if (!filteredClientsByDoctor.doctor1) return;

    const averageDurationDoctor1 = this.countAverageAppointmentDuration(
      filteredClientsByDoctor.doctor1
    );

    this.saveAverageDurationtoLocalStorage("doctor1", averageDurationDoctor1);

    if (!filteredClientsByDoctor.doctor2) return;

    const averageDurationDoctor2 = this.countAverageAppointmentDuration(
      filteredClientsByDoctor.doctor2
    );

    this.saveAverageDurationtoLocalStorage("doctor2", averageDurationDoctor2);
  };

  countWaitingTime = (client, index) => {
    const averageDurationDoctor1 = localStorage.getItem("doctor1");
    const averageDurationDoctor2 = localStorage.getItem("doctor2");

    const waitingTime =
      client.selectedDoctor === "doctor1"
        ? Math.round(index * averageDurationDoctor1)
        : Math.round(index * averageDurationDoctor2);

    return <Fragment>{waitingTime == 0 ? "Now" : waitingTime}</Fragment>;
  };

  renderScreen = clientsOfDoctor => {
    return (
      <div className="outer">
        <div className="inner">
          <Container>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Number</Table.HeaderCell>
                  <Table.HeaderCell>Doctor</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Waiting time in minutes
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {clientsOfDoctor &&
                clientsOfDoctor
                  .filter((client, index) => client.serviceProvided === "no")
                  .map((client, index) => {
                    return (
                      <Table.Body key={client.id}>
                        <Table.Row className={index === 0 ? "active" : ""}>
                          <Table.Cell> {client.name}</Table.Cell>
                          <Table.Cell> {client.id}</Table.Cell>
                          <Table.Cell>{client.selectedDoctor}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {this.countWaitingTime(client, index)}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    );
                  })}
            </Table>
          </Container>
        </div>
      </div>
    );
  };

  render() {
    const { clientsOfDoctor1, clientsOfDoctor2 } = this.state;

    return (
      <Fragment>
        {this.renderScreen(clientsOfDoctor1)}
        {this.renderScreen(clientsOfDoctor2)}
      </Fragment>
    );
  }
}

export default ClientsList;
