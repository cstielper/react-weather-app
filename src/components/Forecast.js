import React, { Component } from 'react';
import ForecastCard from './ForecastCard';
import styled from 'styled-components';

const ForecastWrapper = styled.div`
  padding: 1rem 0;
  margin: 0 auto;
  width: 85%;
  max-width: var(--max_content_width);
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  div {
    flex: 0 0 25%;
  }

  @media (min-width: 750px) and (min-height: 900px) {
    padding: 1rem;

    div {
      flex: 0 0 20%;
    }
  }

  @media (min-width: 1200px) and (min-height: 900px) {
    padding: 1rem 1.5rem;

    div {
      flex: 1 1 auto;
    }
  }
`;

class Forecast extends Component {
  state = {
    data: [],
  };

  // Remove the first item from our props array and set it to state
  // The first item provides info about today's forecast, but we only want future days
  componentDidMount() {
    const forecast = this.props.forecast.data;
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
            key={day.time}
          />
        ))}
      </ForecastWrapper>
    );
  }
}

export default Forecast;
