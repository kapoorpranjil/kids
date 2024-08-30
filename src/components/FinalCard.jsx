import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';

const FinalCard = ({ image, teacherName, studentName, studentClass, onClose }) => {
  const [showSparkles, setShowSparkles] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const emojis = ['✏️', '❤️', '🐱', '🐶', '🐾'];
  
  // Select a random emoji
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  const handleDownload = () => {
    setShowSparkles(true);
    setShowPopup(true);
    setTimeout(() => setShowSparkles(false), 1000); // Hide sparkles after 1 second
    setTimeout(() => setShowPopup(false), 2000); // Hide pop-up after 2 seconds

    html2canvas(document.querySelector('#final-card')).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'teachers-day-card.png';
      link.href = canvas.toDataURL();
      link.click();

      onClose(); 

    });

  };

  return (
    <div className="text-left relative">
      <div id="final-card" className="relative inline-block">
      {/* Text Container */}
  <div className="mb-4 flex items-center justify-between p-2 bg-white rounded-md">
    <div>
      <h2 className="text-xl font-bold">To {teacherName}</h2>
      <p>From {studentName}</p>
      <p>Class: {studentClass}</p>
    </div>
    <span className="text-2xl ml-2">{randomEmoji}</span>
  </div>

  {/* Image Container */}
  <div className="relative inline-block p-2 bg-white rounded-md">
    <img src={image} alt="Final Card" className="w-full h-auto rounded-md" />
  </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 p-2 bg-green-500 text-white rounded-md relative overflow-hidden"
      >
        Download Card

        {/* Sparkle Effect */}
        <AnimatePresence>
          {showSparkles && (
            <motion.div
              className="absolute inset-0 flex justify-center items-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-4 h-4 bg-yellow-400 rounded-full"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0.5,
                      opacity: 0,
                    }}
                    animate={{
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50,
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Pop-up Message */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="absolute top-0 left-0 right-0 mt-4 p-2 bg-blue-500 text-white rounded-md text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Go it's time to wish 🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalCard;
//og