import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Update hardcoded hobbies to include feature arrays
const hardcodedHobbies = [
  {
    name: "Photography",
    description: "Capture moments and create memories.",
    image: "https://example.com/photography.jpg",
    features: [0.5, 0.8, -0.2, 0.4, -0.1, 0.7, -0.3, 0.6, 0.1, -0.2],
  },
  {
    name: "Cooking 2: Electric Boogaloo",
    description: "Create delicious meals and discover new recipes.",
    image: "https://example.com/cooking2.jpg",
    features: [0, 0.4, 0.3, 0, -0.5, -0.7, 0.6, 0.1, -0.2, 0.3],
  },
  {
    name: "Cooking",
    description: "Create delicious meals and discover new recipes.",
    image: "https://example.com/cooking.jpg",
    features: [0.1, 0.3, -0.4, 0.7, 0.5, 0.2, -0.6, 0.4, 0.2, 0.1],
  },
];

const HobbyRecommendations = () => {
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    const calculateDistances = () => {
      try {
        // Get user features from localStorage
        const userFeatures = JSON.parse(localStorage.getItem("userFeatures"));
        if (!userFeatures || userFeatures.length !== 10) {
          throw new Error("Invalid user features in localStorage");
        }

        // Function to calculate Euclidean distance
        const calculateDistance = (hobbyFeatures, userFeatures) => {
          return Math.sqrt(
            hobbyFeatures.reduce(
              (sum, feature, index) => sum + Math.pow(feature - userFeatures[index], 2),
              0
            )
          );
        };

        // Map hardcoded hobbies with calculated distances
        const hobbiesWithDistances = hardcodedHobbies.map((hobby) => ({
          ...hobby,
          distance: parseFloat(
            calculateDistance(hobby.features, userFeatures).toFixed(2)
          ),
        }));

        // Sort hobbies by distance (ascending)
        const sortedHobbies = hobbiesWithDistances.sort(
          (a, b) => a.distance - b.distance
        );

        setHobbies(sortedHobbies);
      } catch (error) {
        console.error("Error calculating distances:", error);
        setHobbies(
          hardcodedHobbies.map((hobby) => ({
            ...hobby,
            distance: Infinity, // Default large distance for fallback
          }))
        );
      }
    };

    calculateDistances();
  }, []); // Empty dependency array as it only depends on localStorage

  return (
    <section className="hobby-recommendations">
      <h2>Polecane hobby:</h2>
      <div className="hobbies-container">
        {hobbies.map((hobby, index) => (
          <Link to={`/hobby/${encodeURIComponent(hobby.name)}`} key={index}>
            <div className="hobby-block">
              <img src={hobby.image} alt={hobby.name} />
              <h3>{hobby.name}</h3>
              <p>{hobby.description}</p>
              <p>
                <strong>Distance:</strong> {hobby.distance}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HobbyRecommendations;
