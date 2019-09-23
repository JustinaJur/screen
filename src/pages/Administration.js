import React from "react";
import { groupBy } from "lodash";
import {
  Dropdown,
  Container,
  Divider,
  Message,
  Form,
  Button
} from "semantic-ui-react";

import { getAllClients, createNewClient } from "../data/api";
import { doctorsOptions } from "../data/doctorsOptions";

class Administration extends React.Component {
  state = {
    name: "",
    surname: "",
    clientsOfDoctor1: [],
    clientsOfDoctor2: [],
    selectedDoctor: null,
    isSuccessMessageVisible: false
  };

  componentDidMount() {
    this.getClientsData();
  }

  getClientsData = async () => {
    const response = await getAllClients();

    const clientsByDoctor = groupBy(response, item => item.selectedDoctor);

    this.setState({
      clientsOfDoctor1: clientsByDoctor.doctor1,
      clientsOfDoctor2: clientsByDoctor.doctor2
    });
  };

  handleSuccessMessage = () => {
    setTimeout(() => {
      this.setState({ isSuccessMessageVisible: false });
    }, 1200);
  };

  onSaveCurrentClientsToLocalStorage = () => {
    const { clientsOfDoctor1, clientsOfDoctor2 } = this.state;

    localStorage.setItem("doctor1", JSON.stringify(clientsOfDoctor1));
    localStorage.setItem("doctor2", JSON.stringify(clientsOfDoctor2));
  };

  countRegistrationInTime = () => {
    const registrationDate = new Date().toISOString().slice(0, 10);
    const registrationTime = new Date().toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit"
    });
    const registrationIn = `${registrationDate} ${registrationTime}`;

    return registrationIn;
  };

  onSubmitNewClient = async e => {
    e.preventDefault();
    const { name, surname, selectedDoctor } = this.state;

    const registrationIn = this.countRegistrationInTime();

    if (!name || !surname || !selectedDoctor) return;

    const response = await createNewClient(
      name,
      surname,
      selectedDoctor,
      registrationIn
    );

    if (response) {
      this.setState({
        isSuccessMessageVisible: true
      });
      this.handleSuccessMessage();
    }
  };

  renderRegistrationForm = () => {
    return (
      <Form>
        <Form.Field>
          <label>Select a Doctor</label>
          <Dropdown
            placeholder="Select a Doctor"
            fluid
            selection
            options={doctorsOptions}
            onChange={e =>
              this.setState({ selectedDoctor: e.target.textContent })
            }
          />
        </Form.Field>

        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            onChange={e => this.setState({ surname: e.target.value })}
          />
        </Form.Field>
        <Button onClick={this.onSubmitNewClient} primary>
          Add client
        </Button>
      </Form>
    );
  };

  render() {
    const { isSuccessMessageVisible } = this.state;

    return (
      <Container>
        {this.renderRegistrationForm()}
        <Divider horizontal />
        <Button secondary onClick={this.onSaveCurrentClientsToLocalStorage}>
          Save clients to LocalStorage
        </Button>
        <Divider horizontal />
        {isSuccessMessageVisible && (
          <Message
            success
            header="The client has been registered successfully"
          />
        )}
      </Container>
    );
  }
}

export default Administration;
