import { getLineColor } from "../utils/metroUtils";

function ResultCard({ data, routeType, setRouteType }) {
  const route = data[routeType];

  if (!route) {
    return (
      <div className="result-card">
        <div className="error-msg show">
          This route is not available.
        </div>
      </div>
    );
  }

  const { segments, travelTime, interchanges, stationsCount, fare } = route;

  return (
    <div className="result-card">
      <div className="route-toggle">
        <button
          className={routeType === "fastest" ? "active" : ""}
          onClick={() => setRouteType("fastest")}
        >
          Fastest
        </button>
        <button
          className={routeType === "minStations" ? "active" : ""}
          onClick={() => setRouteType("minStations")}
        >
          Min Stations
        </button>
      </div>

      <div className="result-header">
        <div className="stat">
          <div className="stat-val">{travelTime}</div>
          <div className="stat-label">minutes</div>
        </div>
        <div className="stat">
          <div className="stat-val">{stationsCount}</div>
          <div className="stat-label">stations</div>
        </div>
        <div className="stat">
          <div className="stat-val">{interchanges}</div>
          <div className="stat-label">interchanges</div>
        </div>
        <div className="stat">
          <div className="stat-val">₹{fare}</div>
          <div className="stat-label">fare</div>
        </div>
      </div>

      <div className="route-body">
        {segments.map((seg, index) => {
          const color = getLineColor(seg.line);

          return (
            <div className="segment" key={index}>
              <div className="seg-header">
                <div
                  className="line-dot"
                  style={{ background: color }}
                ></div>

                <span
                  className="line-name"
                  style={{ color }}
                >
                  {seg.line}
                </span>
              </div>

              <div className="station-list">
                {seg.stations.map((station, i) => (
                  <div
                    className="station-item"
                    key={i}
                    style={{ "--line-color": color }}
                  >
                    <div className="s-dot"></div>

                    <span className="s-name">{station}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultCard;