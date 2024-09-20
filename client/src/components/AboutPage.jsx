import React from 'react';
import '../css/AboutPage.css';
const AboutPage = () => {
    const teamMembers = [
        {
            name: 'Ivan Dachev',
            img: '/img/dachev_photo.jpeg',
            social: {
                instagram: 'https://www.instagram.com/dacheww/?hl=en',
                linkedin: 'www.linkedin.com/in/ivan-d-a64616270',
                github: 'https://github.com/Dachev1'
            }
        },
        {
            name: 'My friend',
            img: 'https://via.placeholder.com/150',
            social: {
                instagram: 'https://instagram.com',
                linkedin: 'https://linkedin.com',
                github: 'https://github.com'
            }
        }
    ];

    return (
        <div className="about-page">
            <h2 className="team-heading">Meet Our Team</h2>
            <div className="team-container">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-card">
                        <img src={member.img} alt={`${member.name}`} className="team-photo" />
                        <h3 className="team-name">{member.name}</h3>
                        <div className="team-social">
                            <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutPage;
