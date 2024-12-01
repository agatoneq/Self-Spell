import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '@components/ThemeProvider'; // Upewnij się, że ścieżka jest poprawna
import { useContext } from 'react';
import { useFontSize } from "@components/FontSizeProvider";
import { useState, useEffect } from 'react';
import axios from 'axios';

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
];

const HobbyRecommendations = () => {
  const [hobbies, setHobbies] = useState([]);
  const [userFeatures, setUserFeatures] = useState([]);
  const [response, setResponse] = useState(""); // GPT response
  const [loading, setLoading] = useState(false); // Loading state for GPT

  useEffect(() => {
    const calculateDistances = () => {
      let storedFeatures = JSON.parse(localStorage.getItem("userFeatures"));
      if (!Array.isArray(storedFeatures) || storedFeatures.length !== 10) {
        storedFeatures = Array(10).fill(0.0);
        localStorage.setItem("userFeatures", JSON.stringify(storedFeatures));
      }
      setUserFeatures(storedFeatures);

      const calculateDistance = (hobbyFeatures, userFeatures) => {
        return hobbyFeatures.reduce((sum, feature, index) => {
          let distance = Math.pow(feature - userFeatures[index], 2);
          if (userFeatures[index] === -1 && feature > 0.5) distance = Infinity;
          if (userFeatures[index] === 1 && feature < -0.5) distance = Infinity;
          return sum + distance;
        }, 0);
      };

      const hobbiesWithDistances = hardcodedHobbies.map((hobby) => {
        const validHobbyFeatures = Array.isArray(hobby.features) && hobby.features.length === 10
          ? hobby.features
          : Array(10).fill(0.0);

        return {
          ...hobby,
          distance: parseFloat(
            calculateDistance(validHobbyFeatures, storedFeatures).toFixed(2)
          ),
        };
      });

      const sortedHobbies = hobbiesWithDistances.sort(
        (a, b) => a.distance - b.distance
      );

      setHobbies(sortedHobbies);
    };

    calculateDistances();
  }, []);

  const fetchGPTResponse = async () => {
    setLoading(true);
    try {
      const apiKey = 'KEY'; // Replace with your OpenAI API key

      const prompt = `Oto cechy użytkownika: Interakcje z innymi: ${userFeatures[0]}, Umiejętności fizyczne: ${userFeatures[1]}, Myślenie: ${userFeatures[2]}, Czas wolny: ${userFeatures[3]}, Pieniądze: ${userFeatures[4]}, Refleks: ${userFeatures[5]}, Cierpliwość: ${userFeatures[6]}, Pamięć: ${userFeatures[7]}. Na podstawie tych cech, zaproponuj hobby.`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // Replace with 'gpt-4' if you have access
          messages: [
            { role: 'system', content: "You are a helpful assistant recommending hobbies. RESPOND AS SHORTLY AS POSSIBLE. Numbers next to features say how much user likes them or is good at them, -1 mans really bad, 1 means really good. Your responses should be max 2 sentences, you should quickly tell the user what hobby would he enjoy and which of his features are important for felf discovery. respond in Polish. be professional, a bit vague. REALLY SHORT RESPONCES, max 50 tokens long" },
            { role: 'user', content: prompt },
          ],
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setResponse(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      setResponse("Nie udało się uzyskać odpowiedzi. Spróbuj ponownie później.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGPTResponse();
  }, [userFeatures]);

  // const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Pobieramy aktualny motyw z kontekstu
  const { fontSize } = useFontSize(); // Pobieramy dynamiczny rozmiar czcionki


  return (
    <section className="hobby-recommendations">
      <h2>Polecane hobby </h2>
      <div className="chatgpt-response">
          {loading ? "" : response}
      </div>
      <div className="mt-10 hobbies-container">
        {hobbies.map((hobby, index) => (
          <Link
            to={`/hobby/${encodeURIComponent(hobby.name)}`}
            key={index}
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
