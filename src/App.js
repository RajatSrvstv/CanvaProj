import React, { useState, useEffect } from 'react';
import CanvasWithImage from './CanvasWithImage';
import { loadPdfImages } from './pdfUtils';

const feedbackData = {
  "Marks": 5,
  "Feedback": [
    {
      "Category": "Content Depth",
      "Comment": "Introduction lacks depth. Briefly explain why the Objective Resolution was significant to India’s constitutional framework.",
      "Reference": {
        "Page": 1,
        "Coordinates": [
          [50, 300],
          [318,400]
        ]
      }
    },
    {
      "Category": "Conclusion",
      "Comment": "The concluding sentence is vague; it could be sharper, focusing on specific reforms like improving the impartiality of the Speaker.",
      "Reference": {
        "Page": 1,
        "Coordinates": [
          [50, 500],
          [318, 600]
        ]
      }
    },
    {
      "Category": "Innovation",
      "Comment": "Could have benefited from data/statistics or recent examples of defection cases to strengthen the argument.",
      "Reference": {
        "Page": 1,
        "Coordinates": [
          [753, 750],
          [1021, 850]
        ]
      }
    },
    {
      "Category": "Language",
      "Comment": "Mostly clear, but some minor grammatical errors (e.g., 'topping of' should be 'toppling of') affect readability.",
      "Reference": {
        "Page": 2,
        "Coordinates": [
          [753, 1100],
          [1021, 1200]
        ]
      }
    },
    {
      "Category": "Language",
      "Comment": "Mostly clear, but some minor grammatical errors (e.g., 'topping of' should be 'toppling of') affect readability.",
      "Reference": {
        "Page": 2,
        "Coordinates": [
          [50, 1300],
          [318, 1400]
        ]
      }
    }
  ]
};

const App = () => {
  const [pageImages, setPageImages] = useState([]);

  useEffect(() => {
    const loadPdfPages = async () => {
      try {
        const images = await loadPdfImages(`${process.env.PUBLIC_URL}/image.pdf`);
        setPageImages(images);
      } catch (error) {
        console.error("Failed to load PDF images:", error);
      }
    };

    loadPdfPages();
  }, []);

  return (
    <div>
      {/* <h1>Feedback Canvas</h1> */}
      {pageImages.length > 0 ? (
        pageImages.map((imageUrl, index) => (
          <CanvasWithImage
            key={index}
            feedbackData={feedbackData}
            imageUrl={imageUrl}
            currentPage={index + 1} // Pass the page number
          />
        ))
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default App;
