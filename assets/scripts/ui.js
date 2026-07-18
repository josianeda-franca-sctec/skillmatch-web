export function prepararHabilidades(valor) {
    return valor
        .split(",")
        .map((habilidade) => habilidade.trim())
        .filter((habilidade) => habilidade !== "");
}

export function exibirMensagem(elemento, texto) {
    elemento.textContent = texto;
}

export function exibirVagas(elemento, resultados) {
    elemento.innerHTML = "";

    if (resultados.length === 0) {
        const mensagem = document.createElement("p");

        mensagem.textContent =
            "Nenhuma vaga foi encontrada.";

        elemento.appendChild(mensagem);

        return;
    }

    resultados.forEach((resultado, indice) => {
        const artigo = document.createElement("article");

        artigo.classList.add("cartao-vaga");

        if (resultado.percentual >= 75) {
            artigo.classList.add(
                "compatibilidade-alta"
            );
        } else if (resultado.percentual >= 50) {
            artigo.classList.add(
                "compatibilidade-media"
            );
        } else {
            artigo.classList.add(
                "compatibilidade-baixa"
            );
        }

        const idTitulo = `vaga-${resultado.vaga.id}-${indice}`;

        artigo.setAttribute(
            "aria-labelledby",
            idTitulo
        );

        const titulo = document.createElement("h3");

        titulo.id = idTitulo;
        titulo.textContent = resultado.vaga.cargo;

        const empresa = criarParagrafo(
            "Empresa",
            resultado.vaga.empresa
        );

        const modalidade = criarParagrafo(
            "Modalidade",
            resultado.vaga.modalidade
        );

        const nivel = criarParagrafo(
            "Nível",
            resultado.vaga.nivel
        );

        const salarioFormatado = Number(
            resultado.vaga.salario
        ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const salario = criarParagrafo(
            "Salário",
            salarioFormatado
        );

        const requisitos = criarParagrafo(
            "Requisitos",
            resultado.vaga.requisitos.join(", ")
        );

        const compatibilidade = criarParagrafo(
            "Compatibilidade",
            `${resultado.percentual}%`
        );

        const classificacao = criarParagrafo(
            "Classificação",
            resultado.classificacao
        );

        artigo.append(
            titulo,
            empresa,
            modalidade,
            nivel,
            salario,
            requisitos,
            compatibilidade,
            classificacao
        );

        elemento.appendChild(artigo);
    });
}

function criarParagrafo(rotulo, valor) {
    const paragrafo = document.createElement("p");
    const destaque = document.createElement("strong");

    destaque.textContent = `${rotulo}: `;

    paragrafo.append(
        destaque,
        document.createTextNode(valor)
    );

    return paragrafo;
}