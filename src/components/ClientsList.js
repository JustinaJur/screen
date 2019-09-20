import React, { Fragment } from "react";
import { Dropdown, Container, Divider, Card, Message } from "semantic-ui-react";

import { getAllClients } from "../data/api";

class ClientsList extends React.Component {
  state = {
    doctor1: [],
    doctor2: [],
    isNoDataMessageVisible: false
  };

  componentDidMount() {
    this.getClientsData();
  }

  getClientsData = async () => {
    const response = await getAllClients();
    console.log(response);

    if (!response)
      this.setState({
        isNoDataMessageVisible: true
      });

    this.setState({
      doctor1: response.filter(doctor => doctor.selectedDoctor === "doctor1"),
      doctor2: response.filter(doctor => doctor.selectedDoctor === "doctor2")
    });
  };

  countWaitingTimeLeft = time => {};

  render() {
    const { isNoDataMessageVisible } = this.state;

    return (
      <Fragment>
        {isNoDataMessageVisible ? (
          <Message warning header="Clients' data was not found" />
        ) : (
          <Container>
            {this.state.doctor2 && (
              <Card>
                <h2>Doctor1</h2>
                {this.state.doctor1
                  .filter(client => client.serviceProvided == "no")
                  .map((client, index) => {
                    return (
                      <Fragment>
                        {index === 0 ? (
                          <div key={client.id} className="highlighted">
                            No. {client.id} -{client.name} {client.surname} NOW
                          </div>
                        ) : (
                          <div key={client.id}>
                            No. {client.id} -{client.name} {client.surname}
                            <p> In {index * 5} min.</p>
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
              </Card>
            )}
            <Card>
              {this.state.doctor2.length !== 0 && <h2>Doctor2</h2>}
              {this.state.doctor2.map((client, index) => {
                return (
                  <Fragment>
                    {index === 0 ? (
                      <div key={client.id} className="highlighted">
                        No. {client.id} -{client.name} {client.surname} NOW
                      </div>
                    ) : (
                      <div key={client.id}>
                        No. {client.id} -{client.name} {client.surname}
                        <p> In {index * 5} min.</p>
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </Card>
          </Container>
        )}
      </Fragment>
    );
  }
}

export default ClientsList;
