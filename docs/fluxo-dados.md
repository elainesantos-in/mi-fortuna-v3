# Fluxo de Relacionamento de Dados - Mi Fortuna

> **Regra fundamental:** Os dados **NÃO** são compartilhados. Cada usuário possui seus próprios dados isolados (categorias, formas de pagamento, receitas, despesas e extratos).

## 1. Diagrama de Entidade-Relacionamento (ER)

```mermaid
erDiagram
    USUARIO {
        int id PK
        string nome
        string email
        string senha
        boolean ativo
    }

    CATEGORIA {
        int id PK
        int usuario_id FK
        string nome
        decimal limite_gasto
        boolean ativo
    }

    FORMA_PAGAMENTO {
        int id PK
        int usuario_id FK
        string nome
        string tipo_pagamento
        boolean ativo
    }

    RECEITA {
        int id PK
        int usuario_id FK
        string nome
        decimal valor_salario
        boolean ativo
    }

    DESPESA {
        int id PK
        int usuario_id FK
        int categoria_id FK
        int forma_pagamento_id FK
        string descricao
        decimal valor
        date data_despesa
        boolean ativo
    }

    EXTRATO {
        int id PK
        int usuario_id FK
        int forma_pagamento_id FK
        int despesa_id FK
        string tipo
        decimal valor
        decimal saldo
        date data
    }

    USUARIO ||--o{ CATEGORIA : "cria suas"
    USUARIO ||--o{ FORMA_PAGAMENTO : "cria suas"
    USUARIO ||--o{ RECEITA : "cria suas"
    USUARIO ||--o{ DESPESA : "lanca suas"
    USUARIO ||--o{ EXTRATO : "visualiza seus"

    CATEGORIA ||--o{ DESPESA : "classifica"
    FORMA_PAGAMENTO ||--o{ DESPESA : "paga com"
    FORMA_PAGAMENTO ||--o{ EXTRATO : "gera"
    DESPESA ||--o| EXTRATO : "registra"
```

## 2. Isolamento de Dados por Usuário

```mermaid
flowchart TD
    subgraph USUARIO_A["Usuario A (ex: Elaine)"]
        direction TB
        A_CAT["Categorias da Elaine<br/>Alimentação, Transporte..."]
        A_FP["Formas Pgto da Elaine<br/>Nubank, Dinheiro..."]
        A_REC["Receitas da Elaine<br/>Salário CLT..."]
        A_DESP["Despesas da Elaine"]
        A_EXT["Extrato da Elaine"]
    end

    subgraph USUARIO_B["Usuario B (ex: João)"]
        direction TB
        B_CAT["Categorias do João<br/>Lazer, Educação..."]
        B_FP["Formas Pgto do João<br/>Itaú, Crédito..."]
        B_REC["Receitas do João<br/>Freelance..."]
        B_DESP["Despesas do João"]
        B_EXT["Extrato do João"]
    end

    BANCO[(Banco de Dados<br/>PostgreSQL)]

    USUARIO_A -->|usuario_id = 1| BANCO
    USUARIO_B -->|usuario_id = 2| BANCO

    style USUARIO_A fill:#1a2a3a,stroke:#60a5fa,color:#fff
    style USUARIO_B fill:#2a1a3a,stroke:#c084fc,color:#fff
    style BANCO fill:#1a3a1a,stroke:#4ade80,color:#fff
```

> Todas as consultas (SELECT, UPDATE, DELETE) devem sempre filtrar por `usuario_id` para garantir que um usuário **nunca** acesse dados de outro.

## 3. Fluxo de Implementação (ordem de desenvolvimento)

```mermaid
flowchart TD
    subgraph FASE1["FASE 1 - Cadastros Base (FEITO)"]
        CAT[Categorias<br/>nome, limiteGasto, ativo]
        FP[Formas de Pagamento<br/>nome, tipoPagamento, ativo]
        REC[Receitas<br/>nome, valorSalario, ativo]
    end

    subgraph FASE2["FASE 2 - Usuario e Autenticacao"]
        USR[Criar Cadastro de Usuario<br/>nome, email, senha]
        AUTH[Login / Autenticacao<br/>JWT Token]
        USR --> AUTH
        AUTH -->|adiciona usuario_id| REL[Adicionar usuario_id em<br/>Categoria, FormaPagamento, Receita]
        AUTH -->|filtra por usuario| GUARD[Guard: toda request<br/>valida o token JWT]
    end

    subgraph FASE3["FASE 3 - Despesas"]
        DESP[Lancar Despesas<br/>descricao, valor, data]
        DESP -->|seleciona do proprio usuario| CAT
        DESP -->|seleciona do proprio usuario| FP
    end

    subgraph FASE4["FASE 4 - Extrato"]
        EXT[Extrato por Forma de Pagamento<br/>filtra por periodo e pagamento]
        EXT -->|consulta do proprio usuario| FP
        EXT -->|lista do proprio usuario| DESP
        EXT -->|calcula| SALDO[Saldo = Receitas - Despesas]
        SALDO -->|soma do proprio usuario| REC
    end

    FASE1 --> FASE2
    FASE2 --> FASE3
    FASE3 --> FASE4

    style FASE1 fill:#1a3a1a,stroke:#4ade80,color:#fff
    style FASE2 fill:#1a2a3a,stroke:#60a5fa,color:#fff
    style FASE3 fill:#3a2a1a,stroke:#fbbf24,color:#fff
    style FASE4 fill:#2a1a3a,stroke:#c084fc,color:#fff
```

