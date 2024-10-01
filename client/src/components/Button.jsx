import React from "react";
import './Button.css';

export function Button({ text, color, onClick }) {
    return (
        <div className={`button ${color}`} onClick={onClick}>
            <p className="text">{text}</p>
        </div>
    );
}
