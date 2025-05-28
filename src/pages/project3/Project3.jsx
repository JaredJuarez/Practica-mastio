import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import reportData from '../../data/reportDatra-DegreeOfCategorization.json';
import '../styles/Project.css';

const Project3 = () => {
    const { attributes } = reportData;

    // Definir colores por categoría
    const categoryColors = {
        'Baseline Requirements': '#FF9999',
        'Conscious Differentiators': '#99FF99',
        'Latent Differentiators': '#9999FF',
        'Industry Parity': '#FFFF99'
    };

    // Preparar datos para el gráfico
    const chartData = attributes.map(attr => ({
        x: attr.correlatedCoeficient,
        y: attr.importance,
        name: attr.name,
        code: attr.code,
        category: attr.category,
        fill: categoryColors[attr.category]
    }));

    return (
        <div className="project-container">
            <h1>Degree of Categorization of Needs Map</h1>
            <p>How likely would you be to recommend this company to a friend or colleague?</p>
            
            <div className="chart-container">
                <ScatterChart
                    width={1000}
                    height={600}
                    margin={{ bottom: 20, left: 20 }}
                >
                    <CartesianGrid />
                    <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Correlation Coefficient" 
                        domain={[0.4, 0.8]}
                        label={{ value: 'Correlation Coefficient', position: 'bottom' }}
                    />
                    <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Stated Importance" 
                        domain={[8.5, 10]}
                        label={{ value: 'Stated Importance', angle: -90, position: 'left' }}
                    />
                    <Tooltip 
                        content={({ payload }) => {
                            if (payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="custom-tooltip">
                                        <p>{`${data.code}: ${data.name}`}</p>
                                        <p>{`Importance: ${data.y.toFixed(2)}`}</p>
                                        <p>{`Correlation: ${data.x.toFixed(4)}`}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <Scatter
                            key={category}
                            name={category}
                            data={chartData.filter(d => d.category === category)}
                            fill={color}
                        />
                    ))}
                </ScatterChart>
            </div>
            <div className="legend-container">
                <div className="category-list">
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="category-item">
                            <span className="color-box" style={{ backgroundColor: color }}></span>
                            <span>{category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Project3;