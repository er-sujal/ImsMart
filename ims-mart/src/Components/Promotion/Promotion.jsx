import React, { useEffect, useState } from "react";
import './Promotion.css';
import countdown from "../Timer/countdown";
import hot from "../Assets/hotdeals-removebg-preview.png"


const Promotion = () => {
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        const timedate = new Date('2024-04-07T00:00:00');
        const timer = setInterval(() => {
            const remaining = countdown(timedate);
            setTimeRemaining(remaining);
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="Promotion">
            <div className="SLeft">
                <h2>Limited Time deals</h2>
                <p div="Dis">Grab the deals before it sold out.
                    <br />Limited stock only.
                    <br />T&C applied.</p>
                <h1 id="time">{timeRemaining}</h1>
            <div className="button">
                <div>Grab The Offer</div>
            </div>
            </div>
            <div className="SRight">
                 <img src={hot} alt="HOT" width={650} /> 
            </div>
        </div>
    );
};

export default Promotion;
