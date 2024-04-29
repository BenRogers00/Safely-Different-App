// This file contains the TemperatureConverter component that will convert the temperature from Celsius to Fahrenheit.
import React, { useState } from 'react';

function TemperatureConverter() {
    const [celsius, setCelsius] = useState(0);
    const fahrenheit = (celsius * 9/5) + 32;

    return (
        <div>
            <CelsiusInput value={celsius} onChange={e => setCelsius(parseFloat(e.target.value))} />
            <FahrenheitInput value={fahrenheit} />
        </div>
    );
}

function CelsiusInput({ value, onChange }) {
    return (
        <div>
            <label>Celsius:</label>
            <input type="number" value={value} onChange={onChange} />
        </div>
    );
}

function FahrenheitInput({ value }) {
    return (
        <div>
            <label>Fahrenheit:</label>
            <input type="number" value={value} disabled />
        </div>
    );
}

export default TemperatureConverter;
