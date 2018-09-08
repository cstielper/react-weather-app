import React, { Component } from 'react';
import styled from 'styled-components';

const SettingsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--app_padding);
  background: var(--color_brand_2);
  transition: transform 0.5s, opacity 0.25s;

  &.inactive {
    transform: translate3D(0, 100vh, 0);
    opacity: 0;
  }

  h1 {
    font-size: 2.5em;
  }

  h1,
  h2,
  form {
    width: 100%;
    max-width: var(--max_content_width);
    margin-left: auto;
    margin-right: auto;
  }

  fieldset {
    margin: 1rem 0;

    label {
      margin-right: 1rem;

      &:hover {
        cursor: pointer;
      }
    }
  }

  label {
    font-size: 0.875em;
    text-transform: uppercase;
  }

  input[type='text'] {
    padding: 5px;
    width: 100%;
    font-size: 1.25em;
  }

  input[type='radio'] {
    margin-right: 0.375em;
  }

  input[type='submit'] {
    padding: 0.75rem 1.25rem;
    background: var(--color_brand_3);
    color: #fff;
    border: 0;
    text-transform: uppercase;
    transition: 0.25s background, opacity 0.25s;

    &:hover {
      background: var(--color_brand_4);
      cursor: pointer;
    }

    &:disabled {
      opacity: 0.25;

      &:hover {
        background: var(--color_brand_3);
        cursor: inherit;
      }
    }
  }
`;

class UserSettings extends Component {
  state = {
    firstName: '',
    units: 'imperial',
  };

  componentDidMount() {
    const ls = localStorage.getItem('react-weather-app-user-settings');
    if (ls) {
      const data = JSON.parse(ls);
      for (let key in data) {
        //console.log(key);
        if (data.hasOwnProperty(key)) {
          let value = data[key];
          //console.log('Key is ' + key + ', value is' + data[key]);
          this.setState({ [key]: value });
        }
      }
    }
  }

  updateUserSettings = e => {
    const value = e.target.value;
    this.setState({ [`${e.target.name}`]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.update(this.state);
  };

  render() {
    return (
      <SettingsWrapper className={this.props.className}>
        {!this.props.hasSettings ? (
          <React.Fragment>
            <h1>Looks Like You're New Here</h1>
            <h2>Please Set Your Preferences:</h2>
          </React.Fragment>
        ) : (
          <h1>Edit Your Preferences</h1>
        )}

        <form onSubmit={this.onSubmit}>
          <label htmlFor="first-name">
            * First Name
            <br />
            <input
              type="text"
              name="firstName"
              id="first-name"
              required
              value={this.state.firstName}
              onChange={this.updateUserSettings}
            />
          </label>
          <fieldset>
            <legend>Units</legend>

            <label htmlFor="radio-btn-1">
              <input
                type="radio"
                value="imperial"
                name="units"
                id="radio-btn-1"
                onChange={this.updateUserSettings}
                checked={this.state.units === 'imperial'}
              />
              &deg;F
            </label>
            <label htmlFor="radio-btn-2">
              <input
                type="radio"
                value="metric"
                name="units"
                id="radio-btn-2"
                onChange={this.updateUserSettings}
                checked={this.state.units === 'metric'}
              />
              &deg;C
            </label>
          </fieldset>
          <input
            type="submit"
            value="Update"
            disabled={this.state.firstName === ''}
          />
        </form>
      </SettingsWrapper>
    );
  }
}

export default UserSettings;
