import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
          ? <div class="loading">
              <svg class="loadsvg" viewBox="0 0 50 50">
                <circle class="ring" cx="25" cy="25" r="20"></circle>
                <circle class="ball" cx="25" cy="5" r="3.5"></circle>
              </svg>
              <p><em>Loading...</em></p>
            </div>
            : App.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                {/*<h1 id="tabelLabel" >Weather forecast</h1>*/}
                <p>Hello World</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
