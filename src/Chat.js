import React from 'react';
import io from "socket.io-client";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      message: '',
      messages: []
    };

    this.socket = io('localhost:8080');

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        user: this.state.name,
        message: this.state.message
      });
      this.setState({ message: '' });
    }
    this.socket.on('RECEIVE_MESSAGE', function (data) {
      addMessage(data);
    });


  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title">{this.state.name}, welcome to the Aerofit chat!</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map(message => {
                    return (
                      <div>{message.user}: {message.message}</div>
                    )
                  })}
                </div>
                <div className="footer">
                  <input type="text" placeholder="Enter your name..."  className="form-control" value={this.state.name} onChange={ev => this.setState({ name: ev.target.value })} />
                  <br />
                  <div className="input-group mb-3">
                  <input type="text" placeholder="Type a message..." className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                    <div className="input-group-append">
                      <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Chat;