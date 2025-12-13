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
async function atualizar(req, res) {
    const { id } = req.params;
    const { descricao, data_criacao, id_usuario } = req.body;

    try {
        const anotacaoBuscada = await Anotacao.findByPk(id);

        if (!anotacaoBuscada) {
            return res.status(404).json({ mensagem: "Anotação não encontrada" });
        }

        await anotacaoBuscada.update({
            descricao,
            data_criacao,
            id_usuario
        });

        return res.status(200).json(anotacaoBuscada);
        
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro inesperado",
            error: error.message
        });
    }
}

async function deletar(req,res) {
    const { id } = req.params;

    try {
        const anotacaoBuscada = await obterPorIdInterno(id);

        if (!anotacaoBuscada) {
            return res.status(404).json({ mensagem: "Anotação não encontrada" });
        }

        await Anotacao.destroy({
            where: { id_anotacao: id }
        });

        res.status(200).json({ mensagem: "Anotação deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado", error });
    }
};
async function obterPorIdInterno(id) {
    try {
        return await Anotacao.findByPk(id);
    } catch (error) {
        return error;
    }
};

export default {listar, obterPorID, criar, atualizar, deletar};