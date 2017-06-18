import React from 'react';
import Toggle from '../components/Toggle';
import WeatherIcons from 'react-weathericons';
import '../weather-icons-master/css/weather-icons.css';

function Weather(props) {
    let weatherIcon,
        temp,
        degree,
        degreeType = props.degreeType,
        icon = props.icon;

    weatherIcon = `forecast-io-${icon}`;

    temp = degreeType === 'celcius' ? `${props.degrees.celcius}` : `${props.degrees.farenheit}`;

    degree = degreeType === 'celcius' ? 'C' : 'F;';

    if (props.loaded) {
        return (
            <div>
                <WeatherIcons name={weatherIcon} size="2x"/>
                <p>{temp} &deg;{degree}</p>
                <Toggle toggleDegrees={props.toggleDegrees}/>
            </div>

        )
    } else {
        return null
    }
}

export default Weather;