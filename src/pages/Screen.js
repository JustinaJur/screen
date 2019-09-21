import React from "react";
import { Menu, Modal, Button } from "semantic-ui-react";

import ClientsList from "../components/ClientsList";

class Screen extends React.Component {
  render() {
    return (
      <div>
        {/* <Modal trigger={<Button>Show Modal</Button>}> */}
        <ClientsList />
        {/* </Modal> */}
      </div>
    );
  }
}

export default Screen;
