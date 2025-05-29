# Meu Projeto

Este projeto é uma loja virtual desenvolvida com foco em aprendizado e prática de desenvolvimento web moderno. A aplicação simula uma experiência completa de e-commerce, com funcionalidades essenciais para o fluxo de navegação, compra e interação do usuário.

## Objetivo

Este projeto foi desenvolvido como parte dos meus estudos para praticar conceitos de front-end, integração com back-end externo, autenticação de usuários e gerenciamento de estado em uma aplicação realista de e-commerce.
O processo de compra é apenas simulado. O projeto não possui integração com sistemas de pagamento como Mercado Pago, Stripe ou PayPal.

## Tecnologias usadas

-  React com TypeScript
-  Firebase (Authentication + Firestore)
-  Axios para consumo da API de produtos
-  Tailwind CSS para estilização
-  React Router para rotas
-  React Context para controle de autenticação
-  React Slick para sliders
-  ViaCEP API para cálculo de entrega por CEP

**Funcionalidades principais:

 -  Busca inteligente de produtos por nome.
 -  Listagem de produtos organizados por categorias e tags.
 -  Cálculo de frete baseado no CEP, utilizando a API dos Correios (ViaCEP).
 -  Sistema de comentários por produto, armazenado no Firebase.
 -  Área de autenticação com login e cadastro de usuários.
 -  Perfil do usuário com visualização de dados pessoais e histórico de pedidos.
 -  Página "Meus pedidos" com listagem de compras realizadas.

## Configurando Firebase Authentication

1.   **Criar e Configurar um Projeto no Firebase**

-   Acesse o Firebase Console.
-   Clique em Adicionar Projeto e siga as instruções para criá-lo.
-   No painel do Firebase, vá até Build → Authentication.
-   Clique na aba Sign-in method.
-   Habilite a opção E-mail/Senha e clique em Salvar.

2.   **Instalar o Firebase no Projeto**

-   npm install firebase

3.   **Configurar o Firebase no Projeto**

-   Vá até Configurações do Projeto → Configuração → Credenciais.
-   Copie o JSON de configuração do Firebase e adicione no seu código:

```javascript

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app);

const secondaryApp = initializeApp(firebaseConfig, "Secondary");
const secondaryAuth = getAuth(secondaryApp);

export { app, auth, db, secondaryAuth, storage };
````

## Configurando Firebase Database

1.   **Criar e Ativar o Firestore no Firebase Console**

-   Acesse o Firebase Console.
-   Selecione seu projeto DevCusto ou crie um novo.
-   No menu esquerdo, clique em Firestore Database (em "Build").
-   Clique em Criar Banco de Dados.
-   Escolha o modo "Modo de Produção" (ou "Modo de Teste" se for para testes).
-   Selecione um local para o banco de dados (pode ser us-central ou outro próximo de sua região).
-   Clique em Criar e aguarde a configuração ser concluída.

2.   **Instalar o Firebase no Projeto**

-   npm install firebase (se não estiver instalado)

3.   **Configurar o Firebase no Projeto (seguir o mesmo passo do item 3 acima)**

-   Vá até Configurações do Projeto → Configuração → Credenciais.
-   Copie o JSON de configuração do Firebase e adicione no seu código:


**Demonstração do projeto**

## Como rodar o projeto

1. Clone este repositório:
   ```bash
    git clone https://github.com/leandroalves-dev/loja-virtual.git

2. Instale as dependências:
   ```bash
   npm install

3. Rode o projeto
    ```bash
    npm run dev
