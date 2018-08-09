import React from 'react';
import {Panel,PanelGroup} from 'react-bootstrap';
import {BrowserRouter as Link,BrowserRouter,Route} from 'react-router-dom';

import Chat from './Chat';
class FAQ extends React.Component {
  render() {
    return (
      <div className="container">
      <h1 style={{textAlign:'center'}}>Frequently asked questions</h1>
      <p>Welcome to the FAQ page, if you don't see an answer to your inquiry, be sure to contact us through the chat</p>
      <PanelGroup accordion id="accordion-example">
        <Panel eventKey="1">
          <Panel.Heading>
            <Panel.Title toggle>How do I change the settings on the device?</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
          In order to change the settings, you have to turn the knobs on the side of the device. Make sure to adjust them carefully to prevent damage to the device.
    </Panel.Body>
        </Panel>
        <Panel eventKey="2">
          <Panel.Heading>
            <Panel.Title toggle>What do the numbers and letters on the device mean?</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
          They signify the different settings of the device. The easiest setting is A1, while F5 is the most difficult.
    </Panel.Body>
        </Panel>
        <Panel eventKey="3">
          <Panel.Heading>
            <Panel.Title toggle>How can I clean the device?</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
          In order to correctly clean the device you need to take out the small electronic panel and clean with a damp towel. Be sure to dry it off before placing the electronic panel back!
    </Panel.Body>
        </Panel>
        <Panel eventKey="4">
          <Panel.Heading>
            <Panel.Title toggle>I have respiratory problems,can I use the device?</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
         The device is safe to use for people with asthma, bronchitis and light lung infections. Contact your physician if you are unsure if the device would be harmful.
    </Panel.Body>
        </Panel>
      </PanelGroup>
      </div>
    )
  }
}
export default FAQ;