import express from 'express';

import sequelize from "./config/db.js"

const app = express();

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
