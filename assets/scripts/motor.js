export function normalizarTexto(texto) {
    return String(texto)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

export class Vaga {
    constructor(
        id,
        empresa,
        cargo,
        requisitos,
        salario,
        modalidade,
        nivel
    ) {
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
        this.nivel = nivel;
    }

    calcularCompatibilidade(habilidadesCandidato) {
        if (
            !Array.isArray(habilidadesCandidato) ||
            !Array.isArray(this.requisitos) ||
            this.requisitos.length === 0
        ) {
            return {
                percentual: 0,
                encontradas: [],
                faltantes: [...this.requisitos]
            };
        }

        const habilidadesNormalizadas =
            habilidadesCandidato.map(normalizarTexto);

        const encontradas = this.requisitos.filter(
            (requisito) => {
                const requisitoNormalizado =
                    normalizarTexto(requisito);

                return habilidadesNormalizadas.includes(
                    requisitoNormalizado
                );
            }
        );

        const faltantes = this.requisitos.filter(
            (requisito) => {
                const requisitoNormalizado =
                    normalizarTexto(requisito);

                return !habilidadesNormalizadas.includes(
                    requisitoNormalizado
                );
            }
        );

        const percentual = Math.round(
            (encontradas.length / this.requisitos.length) * 100
        );

        return {
            percentual,
            encontradas,
            faltantes
        };
    }

    classificarCompatibilidade(percentual) {
        if (percentual >= 80) {
            return "Alta compatibilidade";
        }

        if (percentual >= 50) {
            return "Média compatibilidade";
        }

        return "Baixa compatibilidade";
    }

    obterDescricao() {
        return `${this.cargo} na empresa ${this.empresa}`;
    }
}

export class VagaFrontEnd extends Vaga {
    constructor(
        id,
        empresa,
        cargo,
        requisitos,
        salario,
        modalidade,
        nivel,
        stack
    ) {
        super(
            id,
            empresa,
            cargo,
            requisitos,
            salario,
            modalidade,
            nivel
        );

        this.area = "Front-End";
        this.stack = stack;
    }

    // A subclasse sobrescreve o método para incluir informações
    // específicas das vagas de Front-End.
    obterDescricao() {
        return `${this.cargo} na empresa ${this.empresa}, com foco em ${this.stack}`;
    }
}

export function criarContadorDeAnalises() {
    let quantidade = 0;

    // Esta função mantém acesso à variável quantidade,
    // caracterizando uma closure.
    return function registrarAnalise() {
        quantidade += 1;

        return quantidade;
    };
}