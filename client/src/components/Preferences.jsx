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
            const response = await axios.get(`${import.meta.env.API_URL}/api/topics`); 
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

     // Function to handle form submission
     const handleSubmit = async () => {
        try {
           
            const preferences = [];
    
            // Add the main topic
            if (selectedTopic) {
                preferences.push(selectedTopic); 
            }
    
            // Add each selected subtopic separately
            selectedSubtopics.forEach(subtopic => {
                preferences.push(subtopic); 
            });
    
            console.log(preferences);
    
            await axios.post(`${import.meta.env.API_URL}/api/preferences`, 
                { preferences }, 
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            alert('Preferences saved successfully!');
        } catch (error) {
            console.error("Error saving preferences:", error);
        }
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
                {/* Submit Button */}
                <button onClick={handleSubmit} className="submit-btn">Submit Preferences</button>
            </div>
        </div>
    );
};

export default Preferences;
