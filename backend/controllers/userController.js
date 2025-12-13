import Usuario from "../models/userModel.js";

async function listar(req,res) {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({mensagem: "Erro inesperado", error})
    }
};
async function obterPorID(req,res) {
    const { id } = req.params;

    try {
        const usuarioBuscado = await obterPorIdInterno(id);

        if (!usuarioBuscado){
            return res.status(204).json({ mensagem: "Usuário não encontrado" })
        }
        res.status(200).json(usuarioBuscado)
    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado" })
    }
};
async function criar(req,res) {
    const { nome, email, data_nasc, senha } = req.body;

    try {
        const novoUsuario = await Usuario.create({
            nome: nome,
            email: email,
            data_nasc: data_nasc,
            senha: senha
        });
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado", error });
    } 
};
async function atualizar(req,res) {
    const { id } = req.params;
    const { nome, email, data_nasc, senha } = req.body;

    try {
        const usuarioBuscado = await obterPorIdInterno(id);

        if (!usuarioBuscado) {
            return res.status(204).json({ mensagem: "Usuário não encontrado" });
        }

        const usuarioAtualizado = await Usuario.update({
            nome: nome,
            email: email,
            data_nasc: data_nasc,
            senha: senha
        }, {
            where: { id_usuario: id }
        });

        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado", error });
    }
};
async function deletar(req,res) {
    const { id } = req.params;

    try {
        const usuarioBuscado = await obterPorIdInterno(id);

        if (!usuarioBuscado) {
            return res.status(204).json({ mensagem: "Usuário não encontrado" });
        }

        await Usuario.destroy({
            where: { id_usuario: id }
        });

        res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado", error });
    }
};
async function obterPorIdInterno(id) {
    try {
        return await Usuario.findByPk(id);
    } catch (error) {
        return error;
    }
};

export default {listar, obterPorID, criar, atualizar, deletar};