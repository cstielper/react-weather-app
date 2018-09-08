import React, { Component } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  font-size: 0.75em;
  text-align: center;

  .day {
    text-transform: uppercase;
  }

  img {
    width: 3.25em;
    height: 3.25em;
    margin: 0.5rem 0;
  }
`;

class ForecastCard extends Component {
  render() {
    const iconKey = this.props.icon;

    return (
      <Card>
        <span className="day">{this.props.date.weekday_short}</span>
        <br />
        <img src={this.props.icons[iconKey]} alt={this.props.conditions} />
        <br />
        {this.props.units === 'imperial'
          ? this.props.high.fahrenheit + '\u00b0'
          : this.props.high.celsius + '\u00b0'}{' '}
        /{' '}
        {this.props.units === 'imperial'
          ? this.props.low.fahrenheit + '\u00b0'
          : this.props.low.celsius + '\u00b0'}
      </Card>
    );
  }
}

export default ForecastCard;
