import React from "react";

class Private extends React.Component {
  handleNameChange = event => {
    console.log(event.target.value);
    localStorage.setItem("name", event.target.value);
  };

  handleSurnameChange = event => {
    console.log(event.target.value);
    localStorage.setItem("surname", event.target.value);
  };

  onSubmitFullName = event => {
    const fullName =
      localStorage.getItem("name") + " " + localStorage.getItem("surname");
    console.log(fullName);
  };

  render() {
    return (
      <div>
        <input placeholder="name" onChange={this.handleNameChange} />
        <input placeholder="surname" onChange={this.handleSurnameChange} />
        <button onClick={this.onSubmitFullName}>Add client</button>
        Private
      </div>
    );
  }
}

export default Private;
