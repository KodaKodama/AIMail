import React from 'react';
import '../css/HomePage.css'; // Import the CSS for styling

const HomePage = () => {
    return (
        <div className="services-container">
            <h1 className="services-title">Our Services</h1>
            <p className="services-description">
                Explore our wide range of AI-powered services tailored just for you.
            </p>
            <div className="services-grid">
                <a href="/service1" className="service-card">
                    <i className="fas fa-cog"></i>
                    <h3>AI Automation</h3>
                    <p>Streamline your processes with our AI-driven solutions.</p>
                </a>
                <a href="/service2" className="service-card">
                    <i className="fas fa-user"></i>
                    <h3>Personalized Insights</h3>
                    <p>Receive insights tailored to your personal needs.</p>
                </a>
                <a href="/service3" className="service-card">
                    <i className="fas fa-map-marker-alt"></i>
                    <h3>Location Services</h3>
                    <p>Discover AI-powered location-based services.</p>
                </a>
                <a href="/service4" className="service-card">
                    <i className="fas fa-globe"></i>
                    <h3>Global Reach</h3>
                    <p>Our AI solutions span across borders to meet your needs.</p>
                </a>
                <a href="/service5" className="service-card">
                    <i className="fas fa-home"></i>
                    <h3>Home Automation</h3>
                    <p>Integrate AI to automate your home systems.</p>
                </a>
                <a href="/service6" className="service-card">
                    <i className="fas fa-lightbulb"></i>
                    <h3>Innovation Hub</h3>
                    <p>Explore the latest innovations powered by AI.</p>
                </a>
            </div>
        </div>
    );
};

export default HomePage;
