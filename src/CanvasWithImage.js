import React, { useRef, useEffect } from 'react';
import '@fontsource/mansalva';

const CanvasWithImage = ({ feedbackData, imageUrl, currentPage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      canvas.width = 1071;
      canvas.height = 1515;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Display marks on top of canvas
      ctx.font = '24px Mansalva';
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillText(`Marks: ${feedbackData.Marks}/10`, 20, 40);

      // Render feedback comments and hand-drawn tick marks
      feedbackData.Feedback.forEach(({ Comment, Reference }) => {
        if (Reference.Page === currentPage) {
          const [[x1, y1], [x2, y2]] = Reference.Coordinates;

          // Tilt angle in radians (adjust as desired)
          const tiltAngle = -Math.PI / 8; // 15 degrees

          // Calculate the center of the box
          const centerX = x1 + (x2 - x1) / 2;
          const centerY = y1 + (y2 - y1) / 2;

          ctx.save(); // Save the context state

          // Apply transformations
          ctx.translate(centerX, centerY);
          ctx.rotate(tiltAngle);
          ctx.translate(-centerX, -centerY);

          // Draw box for feedback
          // ctx.beginPath();
          // ctx.rect(x1, y1, x2 - x1, y2 - y1);
          // ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // Box background color
          // ctx.fill();
          // ctx.lineWidth = 2;
          // ctx.strokeStyle = '#9a1313'; // Box border color
          // ctx.stroke();

          // Render feedback text with wrapping
          const fontSize = 20;
          ctx.font = `bold ${fontSize}px Mansalva`;
          ctx.fillStyle = 'red';
          ctx.textAlign = 'center';

          const maxTextWidth = x2 - x1; // Padding inside the box
          const lineHeight = fontSize * 1.2;
          const lines = [];
          let line = '';
          const words = Comment.split(' ');

          words.forEach((word) => {
            const testLine = line + word + ' ';
            const testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxTextWidth) {
              lines.push(line);
              line = word + ' ';
            } else {
              line = testLine;
            }
          });
          lines.push(line);

          // Center text vertically within the box
          let textY = y1 + (y2 - y1) / 2 - ((lines.length - 1) * lineHeight) / 2;
          lines.forEach((line) => {
            ctx.fillText(line.trim(), x1 + (x2 - x1) / 2, textY);
            textY += lineHeight;
          });

          ctx.restore(); // Restore the context state

          // Draw multiple hand-drawn tick marks
        }
      });

      let cur=1;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();


        // Randomize starting position near the top-right corner of the feedback box
        const randomOffsetX = 1071 - ( 300+Math.random(1,3) * 400);
        const randomOffsetY =Math.min(200 + (300*cur),1500);
        cur++;
        const tickMidX = randomOffsetX + 8;
        const tickMidY = randomOffsetY + 12;
        const tickEndX = randomOffsetX + 20;
        const tickEndY = randomOffsetY - 8;

        // Draw the first part of the tick mark
        ctx.moveTo(randomOffsetX, randomOffsetY);
        ctx.quadraticCurveTo(
          randomOffsetX -3,
          randomOffsetY + 6,
          tickMidX + Math.random() * 2 - 1,
          tickMidY + Math.random() * 2 - 1
        );

        // Draw the second part of the tick mark
        ctx.quadraticCurveTo(
          tickMidX + 8 + Math.random() * 2 - 1,
          tickMidY - 10 + Math.random() * 2 - 1,
          tickEndX + 120,
          tickEndY - 100
        );

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    };

    return () => {
      image.onload = null;
    };
  }, [imageUrl, feedbackData, currentPage]);

  return <canvas ref={canvasRef} />;
};

export default CanvasWithImage;
