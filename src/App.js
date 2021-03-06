import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

import Header from './components/Header';
import Footer from './components/Footer';
import CurrentConditions from './components/CurrentConditions';
import Forecast from './components/Forecast';
import UserSettings from './components/UserSettings';
import Loader from './components/Loader';
import Error from './components/Error';

const WeatherWrapper = styled.div``;

class App extends Component {
  constructor() {
    super();
    this.updateUserSettings = this.updateUserSettings.bind(this);
    this.toggleSettingsPane = this.toggleSettingsPane.bind(this);
    this.state = {
      data: {},
      userSettings: {},
      settingsPane: false,
      locationChecked: false,
      hasSettings: false,
      loaded: false,
      error: null,
    };
    this.forecastIcons = {
      clearday: 'imgs/sunny.svg',
      clearnight: 'imgs/clear-night.svg',
      partlycloudyday: 'imgs/mostly-sunny.svg',
      partlycloudynight: 'imgs/partly-cloudy-night.svg',
      cloudy: 'imgs/cloudy.svg',
      rain: 'imgs/rain-hvy.svg',
      sleet: 'imgs/sleet.svg',
      snow: 'imgs/hvy-snow.svg',
      wind: 'imgs/wind.svg',
      fog: 'imgs/fog.svg',
    };
  }

  // Check if there are settings stored from a previous session and set them to state
  componentDidMount() {
    const lsSettings = localStorage.getItem('react-weather-app-user-settings');
    if (lsSettings) {
      const settings = JSON.parse(lsSettings);
      this.setState({ userSettings: settings, hasSettings: true, error: null });
    }
  }

  // If we have the user's settings in state, go ahead and ask for their location
  componentDidUpdate() {
    if (Object.keys(this.state.userSettings).length) {
      this.getLocation();
    }
  }

  // Update state with values passed in from the UserSettings component and store them in LocalStorage for later use
  updateUserSettings = obj => {
    let settings = { ...this.state.userSettings };
    settings = { ...obj };
    this.setState({
      userSettings: settings,
      settingsPane: false,
      locationChecked: false,
      hasSettings: true,
      loaded: false,
    });

    localStorage.setItem(
      'react-weather-app-user-settings',
      JSON.stringify(settings)
    );
    this.getLocation();
  };

  getLocation = () => {
    if (!this.state.locationChecked) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            this.setState({ locationChecked: true });

            fetch(
              `https://react-weather-app-back-end.herokuapp.com/?lat=${lat}&lng=${lng}&units=${
                this.state.userSettings.units
              }`
            )
              .then(resp => resp.json())
              .then(data => this.setState({ data: data, loaded: true }))
              .catch(err => console.error(err));
          },
          error => {
            this.setState({
              locationChecked: false,
              error: error.message,
              loaded: true,
            });
          }
        );
      } else {
        this.setState({
          locationChecked: true,
          loaded: true,
          error:
            "We're sorry, but geolocation is not available on this device.",
        });
      }
    }
  };

  toggleSettingsPane = () => {
    const status = this.state.settingsPane;
    !status
      ? this.setState({ settingsPane: true })
      : this.setState({ settingsPane: false });
  };

  render() {
    return (
      <div className="app">
        <Header
          togglePanes={this.toggleSettingsPane}
          hasSettings={this.state.hasSettings}
        />

        {!this.state.loaded && Object.keys(this.state.userSettings).length ? (
          <Loader />
        ) : (
          false
        )}

        {this.state.error ? <Error message={this.state.error} /> : false}

        {Object.keys(this.state.data).length && this.state.loaded ? (
          <WeatherWrapper>
            <CurrentConditions
              current={this.state.data.currently}
              firstName={this.state.userSettings.firstName}
              units={this.state.userSettings.units}
              icons={this.forecastIcons}
            />
            <Forecast
              forecast={this.state.data.daily}
              units={this.state.userSettings.units}
              icons={this.forecastIcons}
            />
          </WeatherWrapper>
        ) : (
          false
        )}

        {
          <UserSettings
            update={this.updateUserSettings}
            hasSettings={this.state.hasSettings}
            className={
              !Object.keys(this.state.userSettings).length ||
              this.state.settingsPane
                ? 'active'
                : 'inactive'
            }
          />
        }
        <Footer />
      </div>
    );
  }
}

export default App;
