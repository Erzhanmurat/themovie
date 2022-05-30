
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import MovieInfo from "./pages/MovieInfo";
import PersonInfo from "./pages/PersonInfo";
import Search from "./pages/Search";
import NotPage from "./components/NotPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/person/:id" element={<PersonInfo />} />
          <Route path="/browse/:id" element={<Search />} />
          <Route path="/*" element={<NotPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
