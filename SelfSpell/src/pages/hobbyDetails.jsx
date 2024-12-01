import { useParams, useNavigate } from "react-router-dom";
import "../styles/HobbyDetails.css";  // Assuming this is where custom styles are stored

const HobbyDetails = () => {
  const { hobbyName } = useParams();
  const navigate = useNavigate();

  const hobbyData = {
    Fotografia: {
      long_description: "Uchwyć chwile i stwórz wspomnienia.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Photographer_Photographing_Nevada_Mountains.jpg/1200px-Photographer_Photographing_Nevada_Mountains.jpg",
      details: "Fotografia pozwala na eksplorację kreatywności i spojrzenie na świat z innej perspektywy.",
    },
    "Gra na ukulele": {
      long_description: "Wyrażanie emocji i relaks przy dźwiękach ulubionych melodii.",
      image: "https://example.com/ukulele.jpg", // Add a proper image URL for ukulele
      details: "Gra na ukulele to idealny sposób na odpoczynek i rozwijanie umiejętności muzycznych.",
    },
    Malowanie: {
      long_description: "Możliwość wyrażania kreatywności i odprężenia poprzez tworzenie kolorowych kompozycji.",
      image: "https://example.com/painting.jpg", // Add a proper image URL for painting
      details: "Malowanie to relaksująca aktywność, która pozwala tworzyć unikalne dzieła sztuki.",
    },
    Wędkarstwo: {
      long_description: "Ukojenie pośród spokoju natury, satysfakcja z udanych połowów.",
      image: "https://example.com/fishing.jpg", // Add a proper image URL for fishing
      details: "Wędkarstwo to idealny sposób na odprężenie się i obcowanie z naturą.",
    },
    Szachy: {
      long_description: "Strategiczne myślenie, dostarczające emocji podczas każdej partii.",
      image: "https://example.com/chess.jpg", // Add a proper image URL for chess
      details: "Szachy rozwijają umiejętności strategicznego myślenia i uczą cierpliwości.",
    },
    Szydełkowanie: {
      long_description: "Tworzenie unikalnych, ręcznie robionych projektów.",
      image: "https://example.com/crocheting.jpg", // Add a proper image URL for crocheting
      details: "Szydełkowanie to satysfakcjonujące zajęcie, które pozwala tworzyć praktyczne i piękne przedmioty.",
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
