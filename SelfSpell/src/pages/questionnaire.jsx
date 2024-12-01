import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const [answers, setAnswers] = useState({
    people: 0,
    physical: 0,
    thinking: 0,
    time: 0,
    money: 0,
  });
  const navigate = useNavigate();

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = () => {
    // Get userFeatures from localStorage, if available
    const userFeatures = JSON.parse(localStorage.getItem("userFeatures")) || Array(10).fill(0.0);
    console.log("User features:", userFeatures);
  
    // Define constant feature weights (similar to constFeatures in the bottom code)
    // const constFeatures = [-1.2, 1.5, -1.1, 1.3, 1.0, 1.6, -1.7, 1.8, 2.0, 1.4];
  
    // Calculate new features based on the user's answers and update the first 5 features
    const newFeatures = userFeatures.map((feature, index) => {
      if (index < 5) {
        // Update the first 5 features based on the answers
        let newFeature = Object.values(answers)[index];
        newFeature = Math.max(Math.min(newFeature, 1), -1); // Keep feature in the range [-1, 1]
        return newFeature;
      }
      return feature; // Keep the rest unchanged
    });
  
  
    console.log("Updated user features:", newFeatures);
  
    // Save the updated userFeatures back to localStorage
    localStorage.setItem("userFeatures", JSON.stringify(newFeatures));
  
    // Navigate to the next page
    navigate("/hobbyrecomendations");
  };
  


  return (
    <div className="questionnaire">
      <h1>Hobby Questionnaire</h1>
      <div className="question">
        <label>Do you like hobbies that involve other people?</label>
        <input
          type="range"
          name="people"
          min="-1"
          max="1"
          step="0.5"
          value={answers.people}
          onChange={handleSliderChange}
        />
      </div>
      <div className="question">
        <label>Do you like hobbies that require physical skill?</label>
        <input
          type="range"
          name="physical"
          min="-1"
          max="1"
          step="0.5"
          value={answers.physical}
          onChange={handleSliderChange}
        />
      </div>
      <div className="question">
        <label>Do you like hobbies that require thinking?</label>
        <input
          type="range"
          name="thinking"
          min="-1"
          max="1"
          step="0.5"
          value={answers.thinking}
          onChange={handleSliderChange}
        />
      </div>
      <div className="question">
        <label>Do you like hobbies that require a lot of free time?</label>
        <input
          type="range"
          name="time"
          min="-1"
          max="1"
          step="0.5"
          value={answers.time}
          onChange={handleSliderChange}
        />
      </div>
      <div className="question">
        <label>Do you like hobbies that require spending money?</label>
        <input
          type="range"
          name="money"
          min="-1"
          max="1"
          step="0.5"
          value={answers.money}
          onChange={handleSliderChange}
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Questionnaire;
