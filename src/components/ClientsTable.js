import React, { Fragment } from "react";
import { Table, Button } from "semantic-ui-react";

class ClientsTable extends React.Component {
  render() {
    const { doctor } = this.props;

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Number</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Surname</Table.HeaderCell>
            <Table.HeaderCell>Registered In </Table.HeaderCell>
            <Table.HeaderCell>Registered Out</Table.HeaderCell>
            <Table.HeaderCell>Appoinment duration</Table.HeaderCell>
            <Table.HeaderCell>Complete procedure</Table.HeaderCell>
            <Table.HeaderCell>Delete client</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {doctor.map((client, index) => {
          return (
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">{client.id}</Table.Cell>
                <Table.Cell textAlign="center">{client.name}</Table.Cell>
                <Table.Cell textAlign="center">{client.surname}</Table.Cell>
                <Table.Cell textAlign="center">
                  {client.registrationIn}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {client.registrationOut}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {client.appointmentDuration
                    ? `${client.appointmentDuration} min`
                    : ""}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    basic
                    color="green"
                    id={client.id}
                    onClick={
                      // event =>

                      this.props.onUpdateClient
                      // (
                      //   event,
                      //   client.name,
                      //   client.surname,
                      //   client.selectedDoctor,
                      //   client.registrationIn
                      // )
                    }
                  >
                    Done
                  </Button>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    basic
                    color="grey"
                    id={client.id}
                    onClick={
                      // event =>
                      this.props.onDeleteClient
                      // (event)
                    }
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          );
        })}
      </Table>
    );
  }
}

export default ClientsTable;
