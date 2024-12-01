import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Update hardcoded hobbies to include feature arrays
const hardcodedHobbies = [
  {
    name: "Photography",
    description: "Capture moments and create memories.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Photographer_Photographing_Nevada_Mountains.jpg/1200px-Photographer_Photographing_Nevada_Mountains.jpg",
    features: [-0.6, -0.3, 0.4, 0.7, 0.4, 0.1, -0.1, 0.1, 0.1, -0.2],
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
    image: "https://images-ext-1.discordapp.net/external/NHyE6yjXdRBCzbf-8zZsPgydszArA7ONsbe_1hqGQgs/https/t3.ftcdn.net/jpg/10/67/97/94/240_F_1067979407_j0ZfbsMls06OJLMLbsSZ6Hft94fln7Zj.jpg?format=webp&width=413&height=271",
    features: [-0.3, 0.3, 0.4, 0.6, 0.2, 0.2, -0.1, 0.1, 0.1, 0.1],
  },
];

const HobbyRecommendations = () => {
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    const calculateDistances = () => {
      try {
        // Get user features from localStorage
        let userFeatures = JSON.parse(localStorage.getItem("userFeatures"));
        if (!Array.isArray(userFeatures) || userFeatures.length !== 10) {
          userFeatures = Array(10).fill(0.0); // Default to an empty array or default values
          localStorage.setItem("userFeatures", JSON.stringify(userFeatures)); // Save the default value to localStorage
        }

        // Function to calculate Euclidean distance
        const calculateDistance = (hobbyFeatures, userFeatures) => {
          return hobbyFeatures.reduce((sum, feature, index) => {
            let distance = Math.pow(feature - userFeatures[index], 2);

            // Check if user feature is -1 and hobby feature > 0.5
            if (userFeatures[index] === -1 && feature > 0.5) {
              distance = Infinity;
            }

            // Check if user feature is 1 and hobby feature < -0.5
            if (userFeatures[index] === 1 && feature < -0.5) {
              distance = Infinity;
            }
            return sum + distance;
          }, 0);
        };

        // Map hardcoded hobbies with calculated distances
        const hobbiesWithDistances = hardcodedHobbies.map((hobby) => {
          // Check if hobby features are valid, if not set them to [0.0, 0.0, ..., 0.0]
          const validHobbyFeatures = Array.isArray(hobby.features) && hobby.features.length === 10
            ? hobby.features
            : Array(10).fill(0.0); // Default features if invalid

          return {
            ...hobby,
            distance: parseFloat(
              calculateDistance(validHobbyFeatures, userFeatures).toFixed(2)
            ),
          };
        });

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

  const handleHobbyClick = (hobby) => {
    console.log(`Clicked hobby: ${hobby.name}, Alignment: ${hobby.distance}`);
  };

  return (
    <section className="hobby-recommendations">
      <h2>Polecane hobby:</h2>
      <div className="hobbies-container">
        {hobbies.map((hobby, index) => (
          <Link
            to={`/hobby/${encodeURIComponent(hobby.name)}`}
            key={index}
            onClick={() => handleHobbyClick(hobby)}
          >
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
