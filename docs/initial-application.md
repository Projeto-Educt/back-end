# Incializando aplicação sem docker

- Configure as variaveis de ambiente:
  - `.env`: para produção  
  - `.env.dev`: para desenvolvimento  
  - `.env.test`: para testes  

*Para ambientes de desenvolvimento e testes é necessário declarar o NODE_ENV, para produção não é necessário*
```bash
# development
$ NODE_ENV=dev npm run start

# watch mode
$ NODE_ENV=dev npm run start:dev

# production mode
$ npm run start:prod
```

# Inicialização da aplicação com Doker
 
- O compose já cria o postgresql, declara as variaveis de ambiente necessárias para conexão, além do NODE_ENV=dev 
- Outras variaveis devem ser preenchidas (.env.example na raiz) 

```bash
# Constrói e inicia os containers da aplicação e postgresql.
$ npm run dev:build 

# Roda a aplicação se a imagem já tiver sido construída.
$ npm run dev

# Encerra o docker compose com a aplicação e db.
$ npm run dev:kill
```