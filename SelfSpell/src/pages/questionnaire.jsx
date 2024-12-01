import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Questionnaire.css";

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
    // Pobierz userFeatures z localStorage, zainicjuj jeśli konieczne
    let userFeatures = JSON.parse(localStorage.getItem("userFeatures"));
    if (!Array.isArray(userFeatures) || userFeatures.length !== 10) {
      userFeatures = Array(10).fill(0.0);
    }

    // Zaktualizuj pierwsze 5 cech na podstawie odpowiedzi
    const newFeatures = userFeatures.map((feature, index) => {
      if (index < 5) {
        let newFeature = Object.values(answers)[index];
        return Math.max(-1, Math.min(1, newFeature)); // Ogranicz wartości do [-1, 1]
      }
      return feature;
    });

    localStorage.setItem("userFeatures", JSON.stringify(newFeatures));
    navigate("/hobbyrecomendations");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-state-blue-gradient">
      <div className="bg-thistie rounded-lg shadow-lg p-8 max-w-lg w-full box">
        <h1 className="text-3xl font-bold text-center text-palatinete mb-6">
          Podstawowe pytania
        </h1>
        <p className="firstline text-xl">czy lubisz hobby, które...</p>
        <div className="space-y-4">
          <div className="question">
            <label className="block text-state-blue font-bold mb-2">
              angażuje innych ludzi?
            </label>
            <input
              type="range"
              name="people"
              min="-1"
              max="1"
              step="0.5"
              value={answers.people}
              onChange={handleSliderChange}
              className="w-full accent-state-blue"
            />
          </div>
          <div className="question">
            <label className="block text-state-blue font-bold mb-2">
              wymaga umiejętności fizycznych?
            </label>
            <input
              type="range"
              name="physical"
              min="-1"
              max="1"
              step="0.5"
              value={answers.physical}
              onChange={handleSliderChange}
              className="w-full accent-state-blue"
            />
          </div>
          <div className="question">
            <label className="block text-state-blue font-bold mb-2">
              wymaga myślenia?
            </label>
            <input
              type="range"
              name="thinking"
              min="-1"
              max="1"
              step="0.5"
              value={answers.thinking}
              onChange={handleSliderChange}
              className="w-full accent-state-blue"
            />
          </div>
          <div className="question">
            <label className="block text-state-blue font-bold mb-2">
              wymaga dużo wolnego czasu?
            </label>
            <input
              type="range"
              name="time"
              min="-1"
              max="1"
              step="0.5"
              value={answers.time}
              onChange={handleSliderChange}
              className="w-full accent-state-blue"
            />
          </div>
          <div className="question">
            <label className="block text-state-blue font-bold mb-2">
              wymaga wydawania pieniędzy?
            </label>
            <input
              type="range"
              name="money"
              min="-1"
              max="1"
              step="0.5"
              value={answers.money}
              onChange={handleSliderChange}
              className="w-full accent-state-blue"
            />
          </div>
        </div>
        <button
          className="mt-6 w-full bg-palatinete text-thistie py-2 px-4 rounded-lg shadow-md hover:bg-african-violet transition"
          onClick={handleSubmit}
        >
          Wyślij
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
