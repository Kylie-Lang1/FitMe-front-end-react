import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import OutfitIndex from './pages/OutfitIndex';
import ClosetIndex from './pages/ClosetIndex';
import NewClothing from './pages/NewClothing';
import ShowClothing from './pages/ShowClothing';
import EditClothing from './pages/EditClothing';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/outfits" element={<OutfitIndex />} />
            <Route path="/closet" element={<ClosetIndex />} />
            <Route path="/closet/new" element={<NewClothing />} />
            <Route path="/closet/:id" element={<ShowClothing />} />
            <Route path="/closet/:id/edit" element={<EditClothing />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
