import React, { useState } from "react";
import reportDataFocusCompany from "../../data/reportData-focusCompany.json";
import "../styles/Project.css";

const Project2 = () => {
  const { report } = reportDataFocusCompany;

  // Calcular minScore y maxScore de los scores del reporte
  const allScores = report.map((item) => item.score).filter(Boolean);
  const rawMin = Math.min(...allScores);
  const rawMax = Math.max(...allScores);
  const minScore = Math.floor(rawMin);
  const maxScore = Math.ceil(rawMax);

  return (
    <div className="report-container">
      <div className="report-header">
        <h1>Project 2: Report Analysis</h1>
        <p>
          This report provides an analysis of the performance and importance of
          various attributes across different industries.
        </p>
      </div>
      <div className="table-container">
        <div className="table-header">
          <table>
            <colgroup>
              <col style={{ width: "12%" }} /> {/* Attribute Classification */}
              <col style={{ width: "8%" }} /> {/* Stated Importance */}
              <col style={{ width: "8%" }} /> {/* Derived Importance */}
              <col style={{ width: "15%" }} /> {/* Attribute */}
              <col style={{ width: "8%" }} /> {/* # of Observations */}
              <col style={{ width: "25%" }} /> {/* Performance Score */}
              <col style={{ width: "8%" }} /> {/* Rank */}
              <col style={{ width: "8%" }} /> {/* Industry */}
            </colgroup>
            <thead>
              <tr>
                <th>Attribute Classification</th>
                <th>Stated Importance</th>
                <th>Derived Importance</th>
                <th>Attribute</th>
                <th># of Observations</th>
                <th>Performance Score</th>
                <th>Rank</th>
                <th style={{ background: "#ff0000" }}>Industry</th>
                <th style={{ background: "#0400ff" }}>Importance</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-body-container">
          <table>
            <colgroup>
              <col style={{ width: "12%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "3%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "8%" }} />
            </colgroup>
            <tbody>
              {report.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.category || "-"}</td>
                  <td>{item.statedImportance || "-"}</td>
                  <td>{item.derivedImportance || "-"}</td>
                  <td
                    style={{
                      textAlign: "left",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.name}
                  </td>
                  <td>{item.responses}</td>
                  <td style={{ padding: "0" }}>
                    <div className="performance-bar-container">
                      <div className="performance-bar-container">
                        {/* Barra principal del score */}
                        <div
                          className="performance-bar"
                          style={{
                            width: `${
                              ((item.score - minScore) /
                                (maxScore - minScore)) *
                              100
                            }%`,
                            backgroundColor: "#6d84f6",
                          }}
                        ></div>
                        {/* Línea para Industry Mean */}
                        {item.industryMean && (
                          <div
                            className="indicator-line"
                            style={{
                              left: `${
                                ((item.industryMean - minScore) /
                                  (maxScore - minScore)) *
                                100
                              }%`,
                              backgroundColor: "#ff0000",
                            }}
                          />
                        )}
                        {/* Línea para Importance */}
                        {item.importance && (
                          <div
                            className="indicator-line"
                            style={{
                              left: `${
                                ((item.importance - minScore) /
                                  (maxScore - minScore)) *
                                100
                              }%`,
                              backgroundColor: "#0400ff",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{item.score ? item.score.toFixed(2) : "-"}</td>
                  <td>{item.rank || "-"}</td>
                  <td>{item.industryMean?.toFixed(2) || "-"}</td>
                  <td>{item.importance?.toFixed(2) || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-header">
          <table className="table-footer">
            <colgroup>
              <col style={{ width: "12%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "3%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "8%" }} />
            </colgroup>
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th className="score-col">
                  <div className="score-scale">
                    <div className="scale-line">
                      {Array.from(
                        { length: maxScore - minScore + 1 },
                        (_, i) => {
                          const value = minScore + i;
                          return (
                            <div key={i} className="tick">
                              <span className="tick-label">{value}</span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Project2;
