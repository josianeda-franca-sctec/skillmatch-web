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
        if (!Array.isArray(habilidadesCandidato)) {
            return 0;
        }

        if (this.requisitos.length === 0) {
            return 0;
        }

        const habilidadesNormalizadas = habilidadesCandidato.map(
            normalizarTexto
        );

        const requisitosAtendidos = this.requisitos.filter((requisito) => {
            const requisitoNormalizado = normalizarTexto(requisito);

            return habilidadesNormalizadas.includes(requisitoNormalizado);
        });

        const percentual =
            (requisitosAtendidos.length / this.requisitos.length) * 100;

        return Math.round(percentual);
    }

    classificarCompatibilidade(percentual) {
        if (percentual >= 75) {
            return "Alta compatibilidade";
        }

        if (percentual >= 50) {
            return "Média compatibilidade";
        }

        return "Baixa compatibilidade";
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
        nivel
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
    }

    apresentarResumo() {
        return `${this.cargo} na empresa ${this.empresa}`;
    }
}