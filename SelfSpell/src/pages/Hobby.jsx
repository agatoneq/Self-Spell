import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from '@components/ThemeProvider'; // Upewnij się, że ścieżka jest poprawna
import { useContext } from 'react';
import { useFontSize } from "@components/FontSizeProvider";
import "../styles/Hobby.css";


// Update hardcoded hobbies to include feature arrays
const hardcodedHobbies = [
  {
    name: "Fotografia",
    description: "Uchwyć chwile i stwórz wspomnienia",
    features: [0.5, 0.8, -0.2, 0.4, -0.1, 0.7, -0.3, 0.6, 0.1, -0.2],
    className: "bg-photo",
  },
  {
    name: "Gra na ukulele",
    description: "Wyrażanie emocje i relaks przy dźwiękach ulubionych melodii.",
    className: "bg-music",
    features: [0, 0.4, 0.3, 0, -0.5, -0.7, 0.6, 0.1, -0.2, 0.3],
  },
  {
    name: "Malowanie",
    description: "Możliwość wyrażania kreatywności i odprężenia poprzez tworzenie kolorowych kompozycji.",
    className: "bg-paint",
    features: [0.1, 0.3, -0.4, 0.7, 0.5, 0.2, -0.6, 0.4, 0.2, 0.1],
  },
  {
    name: "Wędkarstwo",
    description: "Ukojenie pośród spokoju natury, satysfakcja z udanych połowów.",
    features: [0.5, 0.8, -0.2, 0.4, -0.1, 0.7, -0.3, 0.6, 0.1, -0.2],
    className: "bg-fishing",
  },
  {
    name: "Szachy",
    description: "Strategiczne myślenie, dostarczają emocji podczas każdej partii.",
    className: "bg-chess",
    features: [0, 0.4, 0.3, 0, -0.5, -0.7, 0.6, 0.1, -0.2, 0.3],
  },
  {
    name: "Szydełkowanie",
    description: "Tworzenie unikalnych, ręcznie robionych projektów. Daje dużo satysfakcji z własnoręcznej pracy",
    className: "bg-neeting",
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
            // console.log("Odległość:", userFeatures[index], feature, sum + distance);
            return sum + distance;
          }, 0)
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

  const handleHobbyClick = (hobby) => {
    console.log(`Clicked hobby: ${hobby.name}, Alignment: ${hobby.distance}`);
  };

  // const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Pobieramy aktualny motyw z kontekstu
  const { fontSize } = useFontSize(); // Pobieramy dynamiczny rozmiar czcionki


  return (
    <section className="hobby">
      <h2>Zbiór hobby</h2>
      <div className="mt-10 hobbies-container">
        {hobbies.map((hobby, index) => (
          <Link
            to={`/hobby/${encodeURIComponent(hobby.name)}`}
            key={index}
            onClick={() => handleHobbyClick(hobby)}
          >
            <div className="hobby-block">
              <div className="relative flex items-center justify-center h-64">
                <div className={` w-full h-full flex items-center justify-center ${hobby.className}`}>
                  <div className="h-full w-28" >
                  </div>
                </div>
              </div>
              <h1 className={`${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ fontSize: `${fontSize}px` }}>{hobby.name}</h1>
              <h1 className={`${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ fontSize: `${fontSize}px` }}>{hobby.description}</h1>
              <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ fontSize: `${fontSize}px` }}>              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HobbyRecommendations;
