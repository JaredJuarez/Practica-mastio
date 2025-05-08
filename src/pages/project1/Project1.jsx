import React, { use, useState } from "react";
import reportData from "../../data/reportData.json"; // Importamos nuestros datos JSON
import reportData2Years from "../../data/reportData-2years.json"; // Importamos nuestros datos JSON
import "../project1/Project.css"; // Importaremos el CSS que crearemos luego

const Project1 = () => {
  const [showTwoYears, setShowTwoYears] = useState(false); // Estado para mostrar u ocultar el segundo año
  const currentData = showTwoYears ? reportData2Years : reportData;
  const { report } = currentData; // Desestructuramos el objeto report del JSON importado
  const { studyAnalysis, name: reportName } = report; // Desestructuramos el objeto report del JSON importado
  const companies = report.categories[0]?.companies || []; // Asumimos que los datos de las empresas están en la primera categoría

  // Calcular el valor máximo de score
  const maxScore = Math.max(
    ...companies.map((company) => company.scores[0]?.score || 0)
  );
  // Crear una funcion para colorear la columna de incremento de la tabla, si es positivo, azul, si es negativo, a rojo
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

      <table>
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "20%" }} />
          {showTwoYears ? (
            <>
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
            </>
          ) : (
            <col style={{ width: "20%" }} />
          )}
          <col style={{ width: "25%" }} />
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
                <th>Observations 2024</th>
                <th>Observations 2023</th>
              </>
            ) : (
              <th>Number of observations</th>
            )}
            <th>Score Chart</th>
            {showTwoYears ? (
              <>
                <th>Score 2024</th>
                <th>Score 2023</th>
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
                      width: `${(company.scores[0]?.score / maxScore) * 100}%`,
                    }}
                  ></div>
                  {showTwoYears && (
                    <div
                      className="progress-bar secondary"
                      style={{
                        width: `${
                          (company.scores[1]?.score / maxScore) * 100
                        }%`,
                      }}
                    ></div>
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

      <div className="score-rule">
        <div className="score-line">
          {Array.from(
            { length: Math.ceil(maxScore) }, // Genera un rango de 0 a maxScore
            (_, i) => (
              <span key={i} className="score-tick">
                {i === Math.ceil(maxScore) ? maxScore.toFixed(2) : i}{" "}
                {/* Formatea el último número */}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Project1;
