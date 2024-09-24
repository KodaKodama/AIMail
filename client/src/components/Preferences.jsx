import React, { useState, useRef, useEffect } from 'react';
import '../css/Preferences.css';

const Preferences = () => {
    const topicsData = [
        {
            "topic": "frontend",
            "subtopics": [
                "React Basics",
                "CSS Grid and Flexbox",
                "Responsive Web Design",
                "JavaScript ES6"
            ]
        },
        {
            "topic": "backend",
            "subtopics": [
                "API Design",
                "Database Tuning",
                "Security Best Practices",
                "Caching Strategies"
            ]
        },
        {
            "topic": "DevOps",
            "subtopics": [
                "CI/CD Pipelines",
                "Containerization with Docker",
                "Kubernetes Basics",
                "Monitoring and Logging"
            ]
        },
        {
            "topic": "mobile development",
            "subtopics": [
                "React Native",
                "Flutter",
                "Swift for iOS",
                "Android Studio Basics"
            ]
        },
        {
            "topic": "data science",
            "subtopics": [
                "Data Cleaning",
                "Exploratory Data Analysis",
                "Machine Learning Models",
                "Data Visualization"
            ]
        }
    ];

    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedSubtopics, setSelectedSubtopics] = useState([]);
    const subtopicsRefs = useRef({});

    useEffect(() => {
        if (selectedTopic) {
            const subtopicsElement = subtopicsRefs.current[selectedTopic];
            if (subtopicsElement) {
                const height = subtopicsElement.scrollHeight;
                subtopicsElement.style.height = `${height}px`;
            }
        }
    }, [selectedTopic]);

    const toggleTopic = (topic) => {
        setSelectedTopic((prevSelectedTopic) => {
            if (prevSelectedTopic === topic) {
                return null;
            }
            return topic;
        });
    };

    const toggleSubtopic = (subtopic) => {
        setSelectedSubtopics((prevSelectedSubtopics) =>
            prevSelectedSubtopics.includes(subtopic)
                ? prevSelectedSubtopics.filter((s) => s !== subtopic)
                : [...prevSelectedSubtopics, subtopic]
        );
    };

    return (
        <div className="center-wrapper">
            <div className="preferences-container">
                <h1 className="preferences-title">Select Your Preferences</h1>
                <div className="topics-container">
                    {topicsData.map((item, index) => (
                        <div key={index} className="topic-item">
                            <h2
                                onClick={() => toggleTopic(item.topic)}
                                className={`topic-title ${selectedTopic === item.topic ? 'active' : ''}`}
                            >
                                {item.topic}
                            </h2>
                            <ul
                                ref={(el) => (subtopicsRefs.current[item.topic] = el)}
                                className={`subtopics-list ${selectedTopic === item.topic ? 'open' : ''}`}
                                style={{
                                    height: selectedTopic === item.topic ? `${subtopicsRefs.current[item.topic]?.scrollHeight}px` : '0',
                                }}
                            >
                                {item.subtopics.map((subtopic, subIndex) => (
                                    <li
                                        key={subIndex}
                                        className={`subtopic-item ${selectedSubtopics.includes(subtopic) ? 'active-subtopic' : ''}`}
                                        onClick={() => toggleSubtopic(subtopic)}
                                    >
                                        {subtopic}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Preferences;
