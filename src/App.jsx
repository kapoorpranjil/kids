import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageCard from './components/ImageCard';
import Form from './components/Form';
import FinalCard from './components/FinalCard';
import Modal from './components/Modal';
import image1 from './assets/image1.jpeg';
import image3 from './assets/image3.jpeg';
import image4 from './assets/image4.jpeg';
import image2 from './assets/image2.png';
import image5 from './assets/image5.png';
import image6 from './assets/image6.png';
import image7 from './assets/image7.png';
import image8 from './assets/image8.png';

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
];

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [finalData, setFinalData] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isFinalCardModalOpen, setIsFinalCardModalOpen] = useState(false);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setFinalData(null);
    setIsFormModalOpen(true);
    setIsFinalCardModalOpen(false); // Ensure FinalCard modal is closed
  };

  const handleFormSubmit = (teacherName, studentName, studentClass) => {
    setFinalData({ teacherName, studentName, studentClass });
    setIsFormModalOpen(false); // Close form modal
    setIsFinalCardModalOpen(true); // Open final card modal
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleCloseFinalCardModal = () => {
    setIsFinalCardModalOpen(false);
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <motion.h1
        className="text-xl md:text-3xl font-extrabold text-center mb-4 md:mb-6 text-blue-600"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
      >
        🎉 Happy Teacher's Day! 🎉
      </motion.h1>
      <motion.h2
        className="text-lg md:text-2xl font-semibold text-center mb-4 text-blue-400"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
      >
        Create a Special Surprise Card for Your Teacher!
      </motion.h2>
      <motion.h3
        className="text-md md:text-lg font-medium text-center mb-6 text-green-500"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.5 }}
      >
        Choose Your Favorite Card and Show Your Appreciation!
      </motion.h3>
      <div className="relative">
        {/* Container for mobile view */}
        <div className="md:hidden overflow-x-auto whitespace-nowrap pb-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`inline-block cursor-pointer mx-2 ${
                image === selectedImage ? 'border-4 border-blue-500' : ''
              }`}
              onClick={() => handleImageSelect(image)}
              whileHover={{ scale: 1.1 }} // Scale up slightly on hover
              whileTap={{ scale: 0.9 }} // Scale down slightly on tap
            >
              <img src={image} alt={`Card ${index}`} className="w-screen h-auto" />
            </motion.div>
          ))}
        </div>

        {/* Container for desktop view */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }} // Scale up slightly on hover
              whileTap={{ scale: 0.9 }} // Scale down slightly on tap
            >
              <ImageCard image={image} onSelect={handleImageSelect} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add some additional content or padding for mobile view */}
      <div className="md:hidden mt-6 text-center">
        <p className="text-gray-500">Select a card to get started!</p>
        <p className="text-gray-500">Then you can create a special card for your teacher.</p>
      </div>

      <Modal isOpen={isFormModalOpen} onClose={handleCloseFormModal}>
        {selectedImage && !finalData && (
          <Form image={selectedImage} onSubmit={handleFormSubmit} />
        )}
      </Modal>

      <Modal isOpen={isFinalCardModalOpen} onClose={handleCloseFinalCardModal}>
        {finalData && (
          <FinalCard 
            image={selectedImage} 
            teacherName={finalData.teacherName} 
            studentName={finalData.studentName} 
            studentClass={finalData.studentClass} 
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
