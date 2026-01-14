<template>
  <div class="app">
    <Header 
      @search="handleSearch"
      :search-query="searchQuery"
    />
    
    <div class="main-container">
      <Filters @filter-change="handleFilterChange" />
      
      <div class="products-section">
        <div class="products-header">
          <div class="header-left">
            <h2>Produtos</h2>
            <span class="products-count" v-if="filteredProducts.length > 0">
              {{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados' }}
            </span>
          </div>
          <div class="sort-controls">
            <label>Ordenar por:</label>
            <select v-model="sortBy" @change="applySorting" class="sort-select">
              <option value="price-asc">Preço: menor ao maior</option>
              <option value="price-desc">Preço: maior ao menor</option>
              <option value="name-asc">A - Z</option>
              <option value="name-desc">Z - A</option>
              <option value="newest">Mais novo ao mais antigo</option>
              <option value="oldest">Mais antigo ao mais novo</option>
            </select>
          </div>
        </div>
        
        <div v-if="filteredProducts.length === 0" class="no-products">
          <div class="no-products-content">
            <div class="no-products-icon">🔍</div>
            <p v-if="searchQuery">
              Nenhum produto encontrado para "{{ searchQuery }}".
            </p>
            <p v-else>
              Nenhum produto encontrado com os filtros selecionados.
            </p>
            <button class="clear-filters-link" @click="clearAllFilters">
              Limpar filtros e ver todos os produtos
            </button>
          </div>
        </div>
        
        <div v-else class="products-grid">
          <ProductCard 
            v-for="product in paginatedProducts" 
            :key="product.id"
            :product="product"
            @added-to-cart="showAddedToCartMessage"
          />
        </div>
        
        <div v-if="totalPages > 1" class="pagination">
          <button 
            class="page-btn nav-btn"
            :disabled="currentPage === 1"
            @click="currentPage = currentPage - 1"
            title="Página anterior"
          >
            ‹
          </button>
          <template v-for="page in visiblePages" :key="page">
            <button 
              v-if="page !== '...'"
              class="page-btn"
              :class="{ active: currentPage === page }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <span v-else class="page-btn ellipsis">...</span>
          </template>
          <button 
            class="page-btn nav-btn"
            :disabled="currentPage === totalPages"
            @click="currentPage = currentPage + 1"
            title="Próxima página"
          >
            ›
          </button>
        </div>
      </div>
    </div>
    
    <ShoppingCart :is-open="cartStore.isCartOpen.value" @close="cartStore.closeCart" />
    
    <Footer />
    
    <WhatsAppButton />
    
    <Transition name="toast">
      <div v-if="showCartMessage" class="cart-message">
        <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Adicionado ao carrinho!</span>
      </div>
    </Transition>
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Header from './components/Header.vue';
import ProductCard from './components/ProductCard.vue';
import Filters from './components/Filters.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import Footer from './components/Footer.vue';
import WhatsAppButton from './components/WhatsAppButton.vue';
import { products } from './data/products';
import { useCartStore } from './stores/cart';

const cartStore = useCartStore();
const showCartMessage = ref(false);
const sortBy = ref('newest');
const currentPage = ref(1);
const itemsPerPage = 12;
const searchQuery = ref('');

const filters = ref({
  categories: [],
  colors: [],
  sizes: [],
  minPrice: null,
  maxPrice: null,
  onlyInStock: false
});

const handleFilterChange = (newFilters) => {
  filters.value = newFilters;
  currentPage.value = 1;
};

const filteredProducts = computed(() => {
  let result = [...products];
  
  // Filter by search query
  if (searchQuery.value && searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.colors.some(color => color.toLowerCase().includes(query))
    );
  }
  
  // Filter by category
  if (filters.value.categories && filters.value.categories.length > 0) {
    result = result.filter(p => filters.value.categories.includes(p.category));
  }
  
  // Filter by color
  if (filters.value.colors && filters.value.colors.length > 0) {
    result = result.filter(p => 
      p.colors.some(color => filters.value.colors.includes(color))
    );
  }
  
  // Filter by size
  if (filters.value.sizes && filters.value.sizes.length > 0) {
    result = result.filter(p => 
      p.sizes.some(size => filters.value.sizes.includes(size))
    );
  }
  
  // Filter by price
  if (filters.value.minPrice !== null && filters.value.minPrice !== undefined) {
    result = result.filter(p => p.price >= filters.value.minPrice);
  }
  if (filters.value.maxPrice !== null && filters.value.maxPrice !== undefined) {
    result = result.filter(p => p.price <= filters.value.maxPrice);
  }
  
  // Filter by stock
  if (filters.value.onlyInStock) {
    result = result.filter(p => p.inStock);
  }
  
  return result;
});

const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value];
  
  switch (sortBy.value) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'oldest':
      return sorted.sort((a, b) => a.id - b.id);
    default:
      return sorted;
  }
});

