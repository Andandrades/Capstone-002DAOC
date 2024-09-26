//Los controladores son las funciones que va a llamar express, dichas funciones se llamaran en las routes y se ejecutaran en estas

const getAllRoles = async (req, res) => {
  res.json("Its alive");
};

const getRol = async (req, res) => {
  res.json("Extrayendo un rol en especifico");
};
const createRol = (req, res) => {
  res.send("Creando un rol nuevo");
};

const updateRol = (req, res) => {
  res.send("Actualizando un rol");
};

const deleteRol =  (req,res) => {
    res.send('Eliminando rol');
} 

//Al momento de escribir una funcion, se tiene que exportar en esta parte del codigo
module.exports = {
  getAllRoles,
  getRol,
  createRol,
  updateRol,
  deleteRol
};
