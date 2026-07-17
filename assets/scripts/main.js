import { VagaFrontEnd } from "./motor.js";

const vagaTeste = new VagaFrontEnd(
    1,
    "TechStart",
    "Desenvolvedor Front-End Júnior",
    ["HTML", "CSS", "JavaScript", "GitHub"],
    3500,
    "Remoto",
    "Júnior"
);

const habilidadesTeste = [
    "HTML",
    "CSS",
    "JavaScript",
    "GitHub"
    ];

const percentual = vagaTeste.calcularCompatibilidade(
    habilidadesTeste
);

const classificacao = vagaTeste.classificarCompatibilidade(
    percentual
);

console.log(vagaTeste);
console.log(vagaTeste.apresentarResumo());
console.log(`Compatibilidade: ${percentual}%`);
console.log(`Classificação: ${classificacao}`);