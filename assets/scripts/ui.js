export function prepararHabilidades(valor) {
    return valor
        .split(",")
        .map((habilidade) => habilidade.trim())
        .filter((habilidade) => habilidade !== "");
}

export function exibirMensagem(elemento, texto) {
    elemento.textContent = texto;
}

export function exibirPerfil(
    elemento,
    candidato
) {
    elemento.innerHTML = "";
    elemento.hidden = false;

    const titulo = document.createElement("h3");

    titulo.textContent = "Perfil analisado";

    const nome = criarParagrafo(
        "Nome",
        candidato.nome
    );

    const area = criarParagrafo(
        "Área",
        candidato.area
    );

    const experiencia = criarParagrafo(
        "Experiência",
        formatarExperiencia(candidato.experienciaMeses)
    );

    const nivel = criarParagrafo(
        "Nível",
        candidato.nivel
    );

    const habilidades = criarParagrafo(
        "Habilidades",
        candidato.habilidades.join(", ")
    );

    elemento.append(
        titulo,
        nome,
        area,
        experiencia,
        nivel,
        habilidades
    );
}

export function exibirMelhorVaga(
    elemento,
    melhorResultado
) {
    elemento.innerHTML = "";

    if (!melhorResultado) {
        elemento.hidden = true;
        return;
    }

    elemento.hidden = false;

    const titulo = document.createElement("h3");

    titulo.textContent = "Melhor vaga encontrada";

    const descricao = document.createElement("p");

    descricao.textContent =
        melhorResultado.vaga.obterDescricao();

    const percentual = criarParagrafo(
        "Compatibilidade",
        `${melhorResultado.percentual}%`
    );

    const recomendacao = document.createElement("p");
    const destaque = document.createElement("strong");

    destaque.textContent = "Recomendação de estudo: ";

    recomendacao.appendChild(destaque);

    if (melhorResultado.faltantes.length === 0) {
        recomendacao.append(
            document.createTextNode(
                "Seu perfil atende a todos os requisitos desta vaga. Continue praticando e desenvolvendo projetos."
            )
        );
    } else {
        recomendacao.append(
            document.createTextNode(
                `Priorize ${melhorResultado.faltantes.join(
                    ", "
                )} para aumentar sua compatibilidade.`
            )
        );
    }

    elemento.append(
        titulo,
        descricao,
        percentual,
        recomendacao
    );
}

export function exibirVagas(
    elemento,
    resultados,
    idMelhorVaga
) {
    elemento.innerHTML = "";

    if (resultados.length === 0) {
        const mensagem = document.createElement("p");

        mensagem.classList.add("estado-inicial");
        mensagem.textContent = "Nada encontrado.";

        elemento.appendChild(mensagem);

        return;
    }

    resultados.forEach((resultado, indice) => {
        const artigo = document.createElement("article");

        artigo.classList.add("cartao-vaga");

        if (resultado.vaga.id === idMelhorVaga) {
            artigo.classList.add("cartao-melhor-vaga");
        }

        adicionarClasseCompatibilidade(
            artigo,
            resultado.percentual
        );

        const idTitulo =
            `vaga-${resultado.vaga.id}-${indice}`;

        artigo.setAttribute(
            "aria-labelledby",
            idTitulo
        );

        const titulo = document.createElement("h3");

        titulo.id = idTitulo;
        titulo.textContent = resultado.vaga.cargo;

        if (resultado.vaga.id === idMelhorVaga) {
            const selo = document.createElement("span");

            selo.classList.add("selo-melhor-vaga");
            selo.textContent = "Melhor vaga";

            artigo.appendChild(selo);
        }

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

        const stack = criarParagrafo(
            "Stack",
            resultado.vaga.stack
        );

        const salario = criarParagrafo(
            "Salário",
            formatarSalario(resultado.vaga.salario)
        );

        const compatibilidade = criarParagrafo(
            "Compatibilidade",
            `${resultado.percentual}%`
        );

        compatibilidade.classList.add(
            "percentual-compatibilidade"
        );

        const classificacao = criarParagrafo(
            "Classificação",
            resultado.classificacao
        );

        const encontradas = criarListaHabilidades(
            "Habilidades encontradas",
            resultado.encontradas,
            "Nenhuma habilidade encontrada."
        );

        const faltantes = criarListaHabilidades(
            "Habilidades faltantes",
            resultado.faltantes,
            "Nenhuma habilidade faltante."
        );

        artigo.append(
            titulo,
            empresa,
            modalidade,
            nivel,
            stack,
            salario,
            compatibilidade,
            classificacao,
            encontradas,
            faltantes
        );

        elemento.appendChild(artigo);
    });
}

function adicionarClasseCompatibilidade(
    elemento,
    percentual
) {
    if (percentual >= 80) {
        elemento.classList.add(
            "compatibilidade-alta"
        );

        return;
    }

    if (percentual >= 50) {
        elemento.classList.add(
            "compatibilidade-media"
        );

        return;
    }

    elemento.classList.add(
        "compatibilidade-baixa"
    );
}

function criarParagrafo(rotulo, valor) {
    const paragrafo = document.createElement("p");
    const destaque = document.createElement("strong");

    destaque.textContent = `${rotulo}: `;

    paragrafo.append(
        destaque,
        document.createTextNode(String(valor))
    );

    return paragrafo;
}

function criarListaHabilidades(
    titulo,
    habilidades,
    mensagemVazia
) {
    const container = document.createElement("div");
    const subtitulo = document.createElement("h4");

    subtitulo.textContent = titulo;

    container.appendChild(subtitulo);

    if (habilidades.length === 0) {
        const paragrafo = document.createElement("p");

        paragrafo.textContent = mensagemVazia;

        container.appendChild(paragrafo);

        return container;
    }

    const lista = document.createElement("ul");

    habilidades.forEach((habilidade) => {
        const item = document.createElement("li");

        item.textContent = habilidade;

        lista.appendChild(item);
    });

    container.appendChild(lista);

    return container;
}

function formatarSalario(valor) {
    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}

function formatarExperiencia(meses) {
    const quantidade = Number(meses);

    if (quantidade === 0) {
        return "Sem experiência profissional";
    }

    if (quantidade === 1) {
        return "1 mês";
    }

    return `${quantidade} meses`;
}