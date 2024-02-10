import React, { useState } from "react";
import "./profilePage.css";

function profilePage() {
  return (
    <div className="container">
    <div className="card">
      <div className="name">Josh Giddy</div>
      <div className="player_content">
        <div className="profile">
        <img src={'https://cdn.nba.com/headshots/nba/latest/1040x760/1630581.png'} alt="Profile" />
        </div>
      </div>
    </div>
  </div>
  );
}

export default profilePage;
