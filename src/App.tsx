import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/index.tsx";
import ResultsPage from "./pages/results.tsx";
import DetailPage from "./pages/detail.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/books/:bookId" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
