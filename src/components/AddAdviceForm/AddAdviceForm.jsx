import React, { useState } from 'react';
import './AddAdviceForm.css'

const AddAdviceForm = ({ onAddAdvice }) => {
  const [adviceId, setAdviceId] = useState('');
  const [adviceContent, setAdviceContent] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (adviceId < 200) {
      errors.adviceId = 'ID should be at least 200';
    }
    if (adviceContent.length < 3) {
      errors.adviceContent = 'Content should have at least 3 characters';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      onAddAdvice({ id: adviceId, content: adviceContent });
      setAdviceId('');
      setAdviceContent('');
    } else {
      setErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'absolute', top: '0px', left: '0px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="adviceId">Advice ID:</label>
        <input
          id="adviceId"
          type="number"
          value={adviceId}
          onChange={(e) => setAdviceId(e.target.value)}
        />
        {errors.adviceId && <p className="error">{errors.adviceId}</p>}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="adviceContent">Advice Content:</label>
        <input
          id="adviceContent"
          type="text"
          value={adviceContent}
          onChange={(e) => setAdviceContent(e.target.value)}
        />
        {errors.adviceContent && <p className="error">{errors.adviceContent}</p>}
      </div>
      <button type="submit" >Add Advice</button>
    </form>
  );
};

export default AddAdviceForm;