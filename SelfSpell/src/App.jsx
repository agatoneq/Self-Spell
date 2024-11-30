import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<header class="header">
        <div class="logo-name">
            <img src="logo.png" alt="SelfSpell Logo"/>
            <h1>SelfSpell</h1>
        </div>
        <nav class="header-buttons">
            <button onclick="location.href='dostosuj-preferencje.html'">Dostosuj Preferencje</button>
            <button onclick="location.href='propozycje.html'">Propozycje</button>
        </nav>
    </header>



    <main class="main-content">
        <p class="description">
            Odkryj swoje hobby i rozwijaj pasje dzięki SelfSpell. Stwórz swój unikalny profil zainteresowań, poznaj nowe aktywności i dołącz do społeczności ludzi o podobnych pasjach!
        </p>


        <div class="button-container">
            <a href="/ankieta" class="button">Odkryj Hobby</a>
            <a href="/glowna" class="button secondary">Odkryj Siebie</a>
        </div>

        <div class="feature-section">
            <img src="feature1.jpg" alt="Hobby image 1" class="feature-image"/>
            <div class="feature-description">
                <h2>Znajdź nowe hobby</h2>
                <p>Wypełnij krótką ankietę i odkryj aktywności, które pasują do Twoich zainteresowań oraz osobowości.</p>
            </div>
        </div>



        <div class="feature-section reverse">
            <div class="feature-description">
                <h2>Dołącz do społeczności</h2>
                <p>Poznawaj ludzi o podobnych zainteresowaniach i dziel się swoją pasją z innymi użytkownikami.</p>
            </div>
            <img src="feature2.jpg" alt="Hobby image 2" class="feature-image"/>
        </div>

    </main>
    </>
  )
}

export default App