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