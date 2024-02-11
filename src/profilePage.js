import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2"

import "./profilePage.css";

function ProfilePage() {
  const { player } = useParams();
  const [selectedTab, setSelectedTab] = useState("Stats");
  const tableData = [
    "Games Played",
    "Minutes Per Game",
    "Points Per Game",
    "Field Goals Made",
    "Field Goals Assisted",
    "Field Goal Percent",
    "3 Points Made",
    "3 Points Assisted",
    "3 Point Percentage",
    "Free Throws Made",
    "Free Throws Attempted",
    "Free Throw Percentage",
    "Offensive Rebounds",
    "Defensive Rebounds",
    "Rebounds Per Game",
    "Assist Per Game",
    "Steals Per Game",
    "Blocks Per Game",
    "Turnovers",
    "Person Fouls",
  ];


  return (
    <div className="container">
      <div className="name">Josh Giddy</div>
      <div className="card">
        <div className="cardheader">
          <div
            className={`tab ${selectedTab === "Stats" ? "selected" : ""}`}
            onMouseEnter={() => setSelectedTab("Stats")}
          >
            Stats
          </div>
          <div
            className={`tab ${selectedTab === "Prediction" ? "selected" : ""}`}
            onMouseEnter={() => setSelectedTab("Prediction")}
          >
            Prediction
          </div>
          <div
            className={`tab ${selectedTab === "Overview" ? "selected" : ""}`}
            onMouseEnter={() => setSelectedTab("Overview")}
          >
            Overview
          </div>
        </div>

        <div className="tabContent">
          {selectedTab === "Stats" && (
            <div className="statsContent">
              <table>
                <tbody>
                  {Array.from(
                    { length: tableData.length / 4 },
                    (_, rowIndex) => (
                      <tr key={rowIndex}>
                        {Array.from({ length: 4 }, (_, colIndex) => {
                          const dataIndex = rowIndex * 4 + colIndex;
                          return (
                            <td key={colIndex}>
                              <div className="boxNumber">{dataIndex + 1}</div>
                               <div className="boxText">
                               
                            
                                {tableData[dataIndex]}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
          {selectedTab === "Prediction" && (<p>Yo</p>)}
          {selectedTab === "Overview" && (( <div className="player_content">
        <div className="profile">
        <img src={'https://cdn.nba.com/headshots/nba/latest/1040x760/1630581.png'} />
        </div>
       < div classname="otherplayercontent">
       <div className="player_content_text">
          analysis
        </div>
       </div>
       < div classname="otherplayercontent">
        <div className="player_content_circle1">
          Graph
        </div>
       </div>
      </div>))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
