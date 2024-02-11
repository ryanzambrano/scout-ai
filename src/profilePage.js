import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import { supabase } from "./supabase";

import "./profilePage.css";

import "chart.js/auto";

const RadarChart = () => {
  const data = {
    labels: ["Driving", "Playmaking", "Rebounding", "Shooting", "Defending"],

    datasets: [
      {
        label: " ",
        data: [70, 50, 90, 35, 90],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 200, 132, 1)",
        borderWidth: 1,
        color: "black",
        borderColor: "orange", // Line color
        pointBackgroundColor: "white", // Point fill color
        pointBorderColor: "black", // Point border color
        pointHoverBackgroundColor: "#fff", // Point hover fill color
        pointHoverBorderColor: "black",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        pointLabels: {
          color: "white", // Sets the color of the point labels (Value 1, Value 2, etc.) to black
          font: {
            size: 15, // Adjusts the font size, if needed
            // You can specify other font properties here
          },
          // Include additional pointLabels styling here if needed
        },
        angleLines: {
          display: true,
        },

        grid: {
          color: "#11111",
          lineWidth: 1, // Changes the grid lines to black
        },
        ticks: {
          color: "black", // Tick labels (values) color
          font: {
            size: 12, // Example: setting the font size
          },
          // Additional customization for ticks can go here
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          // Change the tick marks to be bold and red
          color: "black", // Color of the tick labels
          font: {
            size: 10, // Font size
            style: "italic", // Font style
            family: "Arial", // Font family
          },
          // Include a callback to format tick labels, e.g., adding a unit
        },
      },
    },
    elements: {
      line: {
        borderWidth: 7,
        color: "black",
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          // Customizing legend labels (e.g., the dataset label)
          color: "blue", // Sets the color of the text
          font: {
            size: 20, // Sets font size
          },
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

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
          <div className="name">{playerData.Player}</div>
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

              {selectedTab === "Overview" && (
                <div className="column">
                  <div className="player_content">
                    <div className="player1-content">
                      <div className="player1-overall-content">
                        <div className="item1-text">OVR</div>
                        <div
                          className="player1-overall-value"
                          style={{
                            "--fill-percentage": `${overall}%`,
                            background: `${getFillColor(overall)}`,
                          }}
                        >
                          <div className="player1-overall-value1">90</div>
                        </div>
                      </div>
                      <div className="player1-position-content">
                        <div className="item1-text">POS</div>
                        <div className="player1-position-value">
                          {playerData.Position}
                        </div>
                      </div>
                    </div>
                    <div className="metric-container">
                      <div className="metric-item">age: "38"</div>
                      <div className="metric-item">wieght "40lbs"</div>

                      <div className="metric-item">height: "5,11"</div>
                      <div className="metric-item">nationality: "France"</div>
                    </div>
                  </div>
                  <div className="radar-chart">
                    <RadarChart />
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
