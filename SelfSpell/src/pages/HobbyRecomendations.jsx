import React, { useEffect, useState } from "react";

// Hardcoded fallback hobbies
const hardcodedHobbies = [
  {
    name: "Photography",
    description: "Capture moments and create memories.",
    image: "https://example.com/photography.jpg", // Replace with real image URL
  },
  {
    name: "Cooking",
    description: "Create delicious meals and discover new recipes.",
    image: "https://example.com/cooking.jpg", // Replace with real image URL
  },
];

const HobbyRecommendations = () => {
  const [hobbies, setHobbies] = useState([]);

  // Fetch hobbies from the API or fallback to hardcoded
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await fetch("/api/hobbies"); // Replace with your actual API endpoint
        const data = await response.json();
        setHobbies(data.length > 0 ? data : hardcodedHobbies);
      } catch (error) {
        console.error("Error fetching hobbies:", error);
        setHobbies(hardcodedHobbies); // Fallback in case of error
      }
    };

    fetchHobbies();
  }, []);

  return (
    <section className="hobby-recommendations">
      <h2>Hobby Recommendations</h2>
      <div className="hobbies-container">
        {hobbies.map((hobby, index) => (
          <div key={index} className="hobby-block">
            <img src={hobby.image} alt={hobby.name} />
            <h3>{hobby.name}</h3>
            <p>{hobby.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HobbyRecommendations;
