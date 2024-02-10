import React, { useState } from "react";
import "./homePage.css";

function Card({ player }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className={`player-card ${isFlipped ? "flip" : ""}`}>
        <div className="player-card">
          <div className="front">
            <div className="player-name">{player.name}</div>
            <div className="player-content">
              <div className="player-image"></div>
              <div className="player-overall-content">
                <div className="item-text">ovr</div>
                <div className="player-overall-value">{player.overall}</div>
              </div>
              <div className="player-position-content">
                <div className="item-text">pos</div>
                <div className="player-position-value">{player.position}</div>
              </div>
            </div>
          </div>
          <div className="back">
            {/* Back side content here */}
            <div>Back of the card</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const playerData = {
    name: "Name",
    overall: 87,
    position: "PG",
    description: "This is the card description.",
  };

  return (
    <div className="dashboard-hero-section">
      <input className="search-bar" placeholder="search" />

      <div className="dashboard-title">Best Picks</div>

      <div className="player-grid">
        <Card player={playerData} />
        <Card player={playerData} />
        <Card player={playerData} />
        <Card player={playerData} />
      </div>

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
