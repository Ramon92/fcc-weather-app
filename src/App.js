import React, {Component} from 'react';
import DarkSkyApi from 'dark-sky-api';

import './App.css';
import Weather from './components/Weather';
import 'whatwg-fetch';

DarkSkyApi.apiKey = 'ecce78e27f7acdbd7faa415857ef2ac6';
const gMapsApi = 'AIzaSyCxLS3Gj5xp3SFAZ2f6rKkL1qaBFVioKs8';

export default class App extends Component {
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

        this.toggleDegrees = this.toggleDegrees.bind(this);
    }

    componentDidMount() {
        this.getLocation();
    }

    render() {
        return (
            <div className="App">
                <h2 className="App__title">FCC Weather App By Ramon</h2>
                <Weather
                    toggleDegrees={this.toggleDegrees}
                    degreeType={this.state.degreeType}
                    loaded={this.state.loaded}
                    degrees={this.state.degrees}
                    icon={this.state.icon}
                    city={this.state.city}/>
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
                this.setCity();
            });
    }

    toCelcius(far) {
        return Math.round((far - 32) / 1.8)
    }

    toggleDegrees() {
        let type = this.state.degreeType === 'celcius' ? 'farenheit' : 'celcius';
        this.setState({
            degreeType: type
        });
    }

    setCity() {
        const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.weatherLocation.latitude},${this.state.weatherLocation.longitude}&key=${gMapsApi}`;

        let cityState = (json, city) => {
            city = json
                .results
                .filter((res) => {
                    return res.types
                        .includes('sublocality_level_1')
                })[0]['formatted_address'];
            console.log(city);
            this.setState({
                city: city
            })
        };

        fetch(api)
            .then((res) => res.json())
            .then((json) => {
                console.log('parsed json', json);
                cityState(json);
            })

    }
}

