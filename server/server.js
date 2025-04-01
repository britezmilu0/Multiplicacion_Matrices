const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const path = require("path");

const PORT = 4000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "../public")));

// Ruta para servir index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.post("/multiply", (req, res) => {
  const { matrix1, matrix2 } = req.body;

  const rows1 = matrix1.length,
    cols1 = matrix1[0].length;
  const rows2 = matrix2.length,
    cols2 = matrix2[0].length;

  if (cols1 !== rows2) {
    return res.json({
      error:
        "El número de columnas de la primera matriz debe coincidir con el número de filas de la segunda matriz.",
    });
  }

  const result = Array(rows1)
    .fill(0)
    .map(() => Array(cols2).fill(0));

  for (let i = 0; i < rows1; i++) {
    for (let j = 0; j < cols2; j++) {
      for (let k = 0; k < cols1; k++) {
        result[i][j] += matrix1[i][k] * matrix2[k][j];
      }
    }
  }

  res.json({ result });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://192.168.0.12:${PORT}`);
});
