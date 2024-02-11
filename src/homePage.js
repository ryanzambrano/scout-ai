import React, { useState, useEffect } from "react";
import { supabase } from "./supabase.js";
import "./homePage.css";
import { useNavigate } from "react-router-dom";

function Card({ player }) {
  const [isFlipped, setIsFlipped] = useState(false);
  let navigate = useNavigate();

  let overall = 90;

  function getFillColor(percentage) {
    if (percentage > 75) {
      return "green";
    } else if (percentage > 50) {
      return "yellow";
    } else {
      return "red";
    }
  }

  function goToProfile(player1) {
    navigate(`/profile/${encodeURIComponent(player1)}`);
  }

  const handleClick = (player) => {
    setIsFlipped(!isFlipped);
    goToProfile(player.id);
  };

  return (
    <div className="card-container" onClick={() => handleClick(player)}>
      <div className="player-card">
        <div className="player-name">
          {player.Player} <div className="player-lg">{player.League}</div>
        </div>

        <div className="player-content">
          <img
            className="player-image"
            src="https://cdn.nba.com/headshots/nba/latest/1040x760/202710.png"
          />

          <div className="player-overall-content">
            <div className="item-text">OVR</div>
            <div
              className="player-overall-value"
              style={{
                "--fill-percentage": `${overall}%`,
                background: `conic-gradient(${getFillColor(
                  overall
                )} var(--fill-percentage, 100%), transparent 0)`,
                transform: "rotateY(180deg)",
              }}
            >
              <div className="player-overall-value1">90</div>
            </div>
          </div>
          <div className="player-position-content">
            <div className="item-text">POS</div>
            <div className="player-position-value">{player.Position}</div>
          </div>
          <div className="metric-container">
            <div className="metric-item">age: "38"</div>
            <div className="metric-item">wieght "40lbs"</div>

            <div className="metric-item">height: "5,11"</div>
            <div className="metric-item">nationality: "France"</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState("");
  const [positionFilter, setPositionFilter] = useState(""); // Added state for position filter

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    if (!value) {
      setFilteredPlayers([]);
    } else {
      // Map through players to access the Player property, then filter
      const filtered = players.filter(
        (player) => player.Player.toLowerCase().includes(value.toLowerCase()) // Assuming each player has a 'name' property
      ); // Filter player names

      setFilteredPlayers(filtered.slice(0, 10));
      //alert(filtered[0]);
      // Update state with filtered players, up to 10
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("international_stats")
      .select("*");

    if (error) {
      alert(error.message);
    } else {
      if (data.length > 0) {
        setPlayers(data);
        setFilteredPlayers(data);
        setIsLoading(false);
        //alert(data[0].Player); // Alert the id of the first player
      } else {
        setIsLoading(false);
        alert("No players found.");
      }
    }
  };

  const handleFilterChange = (position) => {
    setPositionFilter(position); // Update the position filter state

    if (position === "") {
      setFilteredPlayers(players); // No filter, show all players
    } else {
      // Filter players by the selected position
      if (position) {
        const filtered = players.filter(
          (player) => player.Position === position
        );
        setFilteredPlayers(filtered);
      } else {
        setFilteredPlayers(players);
      }
    }
  };

  return (
    <div className="dashboard-hero-section">
      <input
        className="search-bar"
        placeholder="search"
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <div className="column">
          {filteredPlayers.map((player, index) => (
            <div
              key={index}
              onClick={() => {
                setSearchTerm(player);
                setFilteredPlayers([]);
              }}
            >
              {filteredPlayers.map((player, index) => (
                <Card key={player.id || index} player={player} /> // Use player.id as key if available, else use index
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="dashboard-title">Best Picks</div>
      <select
        onChange={(e) => handleFilterChange(e.target.value)}
        className="position-filter-dropdown"
      >
        <option value="">All Positions</option>
        <option value="PG">Point Guard</option>
        <option value="SG">Shooting Guard</option>
        <option value="SF">Small Forward</option>
        <option value="PF">Power Forward</option>
        <option value="C">Center</option>
      </select>{" "}
      {isLoading ? (
        <div>Loading...</div> // Placeholder for your loading indicator
      ) : (
        <div className="player-list">
          <div className="player-list">
            {filteredPlayers.slice(0, 5).map((player, index) => (
              <Card key={player.id || index} player={player} />
            ))}
          </div>
        </div>
      )}
      {/*<div className="dashboard-title">Best Point Guards</div>

      <div className="player-grid">
        <Card player={playerData} />
        <Card player={playerData} />
        <Card player={playerData} />
        <Card player={playerData} />
  </div>*/}
    </div>
  );
}

export default HomePage;
