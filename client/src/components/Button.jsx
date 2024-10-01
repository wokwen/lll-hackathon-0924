import React from "react";
import './Button.css';

export function Button({ text, color }) {
    return (
        <div className={`button ${color}`}>
            <p className="text">{text}</p>
        </div>
    );
}