## 4. Fluxo do Usuario na Aplicacao

```mermaid
flowchart LR
    subgraph ACESSO["Acesso"]
        A[Cadastrar Usuario] --> B[Login]
        B -->|recebe JWT| TOKEN[Token com usuario_id]
    end

    subgraph CADASTROS["Cadastros (dados privados)"]
        TOKEN --> C{Menu Cadastros}
        C --> D[Criar suas Categorias]
        C --> E[Criar suas Formas de Pagamento]
        C --> F[Criar suas Receitas/Salarios]
    end

    subgraph OPERACOES["Operacoes"]
        D & E --> G[Lancar Despesa]
        G -->|seleciona suas categorias| D
        G -->|seleciona suas formas pgto| E
    end

    subgraph CONSULTAS["Consultas"]
        G --> H[Extrato]
        F --> H
        H --> I[Filtrar por Forma de Pagamento]
        H --> J[Filtrar por Periodo]
        I & J --> K[Saldo: suas Receitas - suas Despesas]
    end
```

## 5. Detalhamento da Entidade DESPESA (a implementar)

```mermaid
classDiagram
    class Despesa {
        +int id
        +int usuario_id
        +int categoria_id
        +int forma_pagamento_id
        +String descricao
        +Decimal valor
        +Date data_despesa
        +Boolean ativo
        +criar()
        +listar()
        +atualizar()
        +filtrarPorCategoria()
        +filtrarPorFormaPagamento()
        +filtrarPorPeriodo()
    }

    class Categoria {
        +int id
        +int usuario_id
        +String nome
        +Decimal limiteGasto
        +Boolean ativo
    }

    class FormaPagamento {
        +int id
        +int usuario_id
        +String nome
        +String tipoPagamento
        +Boolean ativo
    }

    class Receita {
        +int id
        +int usuario_id
        +String nome
        +Decimal valorSalario
        +Boolean ativo
    }

    Despesa --> Categoria : categoria_id
    Despesa --> FormaPagamento : forma_pagamento_id
```

> Nota: `usuario_id` em todas as entidades garante que uma Despesa só pode referenciar Categorias e Formas de Pagamento que pertencem ao mesmo usuário.

## 6. Regras de Isolamento por Usuario

```mermaid
flowchart TD
    REQ[Request do Usuario] --> JWT[Extrair usuario_id do JWT]
    JWT --> GUARD{Guard de Autenticacao}

    GUARD -->|token valido| QUERY[Adicionar WHERE usuario_id = X<br/>em TODA consulta]
    GUARD -->|token invalido| DENY[401 Nao Autorizado]

    QUERY --> CREATE[CREATE: insere com usuario_id do token]
    QUERY --> READ[READ: filtra por usuario_id]
    QUERY --> UPDATE[UPDATE: so altera se usuario_id bate]

    CREATE --> DB[(PostgreSQL)]
    READ --> DB
    UPDATE --> DB
```

## 7. Mapa Mental - Como funciona a Autenticacao JWT

