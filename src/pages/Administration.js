import React, { Fragment } from "react";
import Moment from "react-moment";
import "moment-timezone";
import { Dropdown, Container, Divider, Card, Message } from "semantic-ui-react";

import { getAllClients, createNewClient } from "../data/api";
import { doctorsOptions } from "../data/doctorsOptions";
import moment from "moment";

class Administration extends React.Component {
  state = {
    name: "",
    surname: "",
    selectedDoctor: "doctor1",
    fullNames: [],
    doctor1: [],
    doctor2: [],
    isSuccessMessageVisible: false
  };
  componentDidMount() {
    this.getClientsData();
  }

  getClientsData = async () => {
    const response = await getAllClients();

    const currentDate = moment();
    console.log(currentDate._d);

    this.setState({
      doctor1: response.doctor1,
      doctor2: response.doctor2
    });
  };

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleSurnameChange = event => {
    this.setState({
      surname: event.target.value
    });
  };

  handleSelectedDoctor = (event, value) => {
    this.setState({
      selectedDoctor: event.target.textContent
    });
  };

  handleSuccessMessage = () => {
    setTimeout(() => {
      this.setState({ isSuccessMessageVisible: false });
    }, 1000);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////
  onSaveInitialData = () => {
    const { doctor1, doctor2 } = this.state;

    localStorage.setItem("doctor1", JSON.stringify(doctor1));
    localStorage.setItem("doctor2", JSON.stringify(doctor2));
  };

  onSubmitNewClient = async e => {
    e.preventDefault();
    const { name, surname, selectedDoctor } = this.state;
    // const person = {
    //   name: this.state.name,
    //   surname: this.state.surname,
    //   selectedDoctor: this.state.selectedDoctor
    // };
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const registrationIn = hours + "." + minutes;
    console.log(hours + "." + minutes + ":" + seconds);

    if (!name || !surname) return;
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
    console.log(response);
    // localStorage.setItem("user", JSON.stringify(person));
  };

  render() {
    const { isSuccessMessageVisible } = this.state;

    return (
      <Container>
        {isSuccessMessageVisible && (
          <Message
            success
            header="The client has been registered successfully"
          />
        )}
        <form class="ui form">
          <div class="field">
            <label>Select a Doctor</label>
            <Dropdown
              placeholder="Select a Doctor"
              fluid
              selection
              options={doctorsOptions}
              onChange={this.handleSelectedDoctor}
            />
          </div>
          <div class="field">
            <label>First Name</label>
            <input placeholder="First Name" onChange={this.handleNameChange} />
          </div>
          <div class="field">
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              onChange={this.handleSurnameChange}
            />
          </div>
          <button
            class="ui button primary"
            type="submit"
            onClick={this.onSubmitNewClient}
          >
            Add client
          </button>
        </form>
        <Divider horizontal />
        <button
          class="ui button secondary"
          type="submit"
          onClick={this.onSaveInitialData}
        >
          Save initial data to localStorage
        </button>
        <Divider horizontal />
        <button
          class="ui button secondary"
          type="submit"
          onClick={this.onSaveAllData}
        >
          Save all data to localStorage
        </button>
      </Container>
    );
  }
}

export default Administration;
