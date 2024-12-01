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
            <h1 className="text-2xl font-bold mb-4 mt-3">Odkryj hobby, poznaj siebie,<br/>
szukaj pasji w każdej glebie.<br/>
Znajdź co cieszy, co rozwija,<br/>
co twój świat na lepsze zmienia.</h1>
            <ButtonBasic text="Zaczynamy" onClick={handleNavigation} />
            <div className="relative items-center column-1 justify-center h-56 bg-custom-image py-2 my-5">
                <div className="text-center mx-auto text-black">
                    <h1 className="text-4xl font-bold mb-4">
                        Dołącz do ponad 600 tysięcy użytkowników na całym świecie
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
                        <h1 className="text-2xl font-bold mb-4">Ponad 50 000 recenzji 5-gwiazdkowych aplikacji</h1>
                    </div>
                </div>
            </div>
            <div className="p-10">
                {/* Nagłówek */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold">Kreatywna Nauka</h2>
                    <h3 className="text-xl font-semibold">Stała się Prosta</h3>
                </div>

                {/* Lista punktów */}
                <div className="space-y-4 text-lg mb-10">
                    <div className="flex items-center">
                        <span className={`text-2xl mr-2 w-16 bg-african-violet p-2 rounded-full stasis ${theme === 'dark' ? 'text-black' : 'text-white'}`}>✔</span>
                        Tysiące kreatywnych pomysłów na nowe hobby.
                    </div>
                    <div className="flex items-center">
                        <span className={`text-2xl mr-2 w-16 bg-african-violet p-2 rounded-full stasis ${theme === 'dark' ? 'text-black' : 'text-white'}`}>✔</span>
                        Wybrane specjalnie dla twoich zainteresowań.
                    </div>
                    <div className="flex items-center">
                        <span className={`text-2xl mr-2 w-16 bg-african-violet p-2 rounded-full stasis ${theme === 'dark' ? 'text-black' : 'text-white'}`}>✔</span>
                        Proste i zrozumiałe instrukcje krok po kroku.
                    </div>
                    <div className="flex items-center">
                        <span className={`text-2xl mr-2 w-16 bg-african-violet p-2 rounded-full stasis ${theme === 'dark' ? 'text-black' : 'text-white'}`}>✔</span>
                        Dostępne za darmo na wszystkich urządzeniach.
                    </div>
                </div>

                {/* Statystyki */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-african-violet p-5 rounded-md">
                        <h4 className={`text-2xl font-bold ${theme === 'dark' ? 'text-black' : 'text-white'}`}>600K+</h4>
                        <p className="text-black">Użytkowników</p>
                    </div>
                    <div className="bg-state-blue p-5 rounded-md">
                        <h4 className={`text-2xl font-bold ${theme === 'dark' ? 'text-black' : 'text-white'}`}>6K+</h4>
                        <p className="text-black">Hobby</p>
                    </div>
                    <div className="bg-thistie p-5 rounded-md">
                        <h4 className={`text-2xl font-bold ${theme === 'dark' ? 'text-black' : 'text-white'}`}>8K+</h4>
                        <p className="text-black">Nauczycieli</p>
                    </div>
                    <div className="bg-african-violet p-5 rounded-md">
                        <h4 className={`text-2xl font-bold ${theme === 'dark' ? 'text-black' : 'text-white'}`}>4.8★</h4>
                        <p className="text-black">Gwiazdek</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
