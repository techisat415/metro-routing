import { useState } from "react";
import STOPS from "../data/stops.json";

function AutocompleteInput({
  label,
  value,
  onChange,
  placeholder,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredStations = STOPS.filter((station) =>
    station.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 8);

  function handleSelect(station) {
    onChange(station);
    setShowDropdown(false);
  }

  return (
    <div className="field">
      <label>{label}</label>

      <div className="autocomplete-wrap">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => {
            setTimeout(() => {
              setShowDropdown(false);
            }, 150);
          }}
        />

        {showDropdown && value && (
          <div className="dropdown open">
            {filteredStations.length > 0 ? (
              filteredStations.map((station) => (
                <div
                  key={station}
                  className="dropdown-item"
                  onMouseDown={() => handleSelect(station)}
                >
                  {station}
                </div>
              ))
            ) : (
              <div className="dropdown-item">
                No stations found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AutocompleteInput;