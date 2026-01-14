# Docker - Loja Infantil

Este projeto está configurado para rodar em Docker na porta **8025**.

## Pré-requisitos

- Docker instalado
- Docker Compose instalado (geralmente vem com Docker Desktop)

## Como usar

### Opção 1: Usando Docker Compose (Recomendado)

```bash
# Construir e iniciar o container
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar o container
docker-compose down
```

### Opção 2: Usando Docker diretamente

```bash
# Construir a imagem
docker build -t loja-infantil .

# Rodar o container
docker run -d -p 8025:8025 --name loja-infantil loja-infantil

# Ver logs
docker logs -f loja-infantil

# Parar o container
docker stop loja-infantil

# Remover o container
docker rm loja-infantil
```

## Acessar a aplicação

Após iniciar o container, acesse:

**http://localhost:8025**

## Comandos úteis

```bash
# Reconstruir após mudanças no código
docker-compose up -d --build

# Ver status dos containers
docker-compose ps

# Entrar no container (para debug)
docker exec -it loja-infantil sh

# Remover tudo (containers, imagens, volumes)
docker-compose down -v
docker rmi loja-infantil
```

## Estrutura

- **Dockerfile**: Multi-stage build (Node.js para build + Nginx para produção)
- **docker-compose.yml**: Configuração do serviço
- **nginx.conf**: Configuração do servidor web (porta 8025)
- **.dockerignore**: Arquivos ignorados no build

## Notas

- A aplicação é buildada dentro do container
- Nginx serve os arquivos estáticos na porta 8025
- O roteamento SPA está configurado (todas as rotas vão para index.html)
- Cache de assets estáticos configurado para 1 ano

