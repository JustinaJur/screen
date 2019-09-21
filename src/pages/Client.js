import React from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";

import { getAllClients } from "../data/api";

class Client extends React.Component {
  state = {
    clientsNumber: null,
    timeLeft: null,
    // averageDuration: 5,
    clientIndex: "",
    doctor1: [],
    doctor2: [],
    selectedDoctor: "",
    averageDuration: 23
  };

  componentDidMount() {
    // const i = this.state.clientIndex === 0 ? 1 : this.state.clientIndex;

    console.log(this.state.averageDuration);
    console.log(this.state.clientIndex);
    this.interval = setInterval(
      () =>
        this.setState({
          timeLeft: this.state.averageDuration * this.state.clientIndex
        }),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getClientIndex = (value, array, propertyName) => {
    for (let index = 0; index < array.length; index++) {
      if (Number(array[index][propertyName]) === Number(value)) {
        console.log("index", index);
        // this.setState({
        //   clientIndex: index
        // });

        //console.log(array.toString());
        const averageDuration = localStorage.getItem(this.state.selectedDoctor);

        console.log("avergae duration of docotr", averageDuration);

        this.setState({
          timeLeft: averageDuration * index,
          averageDuration
        });
        console.log(this.state.timeLeft);
        console.log(this.state);
      }
    }
    console.log("nera tokio");
    return -1;
  };

  handleClientsNumber = async () => {
    const { clientsNumber, averageDuration, doctor1, doctor2 } = this.state;

    const response = await getAllClients();

    if (!response) return;

    this.setState({
      doctor1: response.filter(
        client =>
          client.selectedDoctor === "doctor1" && client.serviceProvided == "no"
      ),
      doctor2: response.filter(
        client =>
          client.selectedDoctor === "doctor2" && client.serviceProvided == "no"
      )
    });

    const filteredClient = response.filter(client => {
      return (
        client.id === Number(clientsNumber) && client.serviceProvided === "no"
      );
    });

    if (!filteredClient) {
      return;
    }
    const clientId = filteredClient[0].id;
    const clientDoctor = filteredClient[0].selectedDoctor;
    this.setState({
      selectedDoctor: clientDoctor
    });

    if (clientDoctor === "doctor1") {
      this.getClientIndex(clientId, this.state.doctor1, "id");
    } else {
      this.getClientIndex(clientId, doctor2, "id");
    }
  };

  render() {
    const { timeLeft, clientIndex } = this.state;

    return (
      <Container>
        <Form>
          <Form.Field>
            <label>Enter Your Number</label>
            <input
              placeholder="Your number"
              onChange={e => this.setState({ clientsNumber: e.target.value })}
            />
          </Form.Field>
          <Button onClick={this.handleClientsNumber} type="submit">
            Submit
          </Button>
        </Form>

        {timeLeft !== null && (
          <Message>
            <Message.Header>
              Your appointment is in {Math.round(timeLeft)} min.
            </Message.Header>
          </Message>
        )}
      </Container>
    );
  }
}

export default Client;
