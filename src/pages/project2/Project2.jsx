import React, { use, useState } from "react";
import reportData from "../../data/reportData.json";
import reportData2Years from "../../data/reportData-2years.json";
import "../project1/Project.css";

const Project1 = () => {
  const [showTwoYears, setShowTwoYears] = useState(false);
  const currentData = showTwoYears ? reportData2Years : reportData;
  const { report } = currentData;
  const { studyAnalysis, name: reportName } = report;
  const companies = report.categories[0]?.companies || [];

  const allScores = companies.flatMap((company) =>
    showTwoYears
      ? [company.scores[0]?.score || 0, company.scores[1]?.score || 0]
      : [company.scores[0]?.score || 0]
  );

  const rawMin = Math.min(...allScores);
  const rawMax = Math.max(...allScores);

  const minScore = Math.floor(rawMin); // redondear hacia abajo
  const maxScore = Math.ceil(rawMax); // redondear hacia arriba

  const getIncrementColor = (increment) => {
    if (increment > 0) {
      return "#6d84f6";
    } else if (increment < 0) {
      return "#f66d6d";
    }
    return "white";
  };

  if (companies.length === 0) {
    return <p>No hay datos de empresas para mostrar.</p>;
  }

  return (
    <div className="report-container">
      <div className="report-header">
        <div>
          <h2>Estudio: {studyAnalysis}</h2>
          <h3>Reporte: {reportName}</h3>
        </div>
        <div className="year-switch">
          <label className="switch">
            <input
              type="checkbox"
              checked={showTwoYears}
              onChange={() => setShowTwoYears(!showTwoYears)}
            />
            <span className="slider"></span>
          </label>
          <span className="switch-label">
            {showTwoYears ? "2 Years" : "1 Year"}
          </span>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <table>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "20%" }} />
              {showTwoYears ? (
                <>
                  <col style={{ width: "7.5%" }} />
                  <col style={{ width: "7.5%" }} />
                </>
              ) : (
                <col style={{ width: "15%" }} />
              )}
              <col style={{ width: "20%" }} />
              {showTwoYears ? (
                <>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </>
              ) : (
                <col style={{ width: "20%" }} />
              )}
              {showTwoYears ? (
                <>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </>
              ) : (
                <col style={{ width: "20%" }} />
              )}
            </colgroup>
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                {showTwoYears ? (
                  <>
                    <th style={{ backgroundColor: "#6d84f6" }}>
                      Observations 2024
                    </th>
                    <th style={{ backgroundColor: "#66d33e" }}>
                      Observations 2023
                    </th>
                  </>
                ) : (
                  <th>Number of observations</th>
                )}
                <th>Score Chart</th>
                {showTwoYears ? (
                  <>
                    <th style={{ backgroundColor: "#6d84f6" }}>Score 2024</th>
                    <th style={{ backgroundColor: "#66d33e" }}>Score 2023</th>
                  </>
                ) : (
                  <th>Score</th>
                )}
                {showTwoYears ? (
                  <>
                    <th>% Above/Below 2024</th>
                    <th>% Above/Below 2023</th>
                  </>
                ) : (
                  <th>% Above/Below</th>
                )}
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-body-container">
          <table>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "20%" }} />
              {showTwoYears ? (
                <>
                  <col style={{ width: "7.5%" }} />
                  <col style={{ width: "7.5%" }} />
                </>
              ) : (
                <col style={{ width: "15%" }} />
              )}
              <col style={{ width: "20%" }} />
              {showTwoYears ? (
                <>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </>
              ) : (
                <col style={{ width: "20%" }} />
              )}
              {showTwoYears ? (
                <>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </>
              ) : (
                <col style={{ width: "20%" }} />
              )}
            </colgroup>
            <tbody>
              {companies.map((company, index) => (
                <tr key={company.id}>
                  <td>{index + 1}</td>
                  <td>{company.name}</td>
                  {showTwoYears ? (
                    <>
                      <td>{company.scores[0]?.responses || "N/A"}</td>
                      <td>{company.scores[1]?.responses || "N/A"}</td>
                    </>
                  ) : (
                    <td>{company.scores[0]?.responses || "N/A"}</td>
                  )}
                  <td style={{ padding: "0" }}>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${
                            ((company.scores[1]?.score - minScore) /
                              (maxScore - minScore)) *
                            100
                          }%`,
                        }}
                      >
                        <span className="progress-bar-text">
                          {company.scores[0]?.score?.toFixed(6) || "N/A"}
                        </span>
                      </div>
                      {showTwoYears && (
                        <div
                          className="progress-bar secondary"
                          style={{
                            width: `${
                              ((company.scores[0]?.score - minScore) /
                                (maxScore - minScore)) *
                              100
                            }%`,
                          }}
                        >
                          <span className="progress-bar-text">
                            {company.scores[1]?.score?.toFixed(6) || "N/A"}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  {showTwoYears ? (
                    <>
                      <td>{company.scores[0]?.score?.toFixed(6) || "N/A"}</td>
                      <td>{company.scores[1]?.score?.toFixed(6) || "N/A"}</td>
                    </>
                  ) : (
                    <td>{company.scores[0]?.score?.toFixed(6) || "N/A"}</td>
                  )}
                  {showTwoYears ? (
                    <>
                      <td
                        style={{
                          backgroundColor: getIncrementColor(
                            company.scores[0]?.increment
                          ),
                        }}
                      >
                        {company.scores[0]?.increment?.toFixed(4) || "N/A"}
                      </td>
                      <td
                        style={{
                          backgroundColor: getIncrementColor(
                            company.scores[1]?.increment
                          ),
                        }}
                      >
                        {company.scores[1]?.increment?.toFixed(4) || "N/A"}
                      </td>
                    </>
                  ) : (
                    <td
                      style={{
                        backgroundColor: getIncrementColor(
                          company.scores[0]?.increment
                        ),
                      }}
                    >
                      {company.scores[0]?.increment?.toFixed(4) || "N/A"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-header">
          <table className="table-footer">
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <tfoot>
              <tr>
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
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Project1;
