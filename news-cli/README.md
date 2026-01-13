# news-cli

CLI educativo desarrollado en Node.js para la gestión y consulta de noticias desde la línea de comandos.

Este proyecto se construye de forma progresiva a lo largo de varios ejercicios, incorporando buenas prácticas de organización, arquitectura y automatización.

---

## 📂 Estructura del proyecto

news-cli
├── data
│ └── news.json
├── src
│ ├── cli.js
│ ├── dataService.js
│ └── utils
│ └── logger.js
├── index.js
├── package.json
├── README.md
└── .gitignore

---

## 🧠 Layout mental

- **index.js**: punto de entrada principal.
- **src/cli.js**: procesamiento de argumentos de línea de comandos.
- **src/dataService.js**: lógica de negocio y acceso a datos.
- **src/utils/logger.js**: utilidades de salida por consola.
- **data/news.json**: fuente de datos.

Separación clara de responsabilidades para mejorar legibilidad y mantenibilidad.

---

## 🚫 Exclusiones del repositorio

Se excluyen dependencias, archivos generados y configuraciones locales para:

- mejorar la seguridad
- reducir el tamaño del repositorio
- facilitar la portabilidad entre entornos

---

## 🔖 Versionado semántico (SemVer)

El proyecto utiliza el esquema:

MAJOR.MINOR.PATCH


- **MAJOR**: cambios incompatibles
- **MINOR**: nuevas funcionalidades compatibles
- **PATCH**: correcciones de errores

---

## ▶️ Ejecución

```bash
npm start
