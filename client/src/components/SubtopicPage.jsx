import React from 'react';
import { useParams } from 'react-router-dom';

const SubtopicPage = () => {
  const { subtopic } = useParams();

  return (
    <div>
      <h1>{subtopic.replace('-', ' ')}</h1>
      <p>Details about {subtopic.replace('-', ' ')}...</p>
    </div>
  );
};

export default SubtopicPage;
