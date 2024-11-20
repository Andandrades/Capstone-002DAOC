import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import"; // Importar el plugin

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      import: pluginImport, // Usar el plugin como objeto
    },
    rules: {
      "react/prop-types": "off", // Deshabilitar la regla de prop-types si no la necesitas
      "react/jsx-uses-react": "off", // Si estás usando React 17 o superior
      "react/react-in-jsx-scope": "off", // No es necesario importar React en archivos JSX con React 17 o superior
      "import/no-unresolved": "error", // Asegúrate de que las rutas de importación sean correctas
      "no-unused-vars": "off"  // Desactiva la regla globalmente
    },
    settings: {
      react: {
        version: "18.3.1", // Asegúrate de que esté configurado a tu versión de React
      },
      "import/resolver": {
        node: {
          paths: ['src'], // Asegúrate de que ESLint resuelva correctamente las rutas desde 'src'
          extensions: ['.js', '.jsx'], // Incluye las extensiones que estás utilizando
        },
      },
    },
  },
];
