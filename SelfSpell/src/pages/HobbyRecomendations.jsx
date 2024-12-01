import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const hardcodedHobbies = [
  {
    name: "Photography",
    description: "Capture moments and create memories.",
    image: "https://example.com/photography.jpg",
    distance: 2,
  },
  {
    name: "Cooking 2: Electric Boogaloo",
    description: "Create delicious meals and discover new recipes.",
    image: "https://example.com/cooking.jpg",
    distance: 3,
  },
  {
    name: "Cooking",
    description: "Create delicious meals and discover new recipes.",
    image: "https://example.com/cooking.jpg",
    distance: 1,
  },
];

const HobbyRecommendations = ({ userFeatures, userAge }) => {
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    const fetchDistances = async () => {
      try {
                /*
        const response = await fetch("/calculate_distances", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            features: userFeatures,
            age: userAge,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to calculate distances from the API");
        }

        const data = await response.json();

        // Debug: log the API data to check distances
        console.log("API Hobby Data:", data);

        // Map API data and ensure the distance is correctly formatted as a number
        const apiHobbies = data
          .filter((hobby) => typeof hobby.distance === "number") // Exclude invalid distances
          .map((hobby) => ({
            name: hobby.hobby,
            description: hobby.hobby,
            image: hobby.url || "https://example.com/placeholder.jpg", // Fallback image
            distance: parseFloat(hobby.distance.toFixed(2)), // Ensure it's a float for proper sorting
          }));
*/
        const allHobbies = [
          ...hardcodedHobbies.map((hobby) => ({
            ...hobby,
            distance: parseFloat(hobby.distance),
          })),
        ];
        const sortedHobbies = allHobbies.sort((a, b) => a.distance - b.distance);
        setHobbies(sortedHobbies);
      } catch (error) {
        console.error("Error fetching distances:", error);
        setHobbies(hardcodedHobbies);
      }
    };

    fetchDistances();
  }, [userFeatures, userAge]);

  return (
    <section className="hobby-recommendations">
      <h2>Polecane hobby:</h2>
      <div className="hobbies-container">
        {hobbies.map((hobby, index) => (
          <Link to={`/hobby/${encodeURIComponent(hobby.name)}`}>
          <div key={index} className="hobby-block">
            <img src={hobby.image} alt={hobby.name} />
            <h3>
              
                {hobby.name}
              
            </h3>
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
