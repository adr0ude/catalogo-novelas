# Novelário 🎬

Esta é uma aplicação web desenvolvida para registrar novelas, consultar suas informações e controlar o progresso de exibição. Foi feita com TypeScript, HTML e CSS como atividade avaliativa da disciplina de Tópicos Especiais em Projeto e Desenvolvimento Web.

Discente: Maria Eduarda Araujo Sales

## O que a aplicação oferece?

- **Registro de novelas:** inclusão de títulos com informações sobre gênero, ano de estreia, número de episódios, sinopse e situação de exibição.
- **Consulta do catálogo:** visualização das novelas cadastradas em cards.
- **Pesquisa e filtragem:** localização de títulos pelo nome e seleção de novelas conforme o gênero.
- **Edição de registros:** possibilidade de modificar as informações de uma novela após seu cadastro.
- **Controle de exibição:** atualização da situação de cada título entre assistido e não assistido.
- **Remoção de registros:** exclusão de novelas que não devem mais fazer parte da coleção.
- **Indicadores da coleção:** apresentação da quantidade de novelas registradas, concluídas e ainda não assistidas, com atualização automática conforme as operações realizadas.

## Tecnologias utilizadas

- **HTML5:** construção e organização dos elementos da página.
- **CSS3:** definição da identidade visual, dos estilos e da adaptação da interface.
- **TypeScript:** implementação das regras de funcionamento, tipagem dos dados e manipulação dos elementos da página.

## Pré-requisitos

Antes de iniciar, verifique se o ambiente possui:

- [Node.js](https://nodejs.org/) instalado;
- npm, disponibilizado junto ao Node.js;
- Um navegador atualizado;
- Python 3 ou a extensão Live Server do Visual Studio Code para disponibilizar a página localmente.

## Preparando e executando a aplicação

Primeiro, faça o download do repositório e acesse o diretório do projeto:

```bash
git clone https://github.com/adr0ude/catalogo-novelas
cd catalogo-novelas
```

Em seguida, instale as dependências necessárias:

```bash
npm install
```

### Compilando o TypeScript

Para acompanhar as alterações no código e gerar automaticamente a versão JavaScript, execute:

```bash
npx tsc --watch
```

Esse processo permanece ativo e recompila os arquivos sempre que identifica modificações no código TypeScript.

### Abrindo no navegador

Com o compilador em execução, abra outro terminal na pasta principal do projeto e inicie um servidor local:

```bash
python -m http.server 5500 --bind 127.0.0.1
```

Depois, acesse o endereço:

[http://127.0.0.1:5500/](http://127.0.0.1:5500/)

Outra possibilidade é utilizar o Live Server no Visual Studio Code para abrir o arquivo `index.html`.

> É necessário manter o compilador e o servidor local em funcionamento durante a utilização. O servidor disponibiliza a página, enquanto o compilador transforma o TypeScript em JavaScript, utilizado pelo navegador.

## Organização dos arquivos

```text
catalogo-novelas/
├── src/
│   └── app.ts          # Código TypeScript da aplicação
├── dist/
│   └── app.js          # Arquivo JavaScript compilado
├── index.html          # Página principal
├── style.css           # Folha de estilos
├── tsconfig.json       # Parâmetros de compilação do TypeScript
├── package.json        # Configurações e dependências do projeto
└── README.md           # Documentação
```

## Sobre os dados

O catálogo utiliza um array tipado para manter os registros das novelas durante a execução da aplicação. Dessa forma, as informações ficam disponíveis enquanto a página permanece aberta. Como não há integração com banco de dados ou mecanismo de persistência, os registros são perdidos quando a página é recarregada.
