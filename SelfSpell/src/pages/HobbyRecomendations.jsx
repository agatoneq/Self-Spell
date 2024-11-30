import React, { useEffect, useState } from "react";

// Fallback hobbies in case the API is unreachable
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

  // Fetch hobbies from the API or fallback to hardcoded ones
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await fetch("/todos"); // Ensure this matches the backend route
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch hobbies from the API");
        }
        const data = await response.json();

        // Map the API data to the expected format
        const mappedHobbies = data.map((hobby) => ({
          name: hobby.description,
          description: hobby.description,
          image: hobby.url,
        }));

        // Use the fetched hobbies or fallback if the API returns empty
        setHobbies(mappedHobbies.length > 0 ? mappedHobbies : hardcodedHobbies);
      } catch (error) {
        console.error("Error fetching hobbies:", error);
        setHobbies(hardcodedHobbies); // Fallback to hardcoded hobbies
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