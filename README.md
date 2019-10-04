# Challenge backend Bossabox - VUTTR API
API VUTTR (Very Useful Tools to Remember), um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags. Utilizando [NodeJS](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/), autenticação via token JWT e o [Swagger](https://swagger.io/) para documentação da API.

### Se registrando e fazendo a autorização
![register-user](https://user-images.githubusercontent.com/5490660/66173008-866cd000-e624-11e9-8924-ad37ba13da91.gif)

### Buscando as ferramentas
![get-tools](https://user-images.githubusercontent.com/5490660/66173082-d64b9700-e624-11e9-9969-f42477e879a0.gif)

### Acesso
 * Local: http://localhost:3000/swagger
 * Heroku: https://challenge-vuttr-reginaldo.herokuapp.com/swagger
  
### Base path
 * /vuttr-api
   
### Endpoints
 * /register: POST
 * /authenticate: POST
 * /tools: GET tools 
 * /tools: POST tool
 * /tools/{id}: GET tool by ID
 * /tools/{id}: PUT tool
 * /tools/{id}: DELETE tool

### Setup
1. Clonar e acessar o repositório
```
git clone https://github.com/reginaldolribeiro/challenge-vuttr-reginaldo.git
cd challenge-vuttr-reginaldo
```
2. Criar o arquivo .env na raiz do projeto (com base no .env.example), com suas configurações de URL de conexão com o MongoDB e a APP_SECRET de sua preferência, utilizada para o token JWT.

3. Subir a API com o [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
```
docker-compose up
```

### Dependências 
 * [NodeJS](https://nodejs.org/en/)
 * [Yarn](https://yarnpkg.com/pt-BR/)
 * [Express](https://expressjs.com/pt-br/)
 * [Mongoose](https://mongoosejs.com/)
 * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
 
