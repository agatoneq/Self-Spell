import { useParams, useNavigate } from "react-router-dom";
import "../styles/HobbyDetails.css";  // Assuming this is where custom styles are stored

const HobbyDetails = () => {
  const { hobbyName } = useParams();
  const navigate = useNavigate();

  // Example data - In a real application, fetch this dynamically
  const hobbyData = {
    Photography: {
      long_description: "Capture moments and create lasting memories.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Photographer_Photographing_Nevada_Mountains.jpg/1200px-Photographer_Photographing_Nevada_Mountains.jpg",
      details: "Photography allows you to explore your creativity and see the world differently.",
    },
    "Cooking 2: Electric Boogaloo": {
      long_description: "A sequel to your kitchen adventures.",
      image: "https://example.com/cooking.jpg",
      details: "Advanced cooking techniques and recipes to elevate your culinary skills.",
    },
    Cooking: {
      long_description: "Create delicious meals and discover new recipes.",
      image: "https://images-ext-1.discordapp.net/external/NHyE6yjXdRBCzbf-8zZsPgydszArA7ONsbe_1hqGQgs/https/t3.ftcdn.net/jpg/10/67/97/94/240_F_1067979407_j0ZfbsMls06OJLMLbsSZ6Hft94fln7Zj.jpg?format=webp&width=413&height=271",
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
      
      <h2 className="hobby-title">{hobbyName}</h2>
      <img src={hobby.image} alt={hobbyName} className="hobby-image" />
      <p className="hobby-description">{hobby.long_description}</p>
      <p className="hobby-details-text">{hobby.details}</p>

      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </section>
  );
};

export default HobbyDetails;
