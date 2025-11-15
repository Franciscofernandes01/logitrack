LogiTrack – Sistema de Gestão de Remessas

Projeto de Desenvolvimento de Sistemas Corporativos

Este projeto foi desenvolvido como Estudo de Caso para a disciplina
“Desenvolvimento de Sistemas Corporativos”, cumprindo todos os
requisitos solicitados para implementação de um sistema corporativo
simplificado utilizando Java, Spring Boot e arquitetura MVC em três
camadas.

------------------------------------------------------------------------

1. Requisitos de Ambiente

O sistema foi configurado para executar no ambiente solicitado:

-   IDE: Eclipse (ou qualquer IDE compatível com Maven).
-   Gerenciador de Dependências: Maven.
-   Servidor Web: Tomcat embutido no Spring Boot.
-   Banco de Dados: H2 Database (em memória).
-   Framework: Spring Boot 3.2.0.
-   Linguagem: Java 17 ou superior.

------------------------------------------------------------------------

2. Arquitetura do Sistema (MVC e 3 Camadas)

O sistema segue a arquitetura em três camadas alinhada ao padrão
Model-View-Controller (MVC):

  ------------------------------------------------------------------------------
  Camada           Componentes                                Descrição
  ---------------- ------------------------------------------ ------------------
  Persistência     model/ e repository/                       Entidades JPA e
                                                              repositórios
                                                              Spring Data JPA.

  Negócios         service/                                   Lógica de negócio
                                                              e transações (ex.:
                                                              RemessaService).

  Aplicação        controller/ + Front-end (HTML/CSS/JS)      API REST e
                                                              interface acessada
                                                              pelo navegador.
  ------------------------------------------------------------------------------

------------------------------------------------------------------------

3. Como Executar o Projeto

3.1 Compilação e Execução (via Maven)

No terminal, dentro do diretório raiz do projeto:

cd logitrack mvn clean install mvn spring-boot:run

O servidor iniciará na porta 8080.

------------------------------------------------------------------------

3.2 Acesso ao Sistema

Após a execução, acesse:

http://localhost:8080/

A aplicação solicitará autenticação antes de mostrar o painel de gestão.

------------------------------------------------------------------------

3.3 Credenciais de Acesso

Autenticação HTTP Basic configurada em SecurityConfig.java:

  Usuário   Senha       Perfil
  --------- ----------- --------
  user      password    USER
  admin     adminpass   ADMIN

------------------------------------------------------------------------

4. Funcionalidades Implementadas

O sistema atende aos requisitos mínimos da disciplina:

Autenticação e Autorização

-   Implementada com Spring Security (HTTP Basic).
-   Perfis USER e ADMIN com permissões distintas.

Transações da Empresa

-   Cadastro de Remessa: POST /api/remessas
-   Atualização de Status: PUT /api/remessas/{id}/status

Persistência

-   Entidades Remessa e Usuario.
-   Banco H2 configurado em application.properties.

Consultas e Relatórios

-   Listagem de remessas: GET /api/remessas
-   Exibição em tabela no front-end.

------------------------------------------------------------------------

5. Estrutura do Projeto

logitrack/ ├── src/main/java/com/logitrack │ ├── controller/ │ ├──
service/ │ ├── repository/ │ └── model/ ├── src/main/resources/ │ └──
application.properties ├── pom.xml └── README.md

------------------------------------------------------------------------

6. Observações Finais

O projeto foi desenvolvido com boas práticas de organização,
modularização e separação de responsabilidades.
Ele está pronto para ser executado no Eclipse, bastando importar como
projeto Maven ou clonar e rodar o comando mvn spring-boot:run.



