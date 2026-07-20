# SkillMatch Web

Projeto avaliativo desenvolvido por Josiane da França, utilizando HTML, CSS e JavaScript puro.


# Sobre o projeto

O projeto foi desenvolvido como avaliação final do módulo 1 (semanas 7 à 13) do curso "Fundamentos da Programação com JavaScript"

O objetivo era simular um sistema de recrutamento, capaz de analisar o perfil de um candidato e comparar suas habilidades com vagas cadastradas em um arquivo JSON, exibindo o percentual de compatibilidade entre candidato e vaga.

Além da análise, o sistema recomenda a vaga mais adequada e apresenta as habilidades faltantes e que ainda precisam ser desenvolvidas.


## Problema que o sistema resolve

Durante um processo seletivo é comum que um candidato não saiba quais vagas possuem maior compatibilidade com seu perfil.

O SkillMatch Web automatiza essa análise, permitindo:

- cadastrar um candidato;
- informar suas habilidades;
- comparar automaticamente com diversas vagas;
- calcular o percentual de compatibilidade;
- recomendar a vaga mais indicada;
- informar quais habilidades precisam ser estudadas.


#  Tecnologias utilizadas

- HTML
- CSS
- JavaScript


# Funcionalidades

- Cadastro do candidato
- Cadastro da área de atuação
- Cadastro do tempo de experiência
- Cadastro de habilidades
- Leitura das vagas através de JSON
- Comparação automática entre candidato e vagas
- Cálculo do percentual de compatibilidade
- Exibição das habilidades encontradas
- Exibição das habilidades faltantes
- Destaque para a melhor vaga
- Sugestão de estudos
- Salvamento automático utilizando LocalStorage
- Limpeza dos dados do candidato


#  Estrutura do projeto

skillmatch-web/

├── assets/

│   ├── dados/

│   │   └── vagas.json

│   │

│   ├── img/

│   │   └── logo.svg

│   │

│   ├── scripts/

│   │   ├── dados.js

│   │   ├── main.js

│   │   ├── motor.js

│   │   └── ui.js

│   │

│   └── styles/

│       └── index.style.css

│

├── index.html

├── README.md


# Como executar

Clone o repositório:

git clone https://github.com/josianeda-franca-sctec/skillmatch-web.git

Entre na pasta:

cd skillmatch-web

Abra o arquivo "index.html" em qualquer navegador, através do Live server. 


# Melhorias que podem ser aplicadas 

- Cadastro dinâmico de vagas
- Cadastro de candidatos em banco de dados
- Sistema de autenticação
- Área administrativa
- Dashboard com estatísticas
- Exportação do resultado em PDF
- Integração com APIs de recrutamento
- Filtros avançados de vagas


