import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';

const FinalCard = ({ image, teacherName, studentName, studentClass, onClose }) => {
  const [showSparkles, setShowSparkles] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
  <div id="final-card" className="relative inline-block p-4 border-4 border-white rounded-md bg-white">
  {/* Text Container */}
  <div className="mb-4 flex items-center justify-between p-2 bg-white rounded-md">
    <div>
      <h2 className="text-xl font-bold">To {teacherName}</h2>
      <p>From {studentName}</p>
      <p>Class: {studentClass}</p>
    </div>

  </div>

  {/* Image Container */}
  <div className="relative inline-block">
    <img src={image} alt="Final Card" className="w-full h-auto rounded-md" />
  </div>
</div>


<div className="flex justify-center mt-4">
  <button
    onClick={handleDownload}
    className="p-2 bg-black text-white rounded-md relative overflow-hidden"
  >
    Download Card
  </button>
</div>

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