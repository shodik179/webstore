import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import HowToOrder from './pages/HowToOrder';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-body">
        <Navbar />
        <main className="flex-grow flex flex-col w-full bg-gray-50/30">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jasa" element={<Services />} />
            <Route path="/cara-order" element={<HowToOrder />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;
