import Anotacao from "../models/anotacaoModel.js";

async function listar(req,res) {
    try {
        const anotacoes = await Anotacao.findAll();
        
        res.status(200).json(anotacoes)
    } catch (error) {
        res.status(500).json({mensagem: "Erro inesperado", error})
    }
};
async function obterPorID(req,res) {
    const { id } = req.params;

    try {
        const anotacaoBuscada = await obterPorIdInterno(id);
        
        if (!anotacaoBuscada){
            return res.status(204).json({ mensagem: "Anotação não encontrada" })
        }
        res.status(200).json(anotacaoBuscada)
    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado" })
    }
};
async function criar(req,res) {
    const { descricao, data_criacao, id_usuario } = req.body;

    try {
        const novaAnotacao = await Anotacao.create({
            descricao: descricao,
            data_criacao: data_criacao,
            finalizada: false,
            id_usuario: id_usuario
        });
        res.status(201).json(novaAnotacao);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado", error });
    } 
};
async function atualizar(req,res) {
};
async function deletar(req,res) {
};
async function obterPorIdInterno(id) {
    try {
        return await Anotacao.findByPk(id);
    } catch (error) {
        return error;
    }
};

export default {listar, obterPorID, criar, atualizar, deletar};