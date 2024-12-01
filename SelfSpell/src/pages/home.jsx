import "../styles/Home.css";
import { FaStar } from "react-icons/fa";
import ButtonBasic from "@components/ButtonBasic";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '@components/ThemeProvider'; // Upewnij się, że ścieżka jest poprawna
import { useContext } from 'react';
import { useFontSize } from "@components/FontSizeProvider";

const HomePage = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Pobieramy aktualny motyw z kontekstu
    const { fontSize } = useFontSize(); // Pobieramy dynamiczny rozmiar czcionki

    const handleNavigation = () => {
        navigate('/questionnaire');
    };

    return (
        <div className="container mx-auto text-center">
            <div className="relative flex items-center justify-center h-56 mt-8 ">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">Odkryj hobby,</h1>
                    <h1 className="text-5xl font-bold mb-4">poznaj siebie</h1>
                </div>
            </div>
            <div className="relative flex items-center justify-center h-64">
                <div className="bg-custom_representative-bg-image w-full h-full flex items-center justify-center">
                    <div className="bg-custom_representative-image h-full w-24">
                    </div>
                </div>
            </div>
            <h1 className="text-2xl font-bold mb-4 mt-3">Lorem ipsum dolor sit amet.</h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6" style={{ fontSize: `${fontSize}px` }}>
                To jest strona główna. Znajdziesz tutaj najważniejsze informacje o naszej aplikacji.
            </p>
            <ButtonBasic text="Odkryj więcej" onClick={handleNavigation} />
            <div className="relative items-center column-1 justify-center h-56 bg-custom-image py-10 my-10">
                <div className="text-center mx-auto text-black">
                    <h1 className="text-4xl font-bold mb-4"
                    >Join over 1 million users worldwide
                    </h1>
                </div>
                <div className="text-center text-black">
                    <div className="justify-center flex row align-middle">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                    <div className="justify-center align-middle">
                        <h1 className="text-2xl font-bold mb-4">Over 50,000 5-star app reviews</h1>
                    </div>
                </div>
            </div>
            <div className=" p-10">
                {/* Nagłówek */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold">Creative Learning</h2>
                    <h3 className="text-xl font-semibold">Made Easy</h3>
                </div>

                {/* Lista punktów */}
                <div className="space-y-4 text-lg mb-10">
                    <div className="flex items-center ">

                        <span className={` text-2xl mr-2 w-16 bg-african-violet p-2 rounded-full ${theme === 'dark' ? 'text-black' : 'text-white'}`}>✔</span>
                        Thousands of creative classes. Beginner to pro.
                    </div>
                    <div className="flex items-center">
                        <span className={` text-2xl mr-2 w-16 bg-african-violet p-2 rounded-full ${theme === 'dark' ? 'text-black' : 'text-white'}`}>✔</span>
                        Taught by creative pros and industry icons.
                    </div>
                    <div className="flex items-center">
                        <span className={` text-2xl mr-2 w-16 bg-african-violet p-2 rounded-full ${theme === 'dark' ? 'text-black' : 'text-white'}`}>✔</span>
                        Learning Paths to help you achieve your goals.
                    </div>
                    <div className="flex items-center">
                        <span className={` text-2xl mr-2 w-16 bg-african-violet p-2 rounded-full ${theme === 'dark' ? 'text-black' : 'text-white'}`}>✔</span>
                        Certificates to celebrate your accomplishments.
                    </div>
                </div>

                {/* Statystyki */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-african-violet p-5 rounded-md">
                        <h4 className={` text-2xl font-bold ${theme === 'dark' ? 'text-black' : 'text-white'}`}>600K+</h4>
                        <p className="text-black">Members</p>
                    </div>
                    <div className="bg-state-blue p-5 rounded-md">
                        <h4 className={` text-2xl font-bold ${theme === 'dark' ? 'text-black' : 'text-white'}`}>25K+</h4>
                        <p className="text-black">Classes</p>
                    </div>
                    <div className="bg-thistie p-5 rounded-md">
                        <h4 className={` text-2xl font-bold ${theme === 'dark' ? 'text-black' : 'text-white'}`}>8K+</h4>
                        <p className="text-black">Teachers</p>
                    </div>
                    <div className="bg-african-violet p-5 rounded-md">
                        <h4 className={` text-2xl font-bold ${theme === 'dark' ? 'text-black' : 'text-white'}`}>4.8 ★★★★★</h4>
                        <p className="text-black">App Store Rating</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