const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / itemsPerPage);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  if (total <= 7) {
    // Mostrar todas as páginas se houver 7 ou menos
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Lógica para mostrar páginas com ellipsis
    if (current <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    }
  }
  
  return pages;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedProducts.value.slice(start, end);
});

const applySorting = () => {
  currentPage.value = 1;
};

const showAddedToCartMessage = () => {
  showCartMessage.value = true;
  setTimeout(() => {
    showCartMessage.value = false;
  }, 3000);
};

let searchTimeout = null;

const handleSearch = (query) => {
  // Debounce da busca
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  searchTimeout = setTimeout(() => {
    searchQuery.value = query;
    currentPage.value = 1;
  }, 300);
};

const clearAllFilters = () => {
  filters.value = {
    categories: [],
    colors: [],
    sizes: [],
    minPrice: null,
    maxPrice: null,
    onlyInStock: false
  };
  searchQuery.value = '';
  currentPage.value = 1;
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
  /* Fundo colorido e alegre com cara de crianças */
  background:
    /* Textura granulada suave */
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.015) 0px,
      transparent 1px,
      transparent 2px,
      rgba(0, 0, 0, 0.015) 3px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.015) 0px,
      transparent 1px,
      transparent 2px,
      rgba(0, 0, 0, 0.015) 3px
    ),
    /* Efeito de ruído pontilhado */
    radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.08) 1px, transparent 0),
    /* Círculos suaves e delicados - Rosa pastel */
    radial-gradient(circle at 15% 25%, rgba(255, 228, 240, 0.25) 0, transparent 60%),
    /* Azul claro muito suave */
    radial-gradient(circle at 85% 15%, rgba(240, 249, 255, 0.2) 0, transparent 60%),
    /* Amarelo amanteigado suave */
    radial-gradient(circle at 5% 75%, rgba(255, 250, 235, 0.3) 0, transparent 60%),
    /* Verde claro muito suave */
    radial-gradient(circle at 95% 80%, rgba(245, 255, 245, 0.2) 0, transparent 60%),
    /* Lavanda suave */
    radial-gradient(circle at 50% 10%, rgba(250, 245, 255, 0.2) 0, transparent 60%),
    /* Creme suave */
    radial-gradient(circle at 70% 60%, rgba(255, 252, 245, 0.25) 0, transparent 60%),
    /* Base suave e limpa - Branco com toques sutis de rosa e creme */
    linear-gradient(135deg, #ffffff 0%, #fffefb 30%, #fff5f8 60%, #ffffff 100%);
  background-size: 
    100% 100%,
    100% 100%,
    4px 4px,
    100% 100%,
    100% 100%,
    100% 100%,
    100% 100%,
    100% 100%;
}

.main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2.5rem;
  position: relative;
}

.products-section {
  flex: 1;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.75rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 250, 240, 0.95) 50%, rgba(255, 255, 255, 0.98) 100%);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(233, 30, 99, 0.12), 0 4px 12px rgba(59, 130, 246, 0.1), 0 2px 6px rgba(251, 191, 36, 0.1);
  border: 2px solid rgba(255, 182, 193, 0.3);
}

