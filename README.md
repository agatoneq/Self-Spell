
# 🧙 Self-Spell – Discover Yourself Through Play

⏱️ Built in **24 hours** during a university hackathon  
🏆 **2nd place** in the **classic software category** at BIT Festival 2024

Self-Spell is a web application that helps users discover their strengths and personality traits through **interactive mini-games**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/b57a1582-275a-4ce7-812d-d6914a004ebd" height="300px"/>
  <img src="https://github.com/user-attachments/assets/1c6f8c63-337a-4dc9-984f-d107467c9ae7" height="300px"/>
  <img src="https://github.com/user-attachments/assets/21854e80-a989-4f7f-8fe1-7f10bda68356" height="300px"/>
</p>



## 🧠 About the Project

Many apps rely on static personality quizzes. We wanted to build something more **playful** and **interactive** – where your behavior reveals more than your answers.

Instead of asking direct questions, we designed **three small games**, each testing soft skills like patience, quick reaction, or risk-taking. Based on your performance, our algorithm suggests **hobbies** that might suit your style.

## 🎮 Core Features

- Intuitive web UI with clean navigation
- 3 unique mini-games representing different soft skills:
  - **Patience** game
  - **Reflex** game
  - **Memory / Focus** game
- Result-based analysis with hobby recommendations
- Backend scoring logic + frontend visual feedback
- React-based frontend + Flask API backend
- Light gamification elements (progress bar, tips)

## 💻 Technologies

- **Frontend:** React + Vite, JavaScript, HTML/CSS
- **Backend:** Python, Flask
- **Deployment:** localhost
- **Other:** PowerShell scripting for deployment

## 👥 Data Wizards Team

- Agata Sobczyk (Team Leader) – [GitHub](https://github.com/agatoneq)  
- Sławomir Put – [GitHub](https://github.com/xTaromarux)  
- Jarosław Strzelczyk – [GitHub](https://github.com/JaykerX)  
- Adrianna Froń – [GitHub](https://github.com/skalmaros)  
  
## ▶️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/agatoneq/Self-Spell.git
   ```
2. Navigate to the frontend and install dependencies:
   ```bash
   cd SelfSpell
   npm install
   npm run dev
   ```
3. Start the backend (Python):
   ```bash
   cd ../SelfSpellBackend
   python app.py
   ```
4. Visit `http://localhost:3000` to use the app.


## 📜 License

Created for educational and experimental purposes during a 24h hackathon.
