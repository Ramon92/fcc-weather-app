import React from 'react';

function Toggle(props) {
    return (
        <div>
            <button onClick={() => props.toggleDegrees()}></button>
        </div>
    );
}

export default Toggle;