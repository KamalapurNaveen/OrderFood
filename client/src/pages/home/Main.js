import React, { useState, useEffect } from 'react';
import logo1 from "../assets/logo7.jpg";
import logo2 from "../assets/logo6.jpg";
import logon from "../assets/logon.png";

import logo11 from "../assets/logo11.jpeg";
import logo12 from "../assets/logo12.jpeg";
import logo13 from "../assets/logo13.jpeg";
export default function Main() {
    const [subtitle, setSubtitle] = useState('');
    const subtitleText = "Order your favorite food online!";
    const [index, setIndex] = useState(0);
    const images = [logo1, logo2, logon,logo11,logo12,logo13];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 2000); // Change image every 5 seconds
        return () => clearInterval(imageInterval);
    }, [currentImageIndex, images.length]);

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <div style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
            <img src={logon} alt="Logo" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }} width="100" />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', zIndex: 1 }}>
                <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>QR-It</h1>
                <h2>{subtitle}</h2>
            </div>
        </div>
    );
}
