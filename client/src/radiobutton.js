/* import React, { Component } from 'react';
import { MDBFormInline, MDBInput } from 'mdbreact';

class InputPage extends Component {
  state = {
    radio: 2
  };

  onClick = nr => () => {
    this.setState({
      radio: nr
    });
  };

  render() {
    return (
      <MDBFormInline>
        <MDBInput
          onClick={this.onClick(1)}
          checked={this.state.radio === 1 ? true : false}
          label='1'
          type='radio'
          id='radio1'
          containerClass='mr-5'
        />
        <MDBInput
          onClick={this.onClick(2)}
          checked={this.state.radio === 2 ? true : false}
          label='2'
          type='radio'
          id='radio2'
          containerClass='mr-5'
        />
        <MDBInput
          onClick={this.onClick(3)}
          checked={this.state.radio === 3 ? true : false}
          label='3'
          type='radio'
          id='radio3'
          containerClass='mr-5'
        />
      </MDBFormInline>
    );
  }
}

export default InputPage; */