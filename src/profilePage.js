import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import { supabase } from "./supabase";

import "./profilePage.css";

import "chart.js/auto";

const RadarChart = ({ data, options }) => {
  return <Radar data={data} options={options} />;
};

function ProfilePage() {
  const [playerData, setPlayerData] = useState(null);
  const [playerarray, setPlayerarray] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [windowHeight, setWindowHeight] = useState(null);

  const location = useLocation();
  let { player1, positionFilter } = useParams();

  let overall = 90;
  let array = [null];
  function getFillColor(percentage) {
    if (percentage > 75) {
      return "green";
    } else if (percentage > 50) {
      return "orange";
    } else {
      return "red";
    }
  }

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        // Assuming 'international_stats' is the table name
        const { data, error } = await supabase
          .from("player_stats")
          .select("*")
          .eq("id", player1)
          .single();

        const { data: text, error: errortext } = await supabase
          .from("player_stats")
          .select("Analysis")
          .eq("id", player1)
          .single();
        if (errortext) {
          alert("Error fetching player data:" + errortext.message);
        } else {
        }

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

  function getWindowHeight() {
    // Find all elements with the class 'card'
    const card = document.querySelector(".card");
    if (!card) {
      console.log("Card element not found");
      return 0; // Return 0 if the card is not found
    }

    // Get the height of the card
    const height = card.offsetHeight;

    alert(height); // This includes padding and border

    // Calculate 20% of the height
    const windowHeight20 = height * 0.2;

    if (windowHeight20 < 1) {
      return 50;
    } else {
      // You can return this value to use it elsewhere
      return windowHeight20;
    }
  }
  //alert(player1);
  const [selectedTab, setSelectedTab] = useState("Overview");
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
       <div className="header-container">
      <img className="header" src={"https://cdn.worldvectorlogo.com/logos/vectorizationeu.svg"} alt="Header Image" />
      <span className="header-text">Player Profile</span>
    </div>
    {isLoading ? (
        <div>Loading...</div> // Placeholder for your loading indicator
      ) : (
        <>
        <div className="ProfileContentHero">
      
      <div className="playermetrics"></div>
          <div className="card-stats">
            <div className="cardheader">
              <div
                className={`tab ${
                  selectedTab === "Overview" ? "selected" : ""
                }`}
                onMouseEnter={() => setSelectedTab("Overview")}
              >
                Overview
              </div>
              <div
                className={`tab ${selectedTab === "Stats" ? "selected" : ""}`}
                onMouseEnter={() => setSelectedTab("Stats")}
              >
                Stats
              </div>
            </div>

            <div className="tabContent">
              {selectedTab === "Overview" && (
                <>
                  <div className="player_content">
                    <div className="column">
                    
                      <div className="bottoms">
                        <div className="radar-chart">
                          <RadarChart
                            data={{
                              labels: [
                                "Driving",
                                "Playmaking",
                                "Rebounding",
                                "Shooting",
                                "Defending",
                              ],

                              datasets: [
                                {
                                  label: " ",
                                  data: [
                                    playerData.inside,
                                    playerData.playmaking,
                                    playerData.rebound,
                                    playerData.outside,
                                    playerData.defense,
                                  ],
                                  backgroundColor: "rgba(255, 100, 90, 0.8)",
                                  borderColor: "rgba(250, 250, 90, 1)",
                                  borderWidth: 1,
                                  color: "black",
                                  borderColor: "orange", // Line color
                                  pointBackgroundColor: "white", // Point fill color
                                  pointBorderColor: "black", // Point border color
                                  pointHoverBackgroundColor: "#fff", // Point hover fill color
                                  pointHoverBorderColor: "black",
                                },
                              ],
                            }}
                            options={{
                              scales: {
                                r: {
                                  pointLabels: {
                                    color: "black", // Sets the color of the point labels (Value 1, Value 2, etc.) to black
                                    font: {
                                      size: 13, // Adjusts the font size, if needed
                                      weight: 500, // You can specify other font properties here
                                    },
                                    // Include additional pointLabels styling here if needed
                                  },
                                  angleLines: {
                                    display: false,
                                  },

                                  grid: {
                                    color: "grey",
                                    lineWidth: 0.3, // Changes the grid lines to black
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
                                  borderWidth: 1,
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
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </>
              )}
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
                                  <div className="column">
                                    <div className="boxText">
                                      {tableData[dataIndex]}
                                    </div>
                                    <div className="boxNumber">
                                      {playerarray[dataIndex]}
                                    </div>
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
            </div>
          </div>
          <div className="playersynopsis">
            <div className="playergpt"></div>
            <div className="playeroverall"></div>
          </div>
          </div>
          
        </>
      )}
      
    </div>
     
  );
}

export default ProfilePage;
