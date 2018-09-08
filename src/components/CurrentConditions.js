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
    font-weight: normal;

    span {
      font-size: 1.25em;
      font-weight: bold;
    }
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
    let temp, feelsLike, dewPoint, precip, wind, pressure, visibility;

    // Set all of our variables based on the user's setting (imperial/metric)
    this.props.units === 'imperial'
      ? (temp = Math.round(this.props.current.temp_f) + '\u00b0')
      : (temp = Math.round(this.props.current.temp_c) + '\u00b0');

    this.props.units === 'imperial'
      ? (feelsLike = Math.round(this.props.current.feelslike_f) + '\u00b0')
      : (feelsLike = Math.round(this.props.current.feelslike_c) + '\u00b0');

    this.props.units === 'imperial'
      ? (dewPoint = Math.round(this.props.current.dewpoint_f) + '\u00b0')
      : (dewPoint = Math.round(this.props.current.dewpoint_c) + '\u00b0');

    this.props.units === 'imperial'
      ? (precip = this.props.current.precip_today_in + ' in')
      : (precip = this.props.current.precip_today_metric + ' mm');

    this.props.units === 'imperial'
      ? (wind =
          this.props.current.wind_dir +
          ' ' +
          Math.round(this.props.current.wind_mph) +
          ' mph')
      : (wind =
          this.props.current.wind_dir +
          ' ' +
          Math.round(this.props.current.wind_kph) +
          ' kph');

    this.props.units === 'imperial'
      ? (pressure = this.props.current.pressure_in + ' in')
      : (pressure = this.props.current.pressure_mb + ' mb');

    this.props.units === 'imperial'
      ? (visibility = this.props.current.visibility_mi + ' mi')
      : (visibility = this.props.current.visibility_km + ' km');

    // Setup our icon
    const iconKey = this.props.current.icon;

    return (
      <ConditionsWrapper>
        <h1>Hello, {this.props.firstName}</h1>
        <h2>
          Current conditions for: <br />
          <span>{this.props.current.display_location.full}</span>
        </h2>
        <img src={this.props.icons[iconKey]} className="icon" />
        <br />
        <span className="temp">{temp}</span>
        <br />
        <span className="feels-like">Feels like: {feelsLike}</span>
        <ul>
          <li>Relative Humidity: {this.props.current.relative_humidity}</li>
          <li>Dew Point: {dewPoint}</li>
          <li>Precipitation: {precip}</li>
          <li>Wind: {wind}</li>
          <li>Pressure: {pressure}</li>
          <li>Visibility: {visibility}</li>
        </ul>
      </ConditionsWrapper>
    );
  }
}

export default CurrentConditions;
