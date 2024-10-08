import React from 'react';
import '../css/HomePage.css'; // Import the CSS for styling

const HomePage = () => {
    return (
        <div className="home-container">
            <section className="welcome-section">
                <h1 className="welcome-title">Welcome to <span className="highlight">AIMail</span></h1>
                <p className="welcome-description">
                    Personalized AI-Generated Newsletters, Tailored Just for You!
                </p>
                <p className="welcome-message">
                    At AImail, we’re transforming how you consume content! No more scrolling through endless articles — just select the topics and subtopics you're interested in, and let our AI do the rest. We’ll send you custom-crafted newsletters delivered right to your inbox, every day.
                </p>
                <a href="/login" className="cta-button primary-btn">Get Started with AImail</a>
            </section>

            <section className="how-it-works-section">
                <h2 className="section-title">How It Works</h2>
                <div className="steps-grid">
                    <a href="/signup"> <div className="step-card">
                        <i className="fas fa-user-plus step-icon"></i>
                        <h3>Sign Up</h3>
                        <p>Create your account in seconds.</p>
                    </div>
                    </a>
                    <div className="step-card">
                        <i className="fas fa-heart step-icon"></i>
                        <h3>Choose Your Interests</h3>
                        <p>Pick your favorite topics like Backend Development, Machine Learning, and more.</p>
                    </div>
                    <div className="step-card">
                        <i className="fas fa-envelope-open-text step-icon"></i>
                        <h3>Daily AI-Generated Content</h3>
                        <p>Receive personalized, engaging articles on the latest trends.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2 className="cta-title">Let AI simplify your reading</h2>
                <p>Get expert-level content without lifting a finger!</p>
                <a href="/signup" className="cta-button">Join Now</a>
            </section>
        </div>
    );
};

export default HomePage;
