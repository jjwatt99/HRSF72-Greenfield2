import React from 'react';

class MonthSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: "1"};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.monthSelectHandler(event.target.value)
  }

  handleSubmit(event) {
    console.log('The selected month is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick the Month:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


export default MonthSelect;