import { Router } from "express";
import PostController from "./controllers/PostController";
import UserController from "./controllers/UserController";

const router = Router();

router.post("/user", UserController.createUser);
router.get("/users", UserController.findAllUsers);
router.get("/user/:id", UserController.findUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

router.post("/post/user/:id", PostController.createPost);
router.get("/posts", PostController.findAllPosts);
router.put("/post/:id", PostController.UpdatePost);
router.delete("/post/:id", PostController.deletePost);

export { router }