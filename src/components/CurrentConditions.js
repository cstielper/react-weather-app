import React, { Component } from 'react';
import styled from 'styled-components';

const ConditionsWrapper = styled.div`
  padding: 0 var(--app_padding);
  margin: 0 auto;
  max-width: var(--max_content_width);
  text-align: center;

  h1 {
    margin: 0 0 0.5em;
    line-height: 1.125;
  }

  h2 {
    margin: 0 0 0.25em;
    font-size: 1em;
    font-weight: bold;
  }

  .icon {
    width: 8em;
    height: 8em;
  }

  .temp {
    font-size: 4.25em;
    line-height: 1;
  }

  .feels-like {
    font-size: 1.125em;
  }

  ul {
    margin: 1.5rem 0 0.25rem;
    padding: 0.75rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    font-size: 0.75em;
    line-height: 1.5;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);

    li {
      flex: 0 0 48%;
    }
  }
`;

class CurrentConditions extends Component {
  render() {
    let wind, pressure, visibility;

    // Set some variables based on the user's setting (us/si)
    this.props.units === 'us'
      ? (wind = Math.round(this.props.current.windSpeed) + ' mph')
      : (wind = Math.round(this.props.current.windSpeed) + ' mps');

    this.props.units === 'us'
      ? (pressure = this.props.current.pressure + ' mb')
      : (pressure = this.props.current.pressure + ' hPa');

    this.props.units === 'us'
      ? (visibility = this.props.current.visibility + ' mi')
      : (visibility = this.props.current.visibility + ' km');

    // Setup our icon
    const iconKey = this.props.current.icon.replace(/-/g, '');

    return (
      <ConditionsWrapper>
        <h1>Hello, {this.props.firstName}</h1>
        <h2>{this.props.current.summary}</h2>
        <img
          src={this.props.icons[iconKey]}
          className="icon"
          alt={this.props.current.summary}
        />
        <br />
        <span className="temp">
          {Math.round(this.props.current.temperature)}
          &deg;
        </span>
        <br />
        <span className="feels-like">
          Feels like: {Math.round(this.props.current.apparentTemperature)}
          &deg;
        </span>
        <ul>
          <li>Humidity: {this.props.current.humidity * 100}%</li>
          <li>
            Dew Point: {Math.round(this.props.current.dewPoint)}
            &deg;
          </li>
          <li>
            Chance Precip:{' '}
            {Math.round(this.props.current.precipProbability) * 100}%
          </li>
          <li>Wind: {wind}</li>
          <li>Pressure: {pressure}</li>
          <li>Visibility: {visibility}</li>
        </ul>
      </ConditionsWrapper>
    );
  }
}

export default CurrentConditions;
