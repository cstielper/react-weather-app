import React, { Component } from 'react';
import ForecastCard from './ForecastCard';
import styled from 'styled-components';

const ForecastWrapper = styled.div`
  padding: 1rem;
  margin: 0 auto;
  max-width: var(--max_content_width);
  display: flex;

  div {
    flex: 1 1 auto;
  }
`;

class Forecast extends Component {
  state = {
    data: [],
  };

  // Remove the first item from our props array and set it to state
  // The first item provides info about today's forecast, but we only want future days
  componentDidMount() {
    const forecast = this.props.forecast;
    forecast.shift();
    this.setState({ data: forecast });
  }

  render() {
    return (
      <ForecastWrapper className="forecast">
        {this.state.data.map(day => (
          <ForecastCard
            {...day}
            units={this.props.units}
            icons={this.props.icons}
            key={day.date.weekday_short.toLowerCase()}
          />
        ))}
      </ForecastWrapper>
    );
  }
}

export default Forecast;
