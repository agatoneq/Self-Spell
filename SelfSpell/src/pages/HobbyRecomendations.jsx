import { useEffect, useState } from "react";

// Fallback hobbies in case the API is unreachable
const hardcodedHobbies = [
  {
    name: "Photography",
    description: "Capture moments and create memories.",
    image: "https://example.com/photography.jpg", // Replace with real image URL
    distance: 2, // Default high distance to make sure it is not on top
  },
  {
    name: "Cooking 2: Evectric Boogaloo",
    description: "Create delicious meals and discover new recipes.",
    image: "https://example.com/cooking.jpg", // Replace with real image URL
    distance: 3, // Default high distance to make sure it is not on top
  },
  {
    name: "Cooking",
    description: "Create delicious meals and discover new recipes.",
    image: "https://example.com/cooking.jpg", // Replace with real image URL
    distance: 1, // Default high distance to make sure it is not on top
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
        // Merge hardcoded hobbies with API data
        const allHobbies = [
          ...hardcodedHobbies.map((hobby) => ({ //zamienić w apiHobbies
            ...hobby,
            distance: parseFloat(hobby.distance), // Ensure hardcoded hobbies have numeric distances
          })),
        ];
        console.log("Works");
        // Debug: log the combined hobbies
        console.log("Combined Hobbies:", allHobbies);

        // Sort hobbies by distance (ascending)
        const sortedHobbies = allHobbies.sort((a, b) => a.distance - b.distance);

        // Debug: log the sorted hobbies
        console.log("Sorted Hobbies:", sortedHobbies);

        // Update state with sorted hobbies
        setHobbies(sortedHobbies);
      } catch (error) {
        console.error("Error fetching distances:", error);

        // Fallback to hardcoded hobbies if API fails
        setHobbies(hardcodedHobbies);
      }
    };

    fetchDistances();
  }, [userFeatures, userAge]);

  return (
    <section className="hobby-recommendations">
      <h2>Hobby Recommendations</h2>
      <div className="hobbies-container">
        {hobbies.map((hobby, index) => (
          <div key={index} className="hobby-block">
            <img src={hobby.image} alt={hobby.name} />
            <h3>{hobby.name}</h3>
            <p>{hobby.description}</p>
            <p>
              <strong>Distance:</strong> {hobby.distance}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HobbyRecommendations;
