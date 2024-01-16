import React from "react";
import Plot from "react-plotly.js";
function LineChart({ data }) {
  // eslint-disable-next-line
  if (data.length == 0) {
    return null;
  }

  // Preparar los datos para Plotly
  const trace = {
    x: data.map((d) => d.x),
    y: data.map((d) => d.y),
    type: "scatter",
    mode: "lines",
    line: { color: "blue", width: 1 },
  };

  const layout = {
    width: 300, // Ancho del gráfico
    height: 300, // Alto del gráfico
    xaxis: {
      visible: false, // Oculta el eje X
      fixedrange: true, // Evita el zoom en el eje X
    },
    yaxis: {
      visible: false, // Oculta el eje Y
      fixedrange: true, // Evita el zoom en el eje Y
    },
    // Aplicar la transformación al trazado
    dragmode: false, // Deshabilita el arrastre del gráfico
    scene: {
      aspectmode: "cube", // Proporciona una vista en 3D
      camera: { eye: { x: 10, y: 10, z: 1.5 } }, // Ajusta la vista de la cámara
    },
    showlegend: false,
  };

  return (
    <div className="rotated-chart">
      <Plot data={[trace]} layout={layout} config={{ displayModeBar: false }} />
    </div>
  );
}
export default LineChart;