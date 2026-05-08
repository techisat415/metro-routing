import { useState } from "react";
import AutocompleteInput from "./AutocompleteInput.jsx";

function SearchForm({ setRouteData, setLoading, setError }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [apiBase, setApiBase] = useState("http://localhost:4000");

  async function fetchRoute() {
    setError("");
    setRouteData(null);

    if (!from || !to) {
      setError("Please select both stations.");
      return;
    }

    if (from === to) {
      setError("Origin and destination cannot be same.");
      return;
    }

    try {
      setLoading(true);

      const url = `${apiBase}/api/v1/routes?startPoint=${encodeURIComponent(
        from
      )}&endPoint=${encodeURIComponent(to)}`;

      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok || json.statusCode !== 200) {
        throw new Error(json.message || "Route not found");
      }

      setRouteData(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="field">
        <label>API Base URL</label>

        <input
          value={apiBase}
          onChange={(e) => setApiBase(e.target.value)}
        />
        </div>

        <AutocompleteInput
            label="From"
            value={from}
            onChange={setFrom}
            placeholder="Search station..."
        />

        <AutocompleteInput
            label="To"
            value={to}
            onChange={setTo}
            placeholder="Search station..."
        />

        <button className="find-btn" onClick={fetchRoute}>
            Find Route
        </button>
    </div>
  );
}

export default SearchForm;