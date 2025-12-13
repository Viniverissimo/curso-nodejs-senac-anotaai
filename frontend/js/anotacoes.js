import api from "./axios.js";

addEventListener("load", () => {
    listarAnotacoes();
})

async function listarAnotacoes() {
    const secaoAnotacoes = document.querySelector(".anotacoes>div");

    await api.get(`/anotacao`)
        .then(response => {

            if (response.data.length > 0) {
                response.data.forEach(a => {
                    secaoAnotacoes.innerHTML += `
                        <article id="card-anotacao-${a.id_anotacao}" class="card_anotacao">
                            <header class="card_anotacao__acoes">
                                <button type="button" onclick="renomearAnotacao(this, ${a.id_anotacao})">
                                    <img src="../_assets/images/svg/icone-pincel.svg" alt="">
                                </button>
                                <button type="button" style="display: none;" onclick="salvarAnotacao(this, ${a.id_anotacao})">
                                    <img src="../_assets/images/svg/icone-verificado.svg" alt="">
                                </button>
                                <button type="button" onclick="excluirAnotacao(${a.id_anotacao})">
                                    <img src="../_assets/images/svg/icone-lixeira.svg" alt="">
                                </button>
                            </header>

                            <form class="anotacao_visualizacao" id="anotacao_visualizacao-${a.id_anotacao}">
                                <input 
                                    type="checkbox" 
                                    id="anotacao-${a.id_anotacao}" 
                                    onchange="alterarAndamentoAnotacao(this, ${a.id_anotacao})""
                                    ${a.finalizada ? "checked" : ""}
                                >

                                <label
                                    for="anotacao-${a.id_anotacao}"
                                    class="nome_anotacao ${a.finalizada ? "anotacao__finalizada" : "anotacao__andamento"}"
                                >
                                ${a.descricao}
                                </label>

                            </form>

                            <form class="anotacao_edicao" style="display:none" id="anotacao_edicao-${a.id_anotacao}">
                                <input type="text" value="${a.descricao}" spellcheck="true">
                            </form>
                        </article>
            `;
                });
            } else {
                secaoAnotacoes.innerHTML = "<p id='mensagem'>Nenhuma anotação registrada...</p>";
            }
        }).catch(error => {
            console.log(error);
        })
}

async function excluirAnotacao(id) {
    let anotacao = document.getElementById(`card-anotacao-${id}`);
    const secaoAnotacoes = document.querySelector(".anotacoes>div");


    await api.delete(`/anotacao/${id}`)
        .then(response => {

            if (response.status === 200) {
                anotacao.remove();
                alert("Anotação excluída com sucesso! ✅");

                if (secaoAnotacoes.children.length === 0) {
                    secaoAnotacoes.innerHTML = "<p id='mensagem'>Nenhuma anotação registrada...</p>";

                }
            }
        })
        .catch(error => console.log(error));
}

async function salvarAnotacao(obj, id) {
    const anotacaoV = document.getElementById(`anotacao_visualizacao-${id}`);
    const anotacaoE = document.getElementById(`anotacao_edicao-${id}`);

    const input = anotacaoE.querySelector("input");
    const label = anotacaoV.querySelector("label");

    try {
        const response = await api.patch(
            `/anotacao/${id}`,
            { descricao: input.value }
        );

        // atualiza front
        input.value = response.data.descricao;
        label.innerText = response.data.descricao;

        // alterna botões e formulários
        obj.style.display = "none";
        obj.previousElementSibling.style.display = "initial";

        anotacaoV.style.display = "flex";
        anotacaoE.style.display = "none";

    } catch (error) {
        console.log(error);
    }
}


function renomearAnotacao(obj, id) {
    let anotacaoV = document.getElementById(`anotacao_visualizacao-${id}`)
    let anotacaoE = document.getElementById(`anotacao_edicao-${id}`)

    // debugger
    if (obj.nextElementSibling.style.display == "none") {
        obj.style.display = "none";
        obj.nextElementSibling.style.display = "initial";

        anotacaoV.style.display = "none";
        anotacaoE.style.display = "flex";

        anotacaoE.children[0].focus()
        anotacaoE.children[0].setSelectionRange(anotacaoE.children[0].value.length, anotacaoE.children[0].value.length);
    }
}

async function alterarAndamentoAnotacao(obj, id) {

    if (obj.checked) {

        await api.patch(`/anotacao/${id}`,
            JSON.stringify({ finalizada: obj.checked }),
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                console.log(response);

                obj.labels[0].classList.remove("anotacao__andamento");
                obj.labels[0].classList.add("anotacao__finalizada");
            })
            .catch(error => console.log(error));

    } else {

        await api.patch(`/anotacao/${id}`,
            JSON.stringify({ finalizada: obj.checked }),
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        obj.labels[0].classList.remove("anotacao__finalizada");
        obj.labels[0].classList.add("anotacao__andamento");
    }
}

async function cadastrarNovaAnotacao(event) {
    const secaoAnotacoes = document.querySelector(".anotacoes>div");
    const mensagem = document.getElementById("mensagem");

    api.post("/anotacao",
        JSON.stringify({
            descricao: event.srcElement[0].value,
            data_criacao: new Date().toISOString()
        }),
        {
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
            mensagem.remove();
            if (response.status === 201) {
                secaoAnotacoes.innerHTML += `
                       <article id="card-anotacao-${response.data.novaAnotacao.id_anotacao}" class="card_anotacao">
                            <header class="card_anotacao__acoes">
                                <button type="button" onclick="renomearAnotacao(this, ${response.data.novaAnotacao.id_anotacao})">
                                    <img src="../_assets/images/svg/icone-pincel.svg" alt="">
                                </button>
                                <button type="button" style="display: none;" onclick="salvarAnotacao(this, ${response.data.novaAnotacao.id_anotacao})">
                                    <img src="../_assets/images/svg/icone-verificado.svg" alt="">
                                </button>
                                <button type="button" onclick="excluirAnotacao(${response.data.novaAnotacao.id_anotacao})">
                                    <img src="../_assets/images/svg/icone-lixeira.svg" alt="">
                                </button>
                            </header>

                            <form class="anotacao_visualizacao" id="anotacao_visualizacao-${response.data.novaAnotacao.id_anotacao}">
                                <input 
                                    type="checkbox" 
                                    id="anotacao-${response.data.novaAnotacao.id_anotacao}" 
                                    onchange="alterarAndamentoAnotacao(this, ${response.data.novaAnotacao.id_anotacao})""
                                    ${response.data.novaAnotacao.finalizada ? "checked" : ""}
                                >

                                <label
                                    for="anotacao-${response.data.novaAnotacao.id_anotacao}"
                                    class="nome_anotacao ${response.data.novaAnotacao.finalizada ? "anotacao__finalizada" : "anotacao__andamento"}"
                                >
                                ${response.data.novaAnotacao.descricao}
                                </label>

                            </form>

                            <form class="anotacao_edicao" style="display:none" id="anotacao_edicao-${response.data.novaAnotacao.id_anotacao}">
                                <input type="text" value="${response.data.novaAnotacao.descricao}" spellcheck="true">
                            </form>
                        </article>
                `;
            }

        })
        .catch(error => console.log(error));
    event.target.reset();
    event.preventDefault();
}

window.renomearAnotacao = renomearAnotacao;
window.salvarAnotacao = salvarAnotacao;
window.excluirAnotacao = excluirAnotacao;
window.alterarAndamentoAnotacao = alterarAndamentoAnotacao;
window.cadastrarNovaAnotacao = cadastrarNovaAnotacao;
