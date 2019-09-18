import React from "react";

//import ClientsData from "../data/clients.json";

class Administration extends React.Component {
  state = {
    name: "",
    surname: "",
    fullNames: []
  };

  // onSaveClientsData = () => {
  //   localStorage.setItem("clients", JSON.stringify(ClientsData));
  //   console.log(ClientsData);
  //   //a.data.doctor1.map(name => name.name)
  // };

  handleNameChange = event => {
    console.log(event.target.value);
    this.setState({
      name: event.target.value
    });
    //localStorage.setItem("name", event.target.value);
  };

  handleSurnameChange = event => {
    console.log(event.target.value);
    this.setState({
      surname: event.target.value
    });
    //localStorage.setItem("surname", event.target.value);
  };

  onSubmitFullName = event => {
    const person = {
      name: this.state.name,
      surname: this.state.surname
    };
    console.log(person);
    localStorage.setItem("user", JSON.stringify(person));
  };

  render() {
    return (
      <div>
        <input placeholder="name" onChange={this.handleNameChange} />
        <input placeholder="surname" onChange={this.handleSurnameChange} />
        <button onClick={this.onSubmitFullName}>Add client</button>

        <button onClick={this.onSaveClientsData}>
          Save data to localStorage
        </button>
      </div>
    );
  }
}

export default Administration;
