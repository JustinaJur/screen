import React, { Fragment } from "react";
import Moment from "react-moment";
import moment from "react-moment";
import "moment-timezone";
import {
  Dropdown,
  Container,
  Divider,
  Card,
  Message,
  List,
  Table,
  Modal,
  Button
} from "semantic-ui-react";

import { getAllClients } from "../data/api";

class ClientsList extends React.Component {
  state = {
    clientsOfDoctor1: [],
    clientsOfDoctor2: [],
    isNoDataMessageVisible: false,
    averageDurationDoctor1: 0,
    averageDurationDoctor2: 0,
    allClients: []
    // unservedClientsDoctor1: [],
    // unservedClientsDoctor2: []
  };

  componentDidMount() {
    this.getClientsData();
  }

  getClientsData = async () => {
    const response = await getAllClients();
    console.log(response);

    this.setState({
      allClients: response
    });

    if (!response)
      this.setState({
        isNoDataMessageVisible: true
      });

    this.setState({
      clientsOfDoctor1: response.filter(
        doctor => doctor.selectedDoctor === "doctor1"
      ),
      clientsOfDoctor2: response.filter(
        doctor => doctor.selectedDoctor === "doctor2"
      )
    });
    this.countAverageAppointmentDuration(response);
  };

  saveAverageDurationtoLocalStorage = (doctor, duration) => {
    localStorage.setItem(doctor, JSON.stringify(duration));
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

  countWaitingTime = (client, index) => {
    const { averageDurationDoctor1, averageDurationDoctor2 } = this.state;

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
                  <Table.HeaderCell>Waiting time in minutes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {clientsOfDoctor
                .filter((client, index) => client.serviceProvided === "no")
                .map((client, index) => {
                  return (
                    <Table.Body>
                      <Table.Row className={index === 0 ? "active" : ""}>
                        <Table.Cell> {client.name}</Table.Cell>
                        <Table.Cell>No. {client.id}</Table.Cell>
                        <Table.Cell>{client.selectedDoctor}</Table.Cell>
                        <Table.Cell>
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
