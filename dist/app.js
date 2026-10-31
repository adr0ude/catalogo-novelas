"use strict";
const novelas = [];
let proximoIdNovela = 1;
let idEmEdicao = null;
function cadastrarNovela(nome, genero, anoEstreia, duracao, sinopse, status) {
    const novaNovela = {
        id: proximoIdNovela,
        nome,
        genero,
        anoEstreia,
        duracao,
        sinopse,
        status
    };
    novelas.push(novaNovela);
    proximoIdNovela++;
    return novaNovela;
}
function atualizarNovela(id, nome, genero, anoEstreia, duracao, sinopse, status) {
    const novela = novelas.find((item) => item.id === id);
    if (!novela) {
        return false;
    }
    novela.nome = nome;
    novela.genero = genero;
    novela.anoEstreia = anoEstreia;
    novela.duracao = duracao;
    novela.sinopse = sinopse;
    novela.status = status;
    return true;
}
function removerNovela(id) {
    const indice = novelas.findIndex((item) => item.id === id);
    if (indice === -1) {
        return false;
    }
    novelas.splice(indice, 1);
    return true;
}
function buscarNovelas(nome, genero) {
    return novelas.filter((novela) => {
        const correspondeNome = novela.nome
            .toLowerCase()
            .includes(nome.toLowerCase());
        const correspondeGenero = genero === "" || novela.genero === genero;
        return correspondeNome && correspondeGenero;
    });
}
const formulario = document.querySelector("#form-novela");
const campoNome = document.querySelector("#nome");
const campoGenero = document.querySelector("#genero");
const campoAno = document.querySelector("#anoEstreia");
const campoDuracao = document.querySelector("#duracao");
const campoSinopse = document.querySelector("#sinopse");
const campoStatus = document.querySelector("#status");
const campoBusca = document.querySelector("#busca");
const filtroGenero = document.querySelector("#filtro-genero");
const catalogo = document.querySelector("#catalogo");
const mensagem = document.querySelector("#mensagem");
const totalNovelas = document.querySelector("#total-novelas");
const totalAssistidas = document.querySelector("#total-assistidas");
const totalPendentes = document.querySelector("#total-pendentes");
const botaoCadastrar = formulario?.querySelector('button[type="submit"]');
function atualizarContabilizador() {
    if (!totalNovelas || !totalAssistidas || !totalPendentes) {
        return;
    }
    const assistidas = novelas.filter((novela) => novela.status === "assistido").length;
    const pendentes = novelas.length - assistidas;
    totalNovelas.textContent = String(novelas.length);
    totalAssistidas.textContent = String(assistidas);
    totalPendentes.textContent = String(pendentes);
}
function editarNovela(novela) {
    if (!campoNome ||
        !campoGenero ||
        !campoAno ||
        !campoDuracao ||
        !campoSinopse ||
        !campoStatus ||
        !formulario ||
        !botaoCadastrar) {
        return;
    }
    idEmEdicao = novela.id;
    campoNome.value = novela.nome;
    campoGenero.value = novela.genero;
    campoAno.value = String(novela.anoEstreia);
    campoDuracao.value = String(novela.duracao);
    campoSinopse.value = novela.sinopse;
    campoStatus.value = novela.status;
    botaoCadastrar.textContent = "Salvar alterações";
    formulario.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}
function renderizarCatalogo() {
    if (!catalogo || !mensagem || !campoBusca || !filtroGenero) {
        return;
    }
    const resultado = buscarNovelas(campoBusca.value.trim(), filtroGenero.value);
    catalogo.replaceChildren();
    atualizarContabilizador();
    if (novelas.length === 0) {
        mensagem.textContent = "Sua coleção ainda está vazia.";
        return;
    }
    if (resultado.length === 0) {
        mensagem.textContent = "Nenhuma novela encontrada.";
        return;
    }
    mensagem.textContent = "";
    resultado.forEach((novela) => {
        const card = document.createElement("div");
        card.className = "novela";
        const titulo = document.createElement("h3");
        titulo.textContent = novela.nome;
        const genero = document.createElement("p");
        genero.textContent = `Gênero: ${novela.genero}`;
        const ano = document.createElement("p");
        ano.textContent = `Estreia: ${novela.anoEstreia}`;
        const duracao = document.createElement("p");
        duracao.textContent = `${novela.duracao} episódios`;
        const sinopse = document.createElement("p");
        sinopse.textContent = novela.sinopse;
        const status = document.createElement("p");
        status.textContent = novela.status === "assistido"
            ? "Status: Assistida"
            : "Status: Não assistida";
        const botoes = document.createElement("div");
        botoes.className = "botoes-card";
        const botaoStatus = document.createElement("button");
        botaoStatus.className = "botao-status";
        botaoStatus.textContent = novela.status === "assistido"
            ? "Marcar como não assistida"
            : "Marcar como assistida";
        botaoStatus.addEventListener("click", () => {
            const novoStatus = novela.status === "assistido"
                ? "nao assistido"
                : "assistido";
            atualizarNovela(novela.id, novela.nome, novela.genero, novela.anoEstreia, novela.duracao, novela.sinopse, novoStatus);
            renderizarCatalogo();
        });
        const botaoEditar = document.createElement("button");
        botaoEditar.className = "botao-editar";
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", () => {
            editarNovela(novela);
        });
        const botaoRemover = document.createElement("button");
        botaoRemover.className = "botao-remover";
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener("click", () => {
            const confirmar = confirm(`Deseja remover a novela ${novela.nome}?`);
            if (confirmar) {
                removerNovela(novela.id);
                if (idEmEdicao === novela.id) {
                    idEmEdicao = null;
                    formulario?.reset();
                    if (botaoCadastrar) {
                        botaoCadastrar.textContent = "Cadastrar novela";
                    }
                }
                renderizarCatalogo();
            }
        });
        botoes.append(botaoStatus, botaoEditar, botaoRemover);
        card.append(titulo, genero, ano, duracao, sinopse, status, botoes);
        catalogo.appendChild(card);
    });
}
if (formulario) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (!campoNome ||
            !campoGenero ||
            !campoAno ||
            !campoDuracao ||
            !campoSinopse ||
            !campoStatus) {
            return;
        }
        const nome = campoNome.value.trim();
        const generoSelecionado = campoGenero.value;
        const ano = Number(campoAno.value);
        const duracao = Number(campoDuracao.value);
        const sinopse = campoSinopse.value.trim();
        const status = campoStatus.value;
        if (nome === "" ||
            generoSelecionado === "" ||
            !campoAno.value ||
            !campoDuracao.value ||
            sinopse === "" ||
            !Number.isInteger(ano) ||
            ano < 1900 ||
            ano > new Date().getFullYear() ||
            !Number.isInteger(duracao) ||
            duracao < 1) {
            alert("Preencha todos os campos corretamente.");
            return;
        }
        const genero = generoSelecionado;
        if (idEmEdicao !== null) {
            atualizarNovela(idEmEdicao, nome, genero, ano, duracao, sinopse, status);
            idEmEdicao = null;
            if (botaoCadastrar) {
                botaoCadastrar.textContent = "Cadastrar novela";
            }
        }
        else {
            cadastrarNovela(nome, genero, ano, duracao, sinopse, status);
        }
        formulario.reset();
        renderizarCatalogo();
    });
}
if (campoBusca) {
    campoBusca.addEventListener("input", renderizarCatalogo);
}
if (filtroGenero) {
    filtroGenero.addEventListener("change", renderizarCatalogo);
}
renderizarCatalogo();
