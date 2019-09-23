import React, { Fragment } from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";

import { getAllClients } from "../data/api";
import {
  filterClientsByService,
  filterClientsByDoctor,
  getClientIndex
} from "../utils/utils";

class Client extends React.Component {
  state = {
    clientNumber: null,
    clientIndex: null,
    selectedDoctor: "",
    noDataMessage: false,
    averageDuration: ""
  };

  componentDidMount() {
    this.waitingTimeIterval = setInterval(() => {
      this.setState({
        averageDuration: localStorage.getItem(this.state.selectedDoctor)
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.waitingTimeIterval);
  }

  findClientOnScreen = data => {
    const { clientNumber } = this.state;

    const foundClient = data.filter(client => {
      return client.id === Number(clientNumber);
    });

    return foundClient;
  };

  handleEnteredNumber = async () => {
    this.setState({
      noDataMessage: false
    });
    const response = await getAllClients();

    if (!response) return;

    const filteredClientsByService = filterClientsByService(response, "no");

    const filteredClientsByDoctor = filterClientsByDoctor(
      filteredClientsByService
    );

    const foundClient = this.findClientOnScreen(filteredClientsByService);

    if (foundClient.length === 0) {
      this.setState({
        noDataMessage: true
      });
      return;
    }

    const clientId = foundClient[0].id;
    const selectedDoctor = foundClient[0].selectedDoctor;
    const clientIndex = getClientIndex(
      clientId,
      filteredClientsByDoctor[selectedDoctor],
      "id"
    );
    this.setState({
      selectedDoctor,
      clientIndex
    });
  };

  renderTimeLeft = () => {
    const { noDataMessage, averageDuration, clientIndex } = this.state;

    const waitingTime = averageDuration * clientIndex;
    const roundedWaitingTime = Math.round(waitingTime);

    return (
      <Fragment>
        {(noDataMessage || roundedWaitingTime > 0) && (
          <Message>
            <Message.Header>
              {noDataMessage
                ? "Client was not found"
                : `Your appointment is in ${roundedWaitingTime} min`}
            </Message.Header>
          </Message>
        )}
      </Fragment>
    );
  };

  render() {
    return (
      <Container>
        <Form>
          <Form.Field>
            <label>Enter Your Number</label>
            <input
              placeholder="Your number"
              onChange={e => this.setState({ clientNumber: e.target.value })}
            />
          </Form.Field>
          <Button onClick={this.handleEnteredNumber} type="submit">
            Submit
          </Button>
        </Form>
        {this.renderTimeLeft()}
      </Container>
    );
  }
}

export default Client;
