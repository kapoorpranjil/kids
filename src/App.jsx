import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageCard from './components/ImageCard';
import Form from './components/Form';
import FinalCard from './components/FinalCard';
import Modal from './components/Modal';
import image1 from './assets/image1.png';
import image3 from './assets/image3.png';
import image4 from './assets/image4.png';
import image2 from './assets/image2.png';
import image5 from './assets/image5.png';
import image6 from './assets/image6.png';
import image7 from './assets/image7.png';
import image8 from './assets/image8.png';
import image9 from './assets/image9.png';
import image10 from './assets/image10.png';
import image11 from './assets/image11.png';

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
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

  const shakeTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'loop',
    ease: 'easeInOut',
  };
  
  const shakeVariants = {
    shake: {
       // Diagonal shake along the x-axis
      y: [0, 4, -4, 2, -2, 0], // Diagonal shake along the y-axis
    },
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto text-center mt-8">
  <motion.h1
  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-black-600"
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
>
  We understand your bond with your teacher.
</motion.h1>

 <motion.h3
  className="text-sm sm:text-md md:text-lg lg:text-xl font-medium mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-slate-500 px-4 sm:px-6 md:px-8 lg:px-10"
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
>
  Thank them for their selflessness. Wish them a very Happy Teachers' Day.
</motion.h3>


      <motion.h3
  className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-3 sm:mb-5 md:mb-6 lg:mb-8 text-slate-500 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
  initial={{ x: 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 120, delay: 0.5 }}
>
  Choose any customizable poster you like and share it with your teachers.
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
        <p className="text-gray-500">Swipe & Select by tapping on a card to get started!</p>
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
            onClose={handleCloseFinalCardModal} 
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
