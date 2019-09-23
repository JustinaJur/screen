import React from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";
import { groupBy, filter } from "lodash";

import { getAllClients } from "../data/api";
import {
  filterClientsByService,
  filterClientsByDoctor,
  getClientIndex
} from "../utils/utils";

class Client extends React.Component {
  state = {
    clientNumber: null,
    timeLeft: null,
    // averageDuration: 5,
    clientIndex: "",
    clientsOfDoctor1: [],
    clientsOfDoctor2: [],
    selectedDoctor: "",
    noDataMessage: false
    //averageDuration: 0
  };

  // componentDidMount() {
  //   // const i = this.state.clientIndex === 0 ? 1 : this.state.clientIndex;

  //   console.log(this.state.averageDuration);
  //   console.log(this.state.clientIndex);
  //   this.interval = setInterval(
  //     () =>
  //       this.setState({
  //         timeLeft: this.state.averageDuration * this.state.clientIndex
  //       }),
  //     5000
  //   );
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  // getClientIndex = (value, array, propertyName) => {
  //   for (let index = 0; index < array.length; index++) {
  //     if (array[index][propertyName] === value) {
  //       console.log("index", index);
  //       return index;
  //     }
  //   }
  //   console.log("nera tokio");
  //   return -1;
  // };

  findClientOnScreen = data => {
    const { clientNumber } = this.state;

    const foundClient = data.filter(client => {
      return (
        client.id === Number(clientNumber) && client.serviceProvided === "no"
      );
    });
    console.log(foundClient);
    return foundClient;
  };

  handleClientsNumber = async () => {
    const {
      clientNumber,
      // averageDuration,
      clientsOfDoctor1,
      clientsOfDoctor2
    } = this.state;

    this.setState({
      noDataMessage: false
    });
    const response = await getAllClients();

    if (!response) return;

    const filteredClientsByService = filterClientsByService(response, "no");

    const filteredClientsByDoctor = filterClientsByDoctor(
      filteredClientsByService
    );

    const foundClient = this.findClientOnScreen(response);
    console.log(foundClient);

    if (foundClient.length === 0) {
      this.setState({
        noDataMessage: true
      });
      return;
    }

    // const foundClient = response.filter(client => {
    //   return (
    //     client.id === Number(clientsNumber) && client.serviceProvided === "no"
    //   );
    // });
    // console.log(foundClient.length);

    // if (foundClient.length === 0) {
    //   this.setState({
    //     noDataMessage: true
    //   });
    //   return;
    // }

    const clientId = foundClient[0].id;
    const selectedDoctor = foundClient[0].selectedDoctor;
    // this.setState({
    //   selectedDoctor
    // });

    const averageDuration = localStorage.getItem(selectedDoctor);

    if (selectedDoctor === "doctor1") {
      const clientIndex = this.getClientIndex(
        clientId,
        filteredClientsByDoctor.doctor1,
        "id"
      );
      console.log("avergae duration of docotr1", averageDuration);
      this.setState({
        timeLeft: averageDuration * clientIndex
        //averageDuration
      });
    } else {
      const clientIndex = this.getClientIndex(
        clientId,
        filteredClientsByDoctor.doctor2,
        "id"
      );
      console.log("avergae duration of docotr2", averageDuration);
      this.setState({
        timeLeft: averageDuration * clientIndex
      });
    }
  };

  render() {
    const { timeLeft, clientIndex, noDataMessage } = this.state;

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

        {/* {timeLeft !== null && (
          <Message>
            <Message.Header>
              Your appointment is in {Math.round(timeLeft)} min.
            </Message.Header>
          </Message>
        )} */}
        {/* {timeLeft && timeLeft} */}
        {noDataMessage ? "No data" : timeLeft && timeLeft}
      </Container>
    );
  }
}

export default Client;
