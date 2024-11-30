import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
