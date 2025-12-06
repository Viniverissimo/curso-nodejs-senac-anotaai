import { Router } from "express";
import anotacaoController from "../controllers/anotacaoController.js";

const routes = Router();

routes
    .get("/anotacao", anotacaoController.listar)
    .get("/anotacao/:id", anotacaoController.obterPorID)
    .post("/anotacao", anotacaoController.criar)
    .put("/anotacao/:id", anotacaoController.atualizar)
    .delete("/anotacao/:id", anotacaoController.deletar);

export default routes;
