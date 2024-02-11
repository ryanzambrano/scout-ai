import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import { supabase } from "./supabase";

import "./profilePage.css";

function ProfilePage() {
  const [playerData, setPlayerData] = useState(null);
  const [playerarray, setPlayerarray] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  let { player1 } = useParams();
  let overall = 90;
  let array = [null];
  function getFillColor(percentage) {
    if (percentage > 75) {
      return "green";
    } else if (percentage > 50) {
      return "yellow";
    } else {
      return "red";
    }
  }

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        // Assuming 'international_stats' is the table name
        const { data, error } = await supabase
          .from("international_stats")
          .select("*")
          .eq("id", player1)
          .single();

        if (error) {
          alert("Error fetching player data:" + error);
        } else {
          setPlayerData(data);
          array = [
            data.GP,
            data.MPG,
            data.PPG,
            data.FGM,
            data.FGA,
            data["FG%"], // Use square bracket notation for property with "%"
            data["3PM"],
            data["3PA"],
            data["3P%"],
            data.FTM,
            data.FTA,
            data["FT%"],
            data.ORB,
            data.DRB,
            data.RPG,
            data.APG,
            data.SPG,
            data.BPG,
            data.TOV,
            data.PF,
          ];

          //alert(playerarray[0]);
        }
      } catch (error) {
        alert("nothing to do");
      } finally {
        setPlayerarray(array);
        setIsLoading(false);
      }
    };

    fetchPlayerData();
  }, [player1]);
  //alert(player1);
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
      {isLoading ? (
        <div>Loading...</div> // Placeholder for your loading indicator
      ) : (
        <>
          <div className="name">name</div>
          <div className="card">
            <div className="cardheader">
              <div
                className={`tab ${selectedTab === "Stats" ? "selected" : ""}`}
                onMouseEnter={() => setSelectedTab("Stats")}
              >
                Stats
              </div>
              <div
                className={`tab ${
                  selectedTab === "Prediction" ? "selected" : ""
                }`}
                onMouseEnter={() => setSelectedTab("Prediction")}
              >
                Prediction
              </div>
              <div
                className={`tab ${
                  selectedTab === "Overview" ? "selected" : ""
                }`}
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
                                  <div className="boxNumber">
                                    {playerarray[dataIndex]}
                                  </div>
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
              {selectedTab === "Prediction" && <div>hi</div>}

              {selectedTab === "Overview" && (
                <div className="player_content">
                  <div className="profile">
                    <div className="player1-content">
                      <img
                        src={
                          "https://cdn.nba.com/headshots/nba/latest/1040x760/1630581.png"
                        }
                      />
                      <div className="player1-overall-content">
                        <div className="item1-text">OVR</div>
                        <div
                          className="player1-overall-value"
                          style={{
                            "--fill-percentage": `${overall}%`,
                            background: `conic-gradient(${getFillColor(
                              overall
                            )} var(--fill-percentage, 100%), transparent 0)`,
                            transform: "rotateY(180deg)",
                          }}
                        >
                          <div className="player1-overall-value1">90</div>
                        </div>
                      </div>
                      <div className="player1-position-content">
                        <div className="item1-text">POS</div>
                        <div className="player1-position-value">
                          {player1.Position}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div classname="otherplayercontent">
                    <div className="player_content_text">analysis</div>
                  </div>
                  <div classname="otherplayercontent">
                    <div className="player_content_circle1">Graph</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
