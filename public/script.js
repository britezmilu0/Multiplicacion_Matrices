document
  .getElementById("matrixForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    const container = document.getElementById("matricesContainer");
    container.innerHTML = "";

    ["Matriz 1", "Matriz 2"].forEach((name, index) => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${name}</h3>`;

      for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement("div");

        for (let j = 0; j < cols; j++) {
          const input = document.createElement("input");
          input.type = "number";
          input.classList.add(`matrix-${index + 1}`);
          input.dataset.row = i;
          input.dataset.col = j;
          rowDiv.appendChild(input);
        }

        div.appendChild(rowDiv);
      }

      container.appendChild(div);
    });

    document.getElementById("calculateBtn").style.display = "block";
  });

document.getElementById("calculateBtn").addEventListener("click", function () {
  const matrices = [[], []];

  ["matrix-1", "matrix-2"].forEach((className, index) => {
    document.querySelectorAll(`.${className}`).forEach((input) => {
      const row = parseInt(input.dataset.row);
      const col = parseInt(input.dataset.col);

      if (!matrices[index][row]) matrices[index][row] = [];
      const value = Number(input.value);

      if (isNaN(value)) {
        alert("Todos los valores deben ser números.");
        return;
      }

      matrices[index][row][col] = value;
    });
  });

  fetch("http://192.168.0.12:4000/multiply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ matrix1: matrices[0], matrix2: matrices[1] }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        renderMatrix(data.result);
      }
    });
});

function renderMatrix(matrix) {
  const container = document.getElementById("resultContainer");
  container.innerHTML = "<h3>Resultado</h3>";

  matrix.forEach((row) => {
    const rowDiv = document.createElement("div");
    row.forEach((value) => {
      const span = document.createElement("span");
      span.textContent = value + " ";
      rowDiv.appendChild(span);
    });
    container.appendChild(rowDiv);
  });
}
