import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { SearchPage } from "./pages/SearchPage";
import { RepositoryDetailsPage } from "./pages/RepositoryDetailsPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route
            path="/repository/:owner/:repo"
            element={<RepositoryDetailsPage />}
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
