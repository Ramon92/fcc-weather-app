import React, {Component} from 'react';
import DarkSkyApi from 'dark-sky-api';

import './App.css';
import Weather from './components/Weather';

DarkSkyApi.apiKey = 'ecce78e27f7acdbd7faa415857ef2ac6';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            degreeType: 'celcius',
            weatherLocation: {},
            degrees: {
                farenheit: '',
                celcius: ''
            },
            icon: '',
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    render() {
        return (
            <div className="weather">
                <h1 onClick={() => {
                    this.getCurrentWeather()
                }}>FCC Weather App By Ramon</h1>
                <p>long: {this.state.weatherLocation.longitude} lat: {this.state.weatherLocation.latitude}</p>
                <Weather degreeType={this.state.degreeType} loaded={this.state.loaded} degrees={this.state.degrees}
                         icon={this.state.icon}/>
            </div>
        );
    }

    getLocation() {
        let returnLocation = (pos) => {
            this.setState({
                weatherLocation: {
                    longitude: pos.coords.longitude,
                    latitude: pos.coords.latitude
                }
            }, this.getCurrentWeather)
        };

        navigator.geolocation.getCurrentPosition(returnLocation);

    }

    getCurrentWeather() {
        DarkSkyApi.loadCurrent(this.state.weatherLocation)
            .then(res => {
                console.log(res);
                this.setState({
                    loaded: true,
                    degrees: {
                        farenheit: Math.round(res.temperature),
                        celcius: this.toCelcius(res.temperature)
                    },
                    icon: res.icon
                })
            });
    }

    toCelcius(far) {
        return Math.round((far - 32) / 1.8)
    }
}

export default App;
