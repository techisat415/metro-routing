import { useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import ResultCard from "./components/ResultCard";
import Loading from "./components/Loading";

import "./styles/App.css";

function App() {
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [routeType, setRouteType] = useState("fastest");

  return (
    <div className="app">
      <Header />

      <SearchForm
        setRouteData={setRouteData}
        setLoading={setLoading}
        setError={setError}
      />

      {loading && <Loading />}

      {error && <div className="error-msg show">{error}</div>}

      {routeData && (
        <ResultCard
          data={routeData}
          routeType={routeType}
          setRouteType={setRouteType}
        />
      )}
    </div>
  );
}

export default App;