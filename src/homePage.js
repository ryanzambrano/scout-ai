import React, { useState, useEffect } from "react";
import { supabase } from "./supabase.js";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import logo from "./for_valued_homie.png";
import background from "./bakground-global.png";
import background1 from "./globalback.png";

function Card({ player, positionFilter }) {
  const [isFlipped, setIsFlipped] = useState(false);
  let navigate = useNavigate();

  function getFillColor(percentage) {
    if (percentage > 75) {
      return "green";
    } else if (percentage > 50) {
      return "orange";
    } else {
      return "red";
    }
  }

  function goToProfile(player1, positionFilter) {
    // Encode both variables to ensure the URL is valid
    const encodedPlayer1 = encodeURIComponent(player1);
    const encodedPlayer2 = encodeURIComponent(positionFilter);

    // Concatenate both encoded strings into the path, separated by a slash or any other separator as needed
    navigate(`/profile/${encodedPlayer1}/${encodedPlayer2}`);
  }

  const handleClick = (player) => {
    setIsFlipped(!isFlipped);
    goToProfile(player.id, positionFilter);
  };
  const getPlayerRatingBasedOnPosition = (positionFilter, player) => {
    switch (positionFilter) {
      case "PG":
        return player.PointGuardRating;
      case "SG":
        return player.ShootingGuardRating;
      case "SF":
        return player.SmallForwardRating;
      case "C":
        return player.CenterRating;
      case "PF":
        return player.PowerForwardRating;
      default:
        return player.PointGuardRating; // Replace with an appropriate default value
    }
  };

  return (
    <div className="card-container" onClick={() => handleClick(player)}>
      <div className="player-card">
        <div className="player-name">
          {player.Player} <div className="player-lg">{player.League}</div>
        </div>

        <div className="player-content">
          <img className="player-image" src={player.img_url} />

          <div className="player-overall-content">
            <div className="item-text">OVR</div>
            <div
              className="player-overall-value"
              style={{
                "--fill-percentage": (() => {
                  switch (positionFilter) {
                    case "PG":
                      return `${player.PointGuardRating}%`;
                    case "SG":
                      return `${player.ShootingGuardRating}%`;
                    case "SF":
                      return `${player.SmallForwardRating}%`;
                    case "C":
                      return `${player.CenterRating}%`;
                    case "PF":
                      return `${player.PowerForwardRating}%`;
                    default:
                      return `${player.PointGuardRating}%`;
                  }
                })(),
                background: `conic-gradient(${getFillColor(
                  getPlayerRatingBasedOnPosition(positionFilter, player)
                )} var(--fill-percentage, 100%), transparent 0)`,
                transform: "rotateY(180deg)",
              }}
            >
              <div className="player-overall-value1">
                {(() => {
                  switch (positionFilter) {
                    case "PG":
                      return player.PointGuardRating;
                    case "SG":
                      return player.ShootingGuardRating;
                    case "SF":
                      return player.SmallForwardRating;
                    case "C":
                      return player.CenterRating;
                    case "PF":
                      return player.PowerForwardRating;
                    default:
                      return player.PointGuardRating;
                  }
                })()}
              </div>
            </div>
          </div>
          <div className="player-position-content">
            <div className="item-text">POS</div>
            <div className="player-position-value">{positionFilter}</div>
          </div>
          <div className="metric-container">
            <div className="metric-item">Age: {player.age}</div>
            <div className="metric-item">Weight: {player.weight}</div>
            <div className="metric-item">Height: {player.height}</div>
            <div className="metric-item">Nationality: {player.nationality}</div>
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
  const [overall, setoverall] = useState("player.PointGuardRating");
  const [positionFilter, setPositionFilter] = useState("PG"); // Added state for position filter

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (!value) {
      setFilteredPlayers([]);
    } else {
      // Map through players to access the Player property, then filter
      const filtered = players.filter((player) =>
        player.Player.toLowerCase().includes(value.toLowerCase())
      ); // Filter player names

      // Sort the filtered array by SmallForwardRating

      // Take the first 10 results
      const sliced = filtered.slice(0, 10);

      setFilteredPlayers(sliced);
      // Update state with filtered players, up to 10
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {}, [positionFilter]);

  const fetchData = async () => {
    const { data, error } = await supabase.from("player_stats").select("*");

    if (error) {
      alert(error.message);
    } else {
      if (data.length > 0) {
        setPlayers(data);
        setFilteredPlayers(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert("No players found.");
      }
    }
  };

  const handleFilterChange = (position) => {
    setPositionFilter(position); // Update the position filter state

    let sortedPlayers;

    switch (position) {
      case "PG":
        sortedPlayers = sortPlayersByRating(players, "PointGuardRating");
        break;
      case "SG":
        sortedPlayers = sortPlayersByRating(players, "ShootingGuardRating");
        break;
      case "SF":
        sortedPlayers = sortPlayersByRating(players, "SmallForwardRating");
        break;
      case "C":
        sortedPlayers = sortPlayersByRating(players, "CenterRating");
        break;
      case "PF":
        sortedPlayers = sortPlayersByRating(players, "PowerForwardRating");
        break;
      default:
        sortedPlayers = players;
    }

    setFilteredPlayers(sortedPlayers);
  };

  const sortPlayersByRating = (players, ratingField) => {
    return players.slice().sort((a, b) => b[ratingField] - a[ratingField]);
  };

  return (
    <div className="dashboard-hero-section">
      <div className="logo-container">
        <img className="logo" src={logo} />
        <div className="logo-text">SCOUT GLOBAL</div>
      </div>
      <div className="tagline">
        Where talent knows no borders, and scouting knows no limits
      </div>
      <div className="dashboard-title">
        <div className="number">#2746</div>&nbsp;Potential Prospects
      </div>
      <div className="search-container">
        {" "}
        <input
          className="search-bar"
          placeholder="Search for a player..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <div className="column">
            {filteredPlayers.slice(10, 0).map((player, index) => (
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
        <select
          onChange={(e) => handleFilterChange(e.target.value)}
          className="position-filter-dropdown"
        >
          <option value="PG">Point Guard</option>
          <option value="SG">Shooting Guard</option>
          <option value="SF">Small Forward</option>
          <option value="PF">Power Forward</option>
          <option value="C">Center</option>
        </select>
      </div>{" "}
      {isLoading ? (
        <div>Loading...</div> // Placeholder for your loading indicator
      ) : (
        <div className="player-list">
          <div className="player-list">
            {filteredPlayers.slice(0, 15).map((player, index) => (
              <Card
                key={player.id || index}
                player={player}
                positionFilter={positionFilter}
              />
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
