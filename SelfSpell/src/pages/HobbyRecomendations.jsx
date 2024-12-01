import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const hardcodedHobbies = [
  {
    name: "Photography",
    description: "Capture moments and create memories.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Photographer_Photographing_Nevada_Mountains.jpg/1200px-Photographer_Photographing_Nevada_Mountains.jpg",
    features: [-0.6, -0.3, 0.4, 0.7, 0.4, 0.1, -0.1, 0.1, 0.1, -0.2],
  },
  {
    name: "Ground tennis",
    description: "Play tennis with friends and family.",
    image: "https://example.com/cooking2.jpg",
    features: [0.9, 0.8, 0.4, 0.4, 0.3, -0.1, 0.1, 0.1, -0.2, 0.3],
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

  const featureNames = [
    "Interakcje z innymi ludźmi",
    "Umiejętności fizyczne",
    "Myślenie",
    "Czas wolny",
    "Pieniądze",
    "Refleks",
    "Cierpliwość",
    "Pamięć",
  ];

  return (
    <section className="hobby-recommendations">
      <h2>Polecane hobby:</h2>
      <div className="chatgpt-response">
          {loading ? "" : response}
      </div>
      <div className="hobbies-container">
        {hobbies.map((hobby, index) => (
          <Link
            to={`/hobby/${encodeURIComponent(hobby.name)}`}
            key={index}
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
