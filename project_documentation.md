# Projeto de Desenvolvimento de Sistema: Estudo de Caso

## 1. Definição do Cenário da Empresa Fictícia

### 1.1. Cenário da Empresa: "LogiTrack - Soluções de Rastreamento e Logística"

A **LogiTrack** é uma empresa fictícia especializada na gestão e rastreamento de cargas para pequenas e médias transportadoras. Seu principal desafio é oferecer uma plataforma web simplificada que permita aos clientes (transportadoras) registrar, monitorar e atualizar o status de suas remessas em tempo real.

O sistema corporativo da LogiTrack visa digitalizar o processo de gestão de remessas, substituindo planilhas e comunicações manuais por um sistema centralizado e acessível via web.

### 1.2. Implementação Web e Arquitetura em Três Camadas (MVC)

O sistema será implementado em Java, utilizando o framework **Spring Boot** para o *back-end* e tecnologias web padrão (**HTML5, CSS3, JavaScript**) para o *front-end*. A arquitetura seguirá rigorosamente o padrão em três camadas, que se alinha ao padrão Model-View-Controller (MVC):

| Camada (Arquitetura) | Componente (MVC) | Descrição e Tecnologias |
| :--- | :--- | :--- |
| **Persistência** | **Modelo** | Responsável pela comunicação com o banco de dados relacional (MariaDB/PostgreSQL). Utilizará o **Spring Data JPA** para mapeamento objeto-relacional e gerenciamento das entidades (`Entities` e `Repositories`). |
| **Negócios** | **Controle** | Contém a lógica de negócios e as regras de validação. Implementada através de `Services` (Camada de Serviço) que orquestram as operações e utilizam os `Repositories` da camada de Persistência. |
| **Aplicação** | **Visão** | A interface do usuário. Será desenvolvida com **HTML5, CSS3 e JavaScript** puro. O front-end consumirá os serviços do back-end através de requisições **API REST** (JSON). |

## 2. Apresentação da Proposta de Desenvolvimento do Sistema

O projeto será estruturado em um único módulo Maven, seguindo a convenção de projetos Spring Boot, mas com uma clara separação lógica e física das responsabilidades das três camadas.

### 2.1. Estrutura do Projeto

A estrutura de pacotes no *back-end* (Java) refletirá as camadas propostas:

```
com.logitrack.sistema
├── controller/        # Camada de Aplicação (Recebe requisições HTTP e chama a camada de Negócios)
├── service/           # Camada de Negócios (Lógica de negócio, validações)
├── repository/        # Camada de Persistência (Interfaces de acesso ao banco de dados)
└── model/             # Camada de Persistência (Entidades JPA)
```

### 2.2. Componentes por Camada

| Camada | Componentes Principais | Responsabilidades |
| :--- | :--- | :--- |
| **Aplicação (Controller)** | `RemessaController`, `AuthController` | Expor a API REST (endpoints), receber e responder requisições HTTP, converter dados (DTOs). |
| **Negócios (Service)** | `RemessaService`, `AuthService` | Implementar as regras de negócio (ex: calcular prazo de entrega, validar status), gerenciar transações, chamar a camada de Persistência. |
| **Persistência (Model/Repository)** | `Remessa`, `Usuario`, `RemessaRepository`, `UsuarioRepository` | Mapear objetos para o banco de dados, executar operações CRUD (Create, Read, Update, Delete). |

## 3. Definindo as Transações da Empresa

O foco do sistema é a gestão de remessas. A principal entidade será a **Remessa**.

### 3.1. Transações Principais

1.  **Autenticação de Usuário:** Login e geração de token (se necessário).
2.  **Cadastro de Remessa:** Registrar uma nova carga no sistema.
3.  **Consulta de Remessas:** Listar todas as remessas ou buscar por ID/código de rastreio.
4.  **Atualização de Status:** Modificar o status de uma remessa (ex: "Em Trânsito", "Entregue").
5.  **Autorização:** Garantir que apenas usuários autorizados possam realizar certas operações (ex: apenas um administrador pode deletar uma remessa).

### 3.2. Exemplo de Caso de Uso: "Registrar Nova Remessa"

**Nome do Caso de Uso:** UC-001: Registrar Nova Remessa
**Ator Principal:** Usuário LogiTrack (Funcionário da Transportadora)
**Objetivo:** Inserir uma nova remessa no sistema para rastreamento.

| Passo | Ação do Ator | Resposta do Sistema |
| :--- | :--- | :--- |
| 1 | O Ator acessa a página de cadastro de remessas. | O Sistema exibe o formulário de cadastro. |
| 2 | O Ator preenche os campos obrigatórios (Origem, Destino, Peso, Cliente, Descrição). | |
| 3 | O Ator clica no botão "Registrar". | O Sistema valida os dados. |
| 4 | **(Sucesso)** Se os dados forem válidos, o Sistema gera um código de rastreio único, persiste a nova `Remessa` no banco de dados e retorna uma mensagem de sucesso. |
| 5 | **(Falha)** Se os dados forem inválidos (ex: campo obrigatório vazio), o Sistema exibe uma mensagem de erro específica. |

## 4. Requisitos Mínimos Atendidos

O projeto atenderá aos requisitos mínimos solicitados:

| Requisito | Atendimento no Projeto |
| :--- | :--- |
| **Autenticação** | Implementação de um endpoint de login (`/auth/login`) e validação de credenciais. |
| **Autorização** | Uso de mecanismos de segurança (Spring Security) para proteger endpoints críticos (ex: apenas usuários com perfil `ADMIN` podem cadastrar). |
| **Transações** | O Caso de Uso "Registrar Nova Remessa" e a "Atualização de Status" representam as transações de negócio. |
| **Persistência** | Uso de MariaDB/PostgreSQL e Spring Data JPA para persistir as entidades `Remessa` e `Usuario`. |
| **Consultas e Relatórios** | Endpoint para listar todas as remessas (`GET /api/remessas`) e buscar por ID (`GET /api/remessas/{id}`). |

---
*Documento gerado por Manus AI para o Projeto de Desenvolvimento de Sistemas Corporativos.*

## Referências

[1] Spring Boot. Disponível em: https://spring.io/projects/spring-boot
[2] Apache Maven. Disponível em: https://maven.apache.org/
[3] Java Persistence API (JPA).
[4] Padrão Model-View-Controller (MVC).
