const cursos = [
  {
    nombre: "STORYTELLING",
    nivel: 3,
    categoria: "obligatorio",
    requisitos: []
  },
  {
    nombre: "PRODUCCIÓN INFORMATIVA",
    nivel: 4,
    categoria: "periodismo",
    requisitos: ["STORYTELLING"]
  },
  {
    nombre: "PERIODISMO TRANSMEDIA",
    nivel: 5,
    categoria: "periodismo",
    requisitos: ["BASES DE LA INFORMACIÓN"]
  },
  {
    nombre: "BASES DE LA INFORMACIÓN",
    nivel: 4,
    categoria: "obligatorio",
    requisitos: ["STORYTELLING"]
  },
  {
    nombre: "ESTRATEGIAS DE MARKETING",
    nivel: 5,
    categoria: "publicidad",
    requisitos: ["FUNDAMENTOS DE PUBLICIDAD Y MARKETING"]
  },
  {
    nombre: "FUNDAMENTOS DE PUBLICIDAD Y MARKETING",
    nivel: 3,
    categoria: "obligatorio",
    requisitos: []
  },
  {
    nombre: "COMPORTAMIENTO DEL CONSUMIDOR",
    nivel: 4,
    categoria: "publicidad",
    requisitos: ["FUNDAMENTOS DE PUBLICIDAD Y MARKETING"]
  }
  // Agrega más cursos aquí usando el mismo formato...
];

const aprobados = {};

function crearHTML() {
  const contenedor = document.getElementById("malla");
  for (let nivel = 1; nivel <= 10; nivel++) {
    const nivelDiv = document.createElement("div");
    nivelDiv.className = "nivel";
    nivelDiv.innerHTML = `<h2>Nivel ${nivel}</h2><div class="cursos" id="nivel-${nivel}"></div>`;
    contenedor.appendChild(nivelDiv);
  }

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.className = `curso ${curso.categoria}`;
    div.textContent = curso.nombre;
    div.id = curso.nombre;

    div.onclick = () => {
      if (!div.classList.contains("habilitado")) return;
      div.classList.add("aprobado");
      aprobados[curso.nombre] = true;
      actualizarCursos();
    };

    document.getElementById(`nivel-${curso.nivel}`).appendChild(div);
  });

  actualizarCursos();
}

function actualizarCursos() {
  cursos.forEach(curso => {
    const div = document.getElementById(curso.nombre);
    if (aprobados[curso.nombre]) {
      div.classList.remove("habilitado");
      div.classList.add("aprobado");
    } else {
      const habilitado = curso.requisitos.every(req => aprobados[req]);
      if (habilitado) {
        div.classList.add("habilitado");
      } else {
        div.classList.remove("habilitado");
      }
    }
  });
}

crearHTML();
