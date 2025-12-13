import { Router } from "express";
import userController from "../controllers/userController.js";

const routes = Router();

routes
    .get("/usuario", userController.listar)
    .get("/usuario/:id", userController.obterPorID)
    .post("/usuario", userController.criar)
    .patch("/usuario/:id", userController.atualizar)
    .delete("/usuario/:id", userController.deletar);

export default routes;
