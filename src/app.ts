// Modelagem dos dados
type StatusNovela =
    | "assistido"
    | "nao assistido";

type GeneroNovela =
    | "drama"
    | "comedia"
    | "romance"
    | "acao"
    | "suspense"
    | "fantasia"
    | "historica"
    | "outro";

interface Novela {
    readonly id: number;
    nome: string;
    genero: GeneroNovela;
    anoEstreia: number;
    duracao: number;
    sinopse: string;
    status: StatusNovela;
}

const novelas: Novela[] = [];

let proximoIdNovela: number = 1;
let idEmEdicao: number | null = null;

// Funcionalidades CRUD
function cadastrarNovela(
    nome: string,
    genero: GeneroNovela,
    anoEstreia: number,
    duracao: number,
    sinopse: string,
    status: StatusNovela
): Novela {

    const novaNovela: Novela = {
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

function atualizarNovela(
    id: number,
    nome: string,
    genero: GeneroNovela,
    anoEstreia: number,
    duracao: number,
    sinopse: string,
    status: StatusNovela
): boolean {

    const novela = novelas.find(
        (item: Novela) => item.id === id
    );

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

function removerNovela(id: number): boolean {

    const indice = novelas.findIndex(
        (item: Novela) => item.id === id
    );

    if (indice === -1) {
        return false;
    }

    novelas.splice(indice, 1);

    return true;
}

function buscarNovelas(
    nome: string,
    genero: GeneroNovela | ""
): Novela[] {

    return novelas.filter((novela: Novela) => {

        const correspondeNome = novela.nome
            .toLowerCase()
            .includes(nome.toLowerCase());

        const correspondeGenero =
            genero === "" || novela.genero === genero;

        return correspondeNome && correspondeGenero;
    });
}

const formulario = document.querySelector<HTMLFormElement>(
    "#form-novela"
);

// Renderização
const campoNome = document.querySelector<HTMLInputElement>("#nome");
const campoGenero = document.querySelector<HTMLSelectElement>("#genero");
const campoAno = document.querySelector<HTMLInputElement>("#anoEstreia");
const campoDuracao = document.querySelector<HTMLInputElement>("#duracao");
const campoSinopse = document.querySelector<HTMLTextAreaElement>("#sinopse");
const campoStatus = document.querySelector<HTMLSelectElement>("#status");

const campoBusca = document.querySelector<HTMLInputElement>("#busca");
const filtroGenero = document.querySelector<HTMLSelectElement>("#filtro-genero");

const catalogo = document.querySelector<HTMLDivElement>("#catalogo");
const mensagem = document.querySelector<HTMLParagraphElement>("#mensagem");

const totalNovelas = document.querySelector<HTMLElement>("#total-novelas");
const totalAssistidas = document.querySelector<HTMLElement>("#total-assistidas");
const totalPendentes = document.querySelector<HTMLElement>("#total-pendentes");

const botaoCadastrar = formulario?.querySelector<HTMLButtonElement>(
    'button[type="submit"]'
);

function atualizarContabilizador(): void {

    if (!totalNovelas || !totalAssistidas || !totalPendentes) {
        return;
    }

    const assistidas = novelas.filter(
        (novela: Novela) => novela.status === "assistido"
    ).length;

    const pendentes = novelas.length - assistidas;

    totalNovelas.textContent = String(novelas.length);
    totalAssistidas.textContent = String(assistidas);
    totalPendentes.textContent = String(pendentes);
}

function editarNovela(novela: Novela): void {

    if (
        !campoNome ||
        !campoGenero ||
        !campoAno ||
        !campoDuracao ||
        !campoSinopse ||
        !campoStatus ||
        !formulario ||
        !botaoCadastrar
    ) {
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

function renderizarCatalogo(): void {

    if (!catalogo || !mensagem || !campoBusca || !filtroGenero) {
        return;
    }

    const resultado = buscarNovelas(
        campoBusca.value.trim(),
        filtroGenero.value as GeneroNovela | ""
    );

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

    resultado.forEach((novela: Novela) => {

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

            const novoStatus: StatusNovela =
                novela.status === "assistido"
                    ? "nao assistido"
                    : "assistido";

            atualizarNovela(
                novela.id,
                novela.nome,
                novela.genero,
                novela.anoEstreia,
                novela.duracao,
                novela.sinopse,
                novoStatus
            );

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

            const confirmar = confirm(
                `Deseja remover a novela ${novela.nome}?`
            );

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

        botoes.append(
            botaoStatus,
            botaoEditar,
            botaoRemover
        );

        card.append(
            titulo,
            genero,
            ano,
            duracao,
            sinopse,
            status,
            botoes
        );

        catalogo.appendChild(card);
    });
}

if (formulario) {

    formulario.addEventListener("submit", (evento: SubmitEvent) => {

        evento.preventDefault();

        if (
            !campoNome ||
            !campoGenero ||
            !campoAno ||
            !campoDuracao ||
            !campoSinopse ||
            !campoStatus
        ) {
            return;
        }

        const nome = campoNome.value.trim();
        const generoSelecionado = campoGenero.value;
        const ano = Number(campoAno.value);
        const duracao = Number(campoDuracao.value);
        const sinopse = campoSinopse.value.trim();
        const status = campoStatus.value as StatusNovela;

        if (
            nome === "" ||
            generoSelecionado === "" ||
            !campoAno.value ||
            !campoDuracao.value ||
            sinopse === "" ||
            !Number.isInteger(ano) ||
            ano < 1900 ||
            ano > new Date().getFullYear() ||
            !Number.isInteger(duracao) ||
            duracao < 1
        ) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        const genero = generoSelecionado as GeneroNovela;

        if (idEmEdicao !== null) {

            atualizarNovela(
                idEmEdicao,
                nome,
                genero,
                ano,
                duracao,
                sinopse,
                status
            );

            idEmEdicao = null;

            if (botaoCadastrar) {
                botaoCadastrar.textContent = "Cadastrar novela";
            }

        } else {

            cadastrarNovela(
                nome,
                genero,
                ano,
                duracao,
                sinopse,
                status
            );
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