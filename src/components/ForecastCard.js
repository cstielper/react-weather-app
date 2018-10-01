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
    const iconKey = this.props.icon.replace(/-/g, '');
    const daysOfWeek = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
    };
    const date = new Date(this.props.time * 1000);

    return (
      <Card>
        <span className="day">{daysOfWeek[date.getDay()]}</span>
        <br />
        <img src={this.props.icons[iconKey]} alt={this.props.summary} />
        <br />
        {Math.round(this.props.temperatureHigh) + '\u00b0'}/
        {Math.round(this.props.temperatureLow) + '\u00b0'}
      </Card>
    );
  }
}

export default ForecastCard;
