# ClinSchool - Aplicação Web Clinca Escola de Psicologia
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/AllisonSBahls/clinica-escola/blob/master/LICENSE) 

# Sobre o projeto

https://clinschool.herokuapp.com/

O ClinSchool é uma aplicação Node.js com Template EJS com foco em no gerenciamento de clínicas escolas de psicologia, desenvolvido como Trabalho de Conclusão de Curso em Análise e Desenvolvimento de Sistemas.

A aplicação consiste no agendamento de consultas utilizando o calendário dentro dos sitema, com diferentes niveis de acesso, como acesso de Paciente, Estagiário, Secretária e Professor, cada com acesso apenas as suas informações.

# Funcionalidades
```bash
Gerenciamento do paciente.
Gerenciamento do supervisor.
Verificar o Relatório.
Confirmar as presenças.
Gerenciamento do estagiário.
Envio de Relatórios por meio do sistema.
Registrar frequências.
Acesso com autenticação definidos por níveis de permissão.
Acesso por conta do google (Disponível apenas para pacientes).
Cada tipo de permissão tem uma tela diferente.
Pacientes podem realizar o próprio registro.
Marcar consulta.</li>
O paciente pode fazer um agendamento na própria casa.
Informações totalmente criptografadas no banco de dados.
Facilidade em encontrar as consultas.
Cada usuário tem acesso apenas às suas informações e aos atendimentos .que tenha vínculo.
Diversos modos de ver as consultas.
Por Semana.
Por Dia.
Por Mês.
Filtrar as consultas por nome, data ou ambos.
Ver apenas as consultas no intervalo de dias.
Colocar o paciente na lista de espera.
Gerenciamento geral das consultas ou agendamentos.
```

## Layout web
![Web 1](https://github.com/AllisonSBahls/clinica-escola/blob/master/app/public/img/doc/Sem%20t%C3%ADtulo.png)

![Web 2](https://github.com/AllisonSBahls/clinica-escola/blob/master/app/public/img/doc/2.png)

## Arquitetura Cliente Servidor (MVC)
![Arquitetura Cliente Servidor (MVC)](https://github.com/AllisonSBahls/clinica-escola/blob/master/app/public/img/doc/Arquitetura.JPG)

# Tecnologias utilizadas
## Aplicação Web
- Node.js
- Template EJS
- Passport para autenticação
- Sequelize ORM
- FullCalendar
- UML

## Implantação em produção
- Heroku
- Banco de dados: MySQL

# Como executar o projeto
## Pré-requisitos: Nodem, Mysql
(Desatualizado)
```bash
# clonar repositório
git clone https://github.com/AllisonSBahls/clinica-escola

# Base de Dados 
Criar uma base de dados com o nome “dbclinica” no MySQL

# Rode no CMD os seguintes comandos
# para instalar todos os módulos e bibliotecas utilizados pela aplicação
npm i ou npm install
#Para criar as tabelas do banco de dados "dbclinica" e logo em seguida e validação das funções
npm test 

Por fim para executar o projeto, na pasta principal do projeto rode o comando node app.js. Após isso basta acessar http://localhost:4000.
```

# Autor

Allison Sousa Bahls
https://www.linkedin.com/in/allison-sousa-289073107/


