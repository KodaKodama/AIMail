import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../css/Preferences.css';

const Preferences = () => {
    const [topicsData, setTopicsData] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedSubtopics, setSelectedSubtopics] = useState([]);
    const subtopicsRefs = useRef({});

    useEffect(() => {
        const fetchTopics = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/topics'); 
            setTopicsData(response.data); 
          } catch (error) {
            console.error('Error fetching topics:', error);
          }
        };
    
        fetchTopics();
      }, []);
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
