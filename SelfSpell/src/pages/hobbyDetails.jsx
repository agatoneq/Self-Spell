import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const HobbyDetails = () => {
  const { hobbyName } = useParams();
  const navigate = useNavigate();

  // Example data - In a real application, fetch this dynamically
  const hobbyData = {
    Photography: {
      long_description: "Capture moments and create lasting memories.",
      image: "https://example.com/photography.jpg",
      details: "Photography allows you to explore your creativity and see the world differently.",
    },
    "Cooking 2: Electric Boogaloo": {
      long_description: "A sequel to your kitchen adventures.",
      image: "https://example.com/cooking.jpg",
      details: "Advanced cooking techniques and recipes to elevate your culinary skills.",
    },
    Cooking: {
      long_description: "Create delicious meals and discover new recipes.",
      image: "https://example.com/cooking.jpg",
      details: "Cooking is a journey of taste and culture. Discover new cuisines!",
    },
  };

  const hobby = hobbyData[hobbyName] || {
    long_description: "Hobby not found.",
    image: "https://example.com/placeholder.jpg",
    details: "We couldn't find details about this hobby.",
  };

  return (
    <section className="hobby-details">
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{hobbyName}</h2>
      <img src={hobby.image} alt={hobbyName} />
      <p>{hobby.long_description}</p>
      <p>{hobby.details}</p>
    </section>
  );
};

export default HobbyDetails;
