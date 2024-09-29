const { Router } = require("express");


//import de los controladores
const {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controllers");

const router = Router();

router.get("/users", getAllUsers);

router.get("/users/:id",getUser);

router.post("/users", createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

module.exports = router;
