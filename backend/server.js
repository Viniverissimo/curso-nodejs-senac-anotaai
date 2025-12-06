import express from 'express';

import sequelize from "./config/db.js"

import routesAnotacao from './routes/anotacaoRoute.js';

const app = express();

app.use(express.json());

app.use("/", routesAnotacao);



sequelize.authenticate()
    .then(() => {
        console.log("Banco autenticado com sucesso");
    })
    .catch((error) =>{
        console.log("falha na autenticação" + error)
    })

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
