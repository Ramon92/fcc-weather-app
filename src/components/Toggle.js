import React from 'react';

function Toggle(props) {
    return (
        <button onClick={props.toggleDegrees}>switch temp</button>
    );
}

export default Toggle;