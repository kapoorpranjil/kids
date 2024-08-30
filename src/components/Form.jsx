import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Form = ({ image, onSubmit }) => {
  const [teacherName, setTeacherName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [charCount, setCharCount] = useState({ teacherName: 0, studentName: 0, studentClass: 0 });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all fields are filled
    if (teacherName && studentName && studentClass) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [teacherName, studentName, studentClass]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(teacherName, studentName, studentClass);
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
        <motion.input
          type="text"
          placeholder="Teacher Name"
          name="teacherName"
          value={teacherName}
          onChange={(e) => handleInputChange(e, setTeacherName)}
          className="p-2 border border-gray-300 rounded-md"
          whileFocus={{ scale: 1.05 }}
          required
        />
       
        <motion.input
          type="text"
          placeholder="Student Name"
          name="studentName"
          value={studentName}
          onChange={(e) => handleInputChange(e, setStudentName)}
          className="p-2 border border-gray-300 rounded-md"
          whileFocus={{ scale: 1.05 }}
          required
        />
        
        <motion.input
          type="text"
          placeholder="Class"
          name="studentClass"
          value={studentClass}
          onChange={(e) => handleInputChange(e, setStudentClass)}
          className="p-2 border border-gray-300 rounded-md"
          whileFocus={{ scale: 1.05 }}
          required
        />
      
      <button
  type="submit"
  className={`p-2 text-white rounded-md ${isFormValid ? 'bg-black' : 'bg-gray-300 cursor-not-allowed'}`}
  disabled={!isFormValid}
>
  Let's build your card
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
