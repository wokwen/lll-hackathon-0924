import React from "react";
import { useState, useEffect } from "react";

function Message() {
    const [message, setMessage] = useState('');

    return (
        <p>
            {message}
        </p>
    );
}

export default Message;