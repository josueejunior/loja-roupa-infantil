# 👗 Loja de Roupas Infantil

Uma loja virtual moderna e responsiva de roupas infantis, inspirada em lojas de e-commerce brasileiras.

## ✨ Características

- 🛍️ **Catálogo de Produtos**: Exibição de produtos com imagens, preços e informações detalhadas
- 🔍 **Sistema de Filtros**: Filtre por categoria, cor, tamanho e faixa de preço
- 🛒 **Carrinho de Compras**: Adicione produtos ao carrinho com seleção de tamanho e cor
- 📱 **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- 🎨 **UI Moderna**: Design bonito e intuitivo com gradientes e animações suaves
- 💳 **Informações de Pagamento**: Prazo de pagamento e frete grátis acima de R$ 200,00

## 🚀 Como Executar

### Instalação

```sh
npm install
```

### Desenvolvimento

```sh
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```sh
npm run build
```

## 📁 Estrutura do Projeto

```
loja_infantil/
├── src/
│   ├── components/
│   │   ├── Header.vue          # Cabeçalho com logo e carrinho
│   │   ├── ProductCard.vue      # Card de produto individual
│   │   ├── Filters.vue          # Painel de filtros lateral
│   │   └── ShoppingCart.vue     # Carrinho de compras
│   ├── stores/
│   │   └── cart.js              # Gerenciamento de estado do carrinho
│   ├── data/
│   │   └── products.js           # Dados mockados dos produtos
│   ├── App.vue                  # Componente principal
│   └── main.js                  # Ponto de entrada
└── package.json
```

## 🎯 Funcionalidades Principais

### Produtos
- Listagem de produtos com grid responsivo
- Cards de produtos com imagens, preços e badges (destaque, desconto)
- Modal para seleção de tamanho e cor antes de adicionar ao carrinho
- Ordenação por preço, nome ou data

### Filtros
- Filtro por categoria (Macaquito, Vestido, Calça, etc.)
- Filtro por cor
- Filtro por tamanho
- Filtro por faixa de preço
- Opção para mostrar apenas produtos em estoque

### Carrinho de Compras
- Adicionar produtos com tamanho e cor selecionados
- Alterar quantidade de itens
- Remover itens do carrinho
- Cálculo automático de frete (grátis acima de R$ 200,00)
- Validação de valor mínimo de compra

## 🛠️ Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript reativo
- **Vite** - Build tool e dev server
- **CSS3** - Estilização moderna com gradientes e animações
- **JavaScript ES6+** - Lógica da aplicação

## 📝 Notas

- Os produtos são dados mockados para demonstração
- As imagens são placeholders gerados via placeholder.com
- O sistema de pagamento é simulado (mostra apenas um alerta)

## 🎨 Paleta de Cores

- **Rosa Principal**: `#ff6b9d`
- **Rosa Escuro**: `#c44569`
- **Fundo**: `#f5f5f5`
- **Texto**: `#333`

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)
