const { Router } = require("express");


//import de los controladores
const {
    createUser,
    getAllUsers
} = require("../controllers/user.controllers");

const router = Router();

router.get("/users", getAllUsers);

router.get("/users/:id");

router.post("/users", createUser);

router.put("/users/:id");

router.delete("/users/:id");

module.exports = router;
