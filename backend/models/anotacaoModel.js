import { stringify } from "querystring";
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize"

const Anotacao = sequelize.define(
    "Anotacao",
    {
        id_anotacao:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descricao:{
            type: DataTypes.STRING(455),
            allowNull: false
        },
        data_criacao:{
            type: DataTypes.DATE,
            allowNull: false
        },
        data_finalizacao:{
            type: DataTypes.DATE,
            allowNull: true
        },
        finalizada:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        id_usuario:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        tableName: "tb_anotacao",
        timestamps: false
    }
);

export default Anotacao;