.products-header h2 {
  font-size: 1.875rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -0.5px;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.products-header h2::before {
  content: '';
  width: 5px;
  height: 28px;
  background: linear-gradient(135deg, #f9739b 0%, #ec4899 40%, #db2777 75%, #be185d 100%);
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(244, 114, 182, 0.4);
}

.products-count {
  font-size: 0.9375rem;
  color: #4b5563;
  font-weight: 600;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sort-controls label {
  font-weight: 700;
  color: #374151;
  font-size: 0.9375rem;
}

.sort-select {
  padding: 0.75rem 1.125rem;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  font-size: 0.9375rem;
  color: #1f2937;
  font-weight: 600;
  transition: all 0.2s ease;
  min-width: 200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.sort-select:hover {
  border-color: #e91e63;
}

.sort-select:focus {
  outline: none;
  border-color: #e91e63;
  box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
}

.no-products {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.no-products-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.no-products-icon {
  font-size: 4rem;
  opacity: 0.5;
}

.no-products p {
  color: #374151;
  font-size: 1.125rem;
  margin: 0;
  font-weight: 500;
}

.clear-filters-link {
  margin-top: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #f9739b 0%, #ec4899 40%, #db2777 75%, #be185d 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.clear-filters-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  padding: 1.75rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(229, 231, 235, 0.8);
}

.page-btn {
  padding: 0.75rem 1.125rem;
  border: 1.5px solid #e5e7eb;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  color: #6b7280;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.page-btn:hover:not(:disabled):not(.ellipsis) {
  background: linear-gradient(135deg, #fef2f2 0%, #fce4ec 100%);
  border-color: #e91e63;
  color: #e91e63;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.2);
}

.page-btn.active {
  background: linear-gradient(135deg, #f9739b 0%, #ec4899 40%, #db2777 75%, #be185d 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(233, 30, 99, 0.4);
  transform: scale(1.05);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn.nav-btn {
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.625rem 0.875rem;
}

.page-btn.ellipsis {
  cursor: default;
  border: none;
  background: transparent;
}

.cart-message {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.4);
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  font-size: 0.9375rem;
}

.success-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.toast-enter-active {
  animation: slideInRight 0.3s ease;
}

.toast-leave-active {
  animation: slideOutRight 0.3s ease;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* Tablet */
@media (max-width: 1200px) {
  .main-container {
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 1024px) {
  .main-container {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  .products-header {
    padding: 1.25rem;
  }
}

/* Mobile Grande */
@media (max-width: 768px) {
  .main-container {
    padding: 1rem;
    gap: 1rem;
  }
  
  .products-section {
    margin-top: 0.5rem;
  }
  
  .products-header {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .header-left {
    width: 100%;
  }
  
  .products-header h2 {
    font-size: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
  
  .sort-controls {
    width: 100%;
  }
  
  .sort-select {
    width: 100%;
    min-width: auto;
  }
  
  .pagination {
    padding: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .page-btn {
    padding: 0.5rem 0.75rem;
    min-width: 36px;
    font-size: 0.875rem;
  }
  
  .cart-message {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    padding: 0.875rem 1.25rem;
    font-size: 0.875rem;
  }
}

/* Mobile Médio */
@media (max-width: 640px) {
  .main-container {
    padding: 0.875rem;
  }
  
  .products-header {
    padding: 0.875rem;
  }
  
  .products-header h2 {
    font-size: 1.375rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.875rem;
  }
  
  .no-products {
    padding: 3rem 1.5rem;
  }
}

/* Mobile Pequeno */
@media (max-width: 480px) {
  .main-container {
    padding: 0.75rem;
  }
  
  .products-header {
    padding: 0.875rem;
    margin-bottom: 1rem;
  }
  
  .products-header h2 {
    font-size: 1.25rem;
  }
  
  .products-header h2::before {
    width: 3px;
    height: 20px;
  }
  
  .products-count {
    font-size: 0.75rem;
  }
  
  .sort-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;
  }
  
  .sort-controls label {
    font-size: 0.8125rem;
  }
  
  .sort-select {
    font-size: 0.8125rem;
    padding: 0.5rem 0.875rem;
    width: 100%;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .no-products {
    padding: 2rem 1rem;
  }
  
  .no-products-icon {
    font-size: 3rem;
  }
  
  .no-products p {
    font-size: 1rem;
  }
  
  .clear-filters-link {
    padding: 0.625rem 1.25rem;
    font-size: 0.8125rem;
    width: 100%;
  }
  
  .pagination {
    padding: 0.75rem;
    gap: 0.375rem;
  }
  
  .page-btn {
    padding: 0.5rem 0.625rem;
    min-width: 32px;
    font-size: 0.875rem;
  }
  
  .cart-message {
    bottom: 5rem;
    right: 0.75rem;
    left: 0.75rem;
    padding: 0.75rem 1rem;
    font-size: 0.8125rem;
  }
  
  .success-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
