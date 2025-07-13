const cursos = [
  {
    nombre: "COMPORTAMIENTO DEL CONSUMIDOR",
    codigo: "8123",
    categoria: "publicidad",
    requisitos: ["FUNDAMENTOS DE PUBLICIDAD Y MARKETING"]
  },
  {
    nombre: "ESTRATEGIAS DE MARKETING",
    codigo: "8202",
    categoria: "publicidad",
    requisitos: ["FUNDAMENTOS DE PUBLICIDAD Y MARKETING"]
  },
  {
    nombre: "PUBLICIDAD Y PROMOCIÓN",
    codigo: "8897",
    categoria: "publicidad",
    requisitos: ["FUNDAMENTOS DE PUBLICIDAD Y MARKETING"]
  },
  {
    nombre: "FUNDAMENTOS DE PUBLICIDAD Y MARKETING",
    codigo: "550054",
    categoria: "obligatorio",
    requisitos: []
  },
  {
    nombre: "PRODUCCIÓN INFORMATIVA",
    codigo: "550007",
    categoria: "periodismo",
    requisitos: ["STORYTELLING"]
  },
  {
    nombre: "STORYTELLING",
    codigo: "550001",
    categoria: "obligatorio",
    requisitos: []
  },
  // Puedes añadir más cursos según los PDF
];

const estadoCursos = {}; // guarda si está aprobado o no

function crearCurso(curso) {
  const div = document.createElement('div');
  div.className = `curso ${curso.categoria}`;
  div.textContent = curso.nombre;
  div.id = curso.nombre;
  div.onclick = () => toggleCurso(curso.nombre);
  actualizarEstado(div, curso.nombre);
  return div;
}

function toggleCurso(nombre) {
  estadoCursos[nombre] = !estadoCursos[nombre];
  document.querySelectorAll('.curso').forEach(c => {
    const curso = cursos.find(x => x.nombre === c.id);
    actualizarEstado(c, curso.nombre);
  });
}

function actualizarEstado(div, nombre) {
  const curso = cursos.find(c => c.nombre === nombre);
  const requisitosCumplidos = curso.requisitos.every(req => estadoCursos[req]);
  if (estadoCursos[nombre]) {
    div.classList.add('aprobado');
    div.style.cursor = "default";
  } else {
    div.classList.remove('aprobado');
    div.style.cursor = requisitosCumplidos ? "pointer" : "not-allowed";
  }

  div.style.opacity = requisitosCumplidos || estadoCursos[nombre] ? "1" : "0.4";
}

function cargarCursos() {
  const contenedor = document.getElementById('contenedor-cursos');
  cursos.forEach(curso => {
    estadoCursos[curso.nombre] = false;
    const divCurso = crearCurso(curso);
    contenedor.appendChild(divCurso);
  });
}

cargarCursos();

