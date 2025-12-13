import express from 'express';
import cors from 'cors';

import sequelize from "./config/db.js";

import routesAnotacao from './routes/anotacaoRoute.js';
import routesUsuario from './routes/userRoute.js';

const app = express();

app.use(cors());

app.use(express.json());


app.use("/", routesAnotacao);
app.use("/", routesUsuario);

sequelize.authenticate()
  .then(() => {
    console.log("Banco autenticado com sucesso");
  })
  .catch((error) => {
    console.log("Falha na autenticação: " + error);
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
