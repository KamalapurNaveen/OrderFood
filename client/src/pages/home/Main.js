import React, { useState, useEffect } from 'react';
import './OrderFoodHomePage.css';
import logon from "../assets/logon.png";

export default function Main() {
    const [subtitle, setSubtitle] = useState('');
    const subtitleText = "Order your favorite food online!";
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < subtitleText.length) {
                setSubtitle(prevSubtitle => prevSubtitle + subtitleText[index]);
                setIndex(prevIndex => prevIndex + 1);
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="container-fluid homepage-container">
            <div className="row">
                <div className="col">
                    <div className="background-image"></div>
                    <div className="overlay"></div>
                    <img src={logon} alt="Logo" className="logo" width="100" />
                    <div className="content">
                        <h1 className="title" >QR-It</h1>
                        <h2 className="subtitle">{subtitle}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
