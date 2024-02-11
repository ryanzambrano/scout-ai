import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";

import "./profilePage.css";

function ProfilePage() {
  const { player } = useParams();
  const [selectedTab, setSelectedTab] = useState("Stats");
  const barChartData = {
    labels: [
      "Points Per Game",
      "Rebounds Per Game",
      "Assists Per Game",
      "Steals Per Game",
      "Blocks Per Game",
    ],
    datasets: [
      {
        label: "Projected Season Averages",
        data: [20, 10, 8, 2, 1], // Example data
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
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
      <div className="name">Name</div>
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
          {selectedTab === "Prediction" && (
  <div>
    hi
  </div>
)}

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
