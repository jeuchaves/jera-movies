# Desafio técnico - JERA: Lista de Filmes

A JERA Movie API é uma aplicação backend desenvolvida para gerenciar uma lista de filmes que o usuário gostaria de assistir. Ela permite que os usuários busquem filmes, marquem como assistidos, visualizem sua lista de filmes e gerenciem seus perfis.

## Funcionalidades

-   **Listar filmes sugeridos**: Recupera uma lista de filmes recomendados.
-   **Marcar como assistido**: Permite que o usuário marque um filme como assistido.
-   **Visualizar lista de filmes para assistir**: Mostra a lista de filmes que o usuário deseja assistir.
-   **Marcar filmes para assistir**: Adiciona um filme à lista de filmes para assistir.
-   **Buscar filmes**: Permite ao usuário procurar filmes por título ou outros critérios.
-   **Listar perfis**: Exibe todos os perfis disponíveis do usuário logado.
-   **Fazer login**: Permite que o usuário faça login na aplicação.
-   **Criar conta**: Permite que um novo usuário se cadastre na aplicação.
-   **Criar perfil**: Permite que o usuário crie um perfil dentro da aplicação.

## Estrutura do projeto

```
.
├── src
    ├── pages
    ├── routes
    ├── shared
        ├── components
        ├── contexts
        ├── environment
        ├── forms
        ├── hooks
        ├── layouts
        ├── services
            ├── api
        ├── themes
    └── App.tsx
    └── index.tsx
└── README.md
```

## Instalação

1. Clone o repositório:

```
git clone https://github.com/jeuchaves/jera-movies
cd jera-movies
code .
```

2. Instale as dependências:

```
npm install
```

3. Configure as variáveis de ambiente:
   Clone o arquivo `.env.example`

4. Inicie a aplicação

```
npm run start
```

6. Sua aplicação estará rodando na porta `3000`. Certifique-se de configurar corretamente as variáveis de ambiente antes de iniciar a aplicação.

## Documentação da API

Para informações completas sobre o projeto inteiro, consulte a [documentação completo do projeto](https://jeuchaves.notion.site/Desafio-T-cnico-Jera-009cfde757b2458fa6ebca34aca2a307?pvs=4)

## Sobre o Autor

### Jeú Chaves

Desenvolvedor apaixonado por tecnologia e inovação, com experiência em criar soluções eficientes e escaláveis. Tenho expertise em desenvolvimento frontend com Vue.js e React, além de habilidades sólidas em backend com Express e gerenciamento de banco de dados.

### Projetos Relevantes:

-   **Sistema de Gerenciamento de Eventos (UFMS)**: Desenvolvido com Vue.js, inclui API backend própria com autenticação, permissões e segurança.
-   **Sistema de Gerenciamento Financeiro (MVP)**: Desenvolvido em React, focado em facilitar o controle financeiro pessoal.

### Experiência:

-   **Frontend**: Vue.js, React
-   **Backend**: Express, Node.js
-   **Ferramentas**: date-fns, Axios, JWT, Knex
-   **Banco de Dados**: PostgreSQL

### Formação:

-   Em reta final da faculdade, com sólida formação em programação e engenharia de software.

### Contato:

-   **LinkedIn**: Seu LinkedIn
-   **GitHub**: Seu GitHub

Estou sempre aberto a novos desafios e oportunidades para contribuir com projetos inovadores.
