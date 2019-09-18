import React from "react";

import { getAllClients, createNewClient } from "../data/api";

class Administration extends React.Component {
  state = {
    name: "",
    surname: "",
    selectedDoctor: "doctor1",
    fullNames: [],
    doctor1: [],
    doctor2: []
  };

  componentDidMount() {
    this.getClientsData();
  }

  getClientsData = async () => {
    const response = await getAllClients();

    // this.setState({
    //   doctor1: response.doctor1,
    //   doctor2: response.doctor2
    // });
  };

  onSaveClientsData = () => {
    const { doctor1, doctor2 } = this.state;

    localStorage.setItem("doctor1", JSON.stringify(doctor1));
    localStorage.setItem("doctor2", JSON.stringify(doctor2));
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

  handleSelectedDoctor = event => {
    this.setState({
      selectedDoctor: event.target.value
    });
  };

  onSubmitNewClient = async () => {
    const { name, surname, selectedDoctor } = this.state;
    // const person = {
    //   name: this.state.name,
    //   surname: this.state.surname,
    //   selectedDoctor: this.state.selectedDoctor
    // };
    const response = await createNewClient(name, surname, selectedDoctor);
    console.log(response);
    // localStorage.setItem("user", JSON.stringify(person));
  };

  render() {
    return (
      <div>
        <select
          onChange={this.handleSelectedDoctor}
          value={this.state.selectedDoctor}
        >
          <option value="doctor1" defaultValue>
            Doctor1
          </option>
          <option value="doctor2">Doctor2</option>
        </select>
        <label>
          Name:
          <input placeholder="name" onChange={this.handleNameChange} />
        </label>
        <label>
          Surname:
          <input placeholder="surname" onChange={this.handleSurnameChange} />
        </label>
        <button onClick={this.onSubmitNewClient}>Add client</button> <br />
        <button onClick={this.onSaveClientsData}>
          Save data to localStorage
        </button>
      </div>
    );
  }
}

export default Administration;
