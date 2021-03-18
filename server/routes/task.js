const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController")
const {isSignedIn} = require("../protected")
router.get("/create/:id",taskController.task_list);
router.post("/create",taskController.task_create_post);
router.get("/delete/:userId/:taskId",taskController.task_delete);
router.get("/removeAll/:id",taskController.removeAll);

module.exports = router;