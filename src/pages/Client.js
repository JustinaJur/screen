import React from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";

import { getAllClients } from "../data/api";

class Client extends React.Component {
  state = {
    clientsNumber: null,
    timeLeft: []
  };

  handleClientsNumber = async () => {
    const { clientsNumber } = this.state;

    const response = await getAllClients();

    const timeLeft = response
      .filter(client => client.id === Number(clientsNumber))
      .map(data => data.registrationIn);
    console.log(timeLeft);
    this.setState({
      timeLeft
    });
  };

  render() {
    const { timeLeft } = this.state;

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
        {timeLeft.length > 0 && (
          <Message>
            <Message.Header>
              Your appointment is in {timeLeft} min.
            </Message.Header>
          </Message>
        )}
      </Container>
    );
  }
}

export default Client;
