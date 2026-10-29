"use strict";
const novelas = [];
let proximoIdNovela = 1;
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
    console.log(`Novela ${novaNovela.nome} cadastrada com sucesso!`);
    return novaNovela;
}
