import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Form = ({ image, onSubmit }) => {
  const [teacherName, setTeacherName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
  const [charCount, setCharCount] = useState({
    teacherName: 0,
    studentName: 0,
    studentClass: 0,
    phoneNumber: 0, // Track character count for phone number
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  useEffect(() => {
    // Check if all fields are filled
    if (teacherName && studentName && studentClass && phoneNumber) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [teacherName, studentName, studentClass, phoneNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      setIsLoading(true); // Start loading
      try {
        // Send data to the API
        await axios.post('https://kids-backend.onrender.com/api/form/submit', {
          teacherName,
          studentName,
          studentClass,
          phoneNumber,
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
    onSubmit(teacherName, studentName, studentClass, phoneNumber);
  };
  
  const handleInputChange = (e, setField) => {
    const { value, name } = e.target;
    setField(value);
    setCharCount((prev) => ({ ...prev, [name]: value.length }));
  };

  const confettiAnimation = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Teacher Name"
          name="teacherName"
          value={teacherName}
          onChange={(e) => handleInputChange(e, setTeacherName)}
          className="p-2 border border-gray-300 rounded-md"
          required
        />
       
        <input
          type="text"
          placeholder="Student Name"
          name="studentName"
          value={studentName}
          onChange={(e) => handleInputChange(e, setStudentName)}
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        
        <input
          type="text"
          placeholder="Class"
          name="studentClass"
          value={studentClass}
          onChange={(e) => handleInputChange(e, setStudentClass)}
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        
        <input
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => handleInputChange(e, setPhoneNumber)}
          className="p-2 border border-gray-300 rounded-md"
          required
        />

        <button
          type="submit"
          className={`p-2 text-white rounded-md ${isFormValid ? 'bg-black' : 'bg-gray-300 cursor-not-allowed'}`}
          disabled={!isFormValid || isLoading} // Disable if loading
        >
          {isLoading ? (
            <div className="loader">Submitting...</div> // Spinner when loading
          ) : (
            "Let's build your card"
          )}
        </button>
      </form>
      <motion.div
        className="confetti"
        variants={confettiAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        🎉 Fill all fields.
      </motion.div>
    </motion.div>
  );
};

export default Form;
