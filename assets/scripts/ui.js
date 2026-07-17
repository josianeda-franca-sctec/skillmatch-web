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
    elemento.innerHTML = `
            <p>
                Nenhuma vaga foi encontrada.
            </p>
        `;

    return;
  }

  resultados.forEach((resultado) => {
    const artigo = document.createElement("article");

    artigo.classList.add("cartao-vaga");
    if (resultado.percentual >= 75) {
      artigo.classList.add("compatibilidade-alta");
    } else if (resultado.percentual >= 50) {
      artigo.classList.add("compatibilidade-media");
    } else {
      artigo.classList.add("compatibilidade-baixa");
    }
    
    artigo.innerHTML = `
            <h3>${resultado.vaga.cargo}</h3>

            <p>
                <strong>Empresa:</strong>
                ${resultado.vaga.empresa}
            </p>

            <p>
                <strong>Modalidade:</strong>
                ${resultado.vaga.modalidade}
            </p>

            <p>
                <strong>Nível:</strong>
                ${resultado.vaga.nivel}
            </p>

            <p>
                <strong>Salário:</strong>
                R$ ${Number(resultado.vaga.salario).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
            </p>

            <p>
                <strong>Requisitos:</strong>
                ${resultado.vaga.requisitos.join(", ")}
            </p>

            <p>
                <strong>Compatibilidade:</strong>
                ${resultado.percentual}%
            </p>

            <p>
                <strong>Classificação:</strong>
                ${resultado.classificacao}
            </p>
        `;

    elemento.appendChild(artigo);
  });
}
