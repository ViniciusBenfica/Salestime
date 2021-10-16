"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("./controller/UserController");
var router = (0, express_1.Router)();
router.get("/getAllUSers", UserController_1.getUsers);
router.get("/getUser/:username", UserController_1.getUser);
router.post("/creatUser", UserController_1.createUser);
router.put("/updateUser/:username", UserController_1.updateUser);
router.delete("/deleteUser/:username", UserController_1.deleteUser);
exports.default = router;
