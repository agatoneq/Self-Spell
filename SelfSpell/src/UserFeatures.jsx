import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported

const UserFeatures = () => {
    const [userId, setUserId] = useState('');
    const [features, setFeatures] = useState('');
    const [distances, setDistances] = useState([]);
    const [loading, setLoading] = useState(false);  // State for loading
    const [error, setError] = useState(''); // State for error message

    // Function to save features locally (in localStorage)
    const saveUserFeatures = () => {
        setLoading(true); // Start loading
        setError(''); // Clear any previous error
        try {
            // Save user features to localStorage
            const userFeatures = {
                user_id: userId,
                features: features.split(',').map(Number),
            };
            localStorage.setItem('userFeatures', JSON.stringify(userFeatures)); // Save to localStorage

            alert("Features saved locally!");
        } catch (error) {
            setError('Error saving user features');
        } finally {
            setLoading(false); // Stop loading after request
        }
    };

    // Function to calculate distances using saved features
    const calculateDistances = async () => {
        setLoading(true); // Start loading
        setError(''); // Clear any previous error

        try {
            const savedFeatures = JSON.parse(localStorage.getItem('userFeatures')); // Retrieve saved features from localStorage

            if (!savedFeatures) {
                setError('No saved features found');
                return;
            }

            // Use the saved features for distance calculation (you can also send them to the backend here)
            const response = await axios.post('http://localhost:5000/calculate_distances', {
                user_id: savedFeatures.user_id,
                features: savedFeatures.features,
            });

            setDistances(response.data || []); // Ensure it's an array
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'Something went wrong');
            } else {
                setError('Network error or server is down');
            }
        } finally {
            setLoading(false); // Stop loading after request
        }
    };

    return (
        <div>
            <h1>User Features</h1>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Features (comma-separated)"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
            />
            <button onClick={saveUserFeatures} disabled={loading}>
                {loading ? 'Saving...' : 'Save Features'}
            </button>
            <button onClick={calculateDistances} disabled={loading}>
                {loading ? 'Calculating...' : 'Calculate Distances'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
            <h2>Distances</h2>
            <ul>
                {distances.length > 0 ? (
                    distances.map((distance, index) => (
                        <li key={index}>
                            {distance.hobby}: {distance.distance}
                        </li>
                    ))
                ) : (
                    <p>No distances calculated yet.</p>
                )}
            </ul>
        </div>
    );
};

export default UserFeatures;
