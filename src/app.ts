type StatusNovela =
    | "assistido"
    | "nao assistido";

interface Novela {
    readonly id: number;
    nome: string;
    genero: string;
    anoEstreia: number;
    duracao: number;
    sinopse: string;
    status: StatusNovela;
}

const novelas: Novela[] = [];

let proximoIdNovela: number = 1;

function cadastrarNovela(
    nome: string,
    genero: string,
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

    console.log(
        `Novela ${novaNovela.nome} cadastrada com sucesso!`
    );

    return novaNovela;
}

function atualizarNovela(
    id: number,
    nome: string,
    genero: string,
    anoEstreia: number,
    duracao: number,
    sinopse: string,
    status: StatusNovela
): boolean {

    const novela = novelas.find(
        (item: Novela) => item.id === id
    );

    if (!novela) {
        console.log("Novela não encontrada.");
        return false;
    }

    novela.nome = nome;
    novela.genero = genero;
    novela.anoEstreia = anoEstreia;
    novela.duracao = duracao;
    novela.sinopse = sinopse;
    novela.status = status;

    console.log(`Novela ${novela.nome} atualizada com sucesso!`);

    return true;
}

function removerNovela(id: number): boolean {

    const indice = novelas.findIndex(
        (item: Novela) => item.id === id
    );

    if (indice === -1) {
        console.log("Novela não encontrada.");
        return false;
    }

    const novelaRemovida = novelas[indice];

    novelas.splice(indice, 1);

    console.log(
        `Novela ${novelaRemovida.nome} removida com sucesso!`
    );

    return true;
}