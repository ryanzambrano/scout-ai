import React, { useState } from "react";
import "./profilePage.css";

function profilePage() {
  return (
    <div className="container">
    <div className="card">
      <div className="name">Josh Giddy</div>
      <div className="player_content">
        <div className="profile">
        <img src={'https://cdn.nba.com/headshots/nba/latest/1040x760/1630581.png'} />
        </div>
       < div classname="otherplayercontent">
       <div className="player_content_text">
          Overall
        </div>
        <div className="player_content_circle">
          86
        </div>
       </div>
       < div classname="otherplayercontent">
       <div className="player_content_text">
          Position
        </div>
        <div className="player_content_circle1">
          PF
        </div>
       </div>
      </div>
    </div>
  </div>
  );
}
export default profilePage;