```mermaid
flowchart TD
    subgraph CADASTRO["1 - CADASTRO DO USUARIO"]
        direction TB
        POST_CAD["POST /usuarios<br/>{nome, email, senha}"]
        BCRYPT["bcrypt.hash(senha, 10)<br/>transforma '123456' em<br/>'$2b$10$xKz8f...'"]
        SAVE_DB["Salva no banco:<br/>nome, email, senhaHash, ativo"]
        POST_CAD --> BCRYPT --> SAVE_DB
    end

    subgraph LOGIN["2 - LOGIN"]
        direction TB
        POST_LOGIN["POST /auth/login<br/>{email, senha}"]
        BUSCA["Busca usuario pelo email<br/>no banco de dados"]
        COMPARA{"bcrypt.compare()<br/>compara senha digitada<br/>com hash do banco"}
        POST_LOGIN --> BUSCA --> COMPARA

        COMPARA -->|senha BATE| GERA_TOKEN["jwtService.sign()<br/>Gera o Token JWT"]
        COMPARA -->|senha NAO bate| ERRO_401["401 Credenciais invalidas"]

        GERA_TOKEN --> TOKEN_RESP["Retorna:<br/>{access_token: 'eyJhbG...'}"]
    end

    subgraph TOKEN_EXPLAIN["3 - O QUE TEM DENTRO DO TOKEN"]
        direction TB
        TOKEN_PARTS["O token JWT tem 3 partes"]
        HEADER["HEADER<br/>algoritmo: HS256<br/>tipo: JWT"]
        PAYLOAD["PAYLOAD<br/>sub: 1 (id do usuario)<br/>email: elaine@teste.com<br/>exp: quando expira"]
        SIGNATURE["ASSINATURA<br/>criptografia com a<br/>chave secreta do servidor"]
        TOKEN_PARTS --> HEADER
        TOKEN_PARTS --> PAYLOAD
        TOKEN_PARTS --> SIGNATURE
    end

    subgraph GUARD["4 - GUARD (o seguranca)"]
        direction TB
        REQ_CHEGA["Chega uma request<br/>GET /categorias"]
        GUARD_CHECK{"JwtAuthGuard<br/>verifica o header<br/>Authorization: Bearer token"}

        GUARD_CHECK -->|sem token| BLOCK1["401 Token nao fornecido"]
        GUARD_CHECK -->|token invalido/expirado| BLOCK2["401 Token invalido"]
        GUARD_CHECK -->|token valido| DECODE["Decodifica o token<br/>e coloca os dados em<br/>request.usuario"]

        DECODE --> LIBERA["Libera a request<br/>Controller recebe<br/>request.usuario.sub = 1"]
        REQ_CHEGA --> GUARD_CHECK
    end

    subgraph MODULOS["5 - COMO OS MODULOS SE CONECTAM"]
        direction TB
        AUTH_MOD["AuthModule<br/>- exporta JwtModule"]
        CAT_MOD["CategoriasModule<br/>- importa AuthModule"]
        CAT_CTRL["CategoriasController<br/>- usa @UseGuards(JwtAuthGuard)"]
        JWT_SVC["JwtService<br/>- vem do JwtModule<br/>- usado pelo Guard"]

        AUTH_MOD -->|exporta| JWT_SVC
        CAT_MOD -->|importa AuthModule<br/>pra ter acesso ao| JWT_SVC
        CAT_CTRL -->|Guard usa| JWT_SVC
    end

    subgraph FLUXO_COMPLETO["6 - FLUXO COMPLETO DE UMA REQUEST"]
        direction LR
        F1["Frontend envia<br/>GET /categorias<br/>+ Header: Bearer token"]
        F2["Guard intercepta"]
        F3["Valida o token"]
        F4["Extrai usuario_id = 1"]
        F5["Controller recebe"]
        F6["Service busca<br/>WHERE usuario_id = 1"]
        F7["Retorna so as<br/>categorias do usuario"]
        F1 --> F2 --> F3 --> F4 --> F5 --> F6 --> F7
    end

    CADASTRO --> LOGIN
    LOGIN --> TOKEN_EXPLAIN
    TOKEN_EXPLAIN --> GUARD
    GUARD --> MODULOS
    MODULOS --> FLUXO_COMPLETO

    style CADASTRO fill:#1a3a1a,stroke:#4ade80,color:#fff
    style LOGIN fill:#1a2a3a,stroke:#60a5fa,color:#fff
    style TOKEN_EXPLAIN fill:#3a2a1a,stroke:#fbbf24,color:#fff
    style GUARD fill:#3a1a1a,stroke:#f87171,color:#fff
    style MODULOS fill:#2a1a3a,stroke:#c084fc,color:#fff
    style FLUXO_COMPLETO fill:#1a3a3a,stroke:#2dd4bf,color:#fff
```

## 8. Resumo das Fases

| Fase | Funcionalidade | Status |
|------|---------------|--------|
| 1 | Categorias, Formas de Pagamento, Receitas | Feito |
| 2 | Cadastro de Usuario + Autenticacao (JWT) + adicionar `usuario_id` nas entidades existentes | A fazer |
| 3 | Lancamento de Despesas (vinculada ao usuario, categoria e forma pgto) | A fazer |
| 4 | Extrato por Forma de Pagamento (dados apenas do usuario logado) | A fazer |

### Ordem recomendada de implementacao:
1. **Usuario + Auth** - Cria a base de seguranca. Adiciona `usuario_id` como FK em Categoria, FormaPagamento e Receita. Toda operacao passa a exigir JWT
2. **Despesa** - Entidade central que conecta Categoria + Forma de Pagamento, sempre filtrada por `usuario_id`
3. **Extrato** - Consulta que agrega Despesas por Forma de Pagamento vs Receitas, sempre do usuario logado
