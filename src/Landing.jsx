import React, { useState } from 'react';

import image1 from './assets/image1.jpeg';
import image2 from './assets/image2.png';
import FormComponent from './components/Form';
import FinalCard from './components/FinalCard';

const LandingPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select an Image</h1>
      <div className="flex">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={image1} // Replace with actual image paths
              alt="Image 1"
              className="cursor-pointer border-2 border-transparent hover:border-blue-500"
              onClick={() => handleImageClick('/path/to/image1.jpg')}
            />
            <img
              src={image2} // Replace with actual image paths
              alt="Image 2"
              className="cursor-pointer border-2 border-transparent hover:border-blue-500"
              onClick={() => handleImageClick('/path/to/image2.jpg')}
            />
            {/* Add more images as needed */}
          </div>
        </div>
        {selectedImage && (
          <div className="flex-1 pl-4">
            <FormComponent selectedImage={selectedImage} onFormSubmit={handleFormSubmit} />
          </div>
        )}
      </div>

      {/* FinalCard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            {formData && (
              <FinalCard
                image={selectedImage}
                teacherName={formData.teacherName}
                studentName={formData.studentName}
                studentClass={formData.studentClass}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
