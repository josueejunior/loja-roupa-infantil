<template>
  <div class="filters-sidebar">
    <div class="filters-header">
      <h2 class="filters-title">
        <IconSearch class="title-icon" />
        Filtrar Produtos
      </h2>
      <button 
        v-if="hasActiveFilters" 
        class="clear-all-btn"
        @click="clearFilters"
      >
        Limpar Filtros
      </button>
    </div>
    
    <!-- Categorias -->
    <div class="filter-section">
      <button 
        class="filter-section-header"
        @click="toggleSection('categories')"
      >
        <div class="section-title">
          <IconTag class="section-icon" />
          <span>Categorias</span>
          <span v-if="getActiveCategoryCount() > 0" class="filter-count">
            ({{ getActiveCategoryCount() }})
          </span>
        </div>
        <IconChevronDown v-if="!expandedSections.categories" class="chevron-icon" />
        <IconChevronUp v-else class="chevron-icon" />
      </button>
      
      <div v-show="expandedSections.categories" class="filter-content">
        <div class="search-wrapper" v-if="categories.length > 5">
          <input 
            type="text" 
            v-model="categorySearch"
            placeholder="Buscar categoria..."
            class="search-input"
          />
        </div>
        <div class="filter-options">
          <label 
            v-for="category in filteredCategories" 
            :key="category"
            class="filter-item category-item"
          >
            <input 
              type="checkbox" 
              :value="category"
              v-model="selectedCategories"
              @change="applyFilters"
              class="filter-checkbox-input"
            />
            <span class="filter-label">
              {{ category }}
              <span class="item-count">({{ getCategoryCount(category) }})</span>
            </span>
          </label>
        </div>
      </div>
    </div>
    
    <!-- Cor -->
    <div class="filter-section">
      <button 
        class="filter-section-header"
        @click="toggleSection('colors')"
      >
        <div class="section-title">
          <IconPalette class="section-icon" />
          <span>Cor</span>
          <span v-if="getActiveColorCount() > 0" class="filter-count">
            ({{ getActiveColorCount() }})
          </span>
        </div>
        <IconChevronDown v-if="!expandedSections.colors" class="chevron-icon" />
        <IconChevronUp v-else class="chevron-icon" />
      </button>
      
      <div v-show="expandedSections.colors" class="filter-content">
        <div class="color-grid">
          <label 
            v-for="color in colors.filter(c => c !== 'Todos')" 
            :key="color"
            class="color-swatch-item"
            :class="{ active: selectedColors.includes(color) }"
          >
            <input 
              type="checkbox" 
              :value="color"
              v-model="selectedColors"
              @change="applyFilters"
              class="color-checkbox"
            />
            <div class="color-swatch-wrapper">
              <span 
                class="color-swatch"
                :style="{ backgroundColor: getColorCode(color) }"
                :title="color"
              ></span>
              <span class="color-name">{{ color }}</span>
              <span class="color-count">({{ getColorCount(color) }})</span>
            </div>
          </label>
        </div>
      </div>
    </div>
    
    <!-- Tamanho -->
    <div class="filter-section">
      <button 
        class="filter-section-header"
        @click="toggleSection('sizes')"
      >
        <div class="section-title">
          <IconRuler class="section-icon" />
          <span>Tamanho</span>
          <span v-if="getActiveSizeCount() > 0" class="filter-count">
            ({{ getActiveSizeCount() }})
          </span>
        </div>
        <IconChevronDown v-if="!expandedSections.sizes" class="chevron-icon" />
        <IconChevronUp v-else class="chevron-icon" />
      </button>
      
      <div v-show="expandedSections.sizes" class="filter-content">
        <div class="size-grid">
          <label 
            v-for="size in sizes.filter(s => s !== 'Todos')" 
            :key="size"
            class="size-button"
            :class="{ active: selectedSizes.includes(size) }"
          >
            <input 
              type="checkbox" 
              :value="size"
              v-model="selectedSizes"
              @change="applyFilters"
              class="size-checkbox"
            />
            <span class="size-label">{{ size }}</span>
            <span class="size-count">({{ getSizeCount(size) }})</span>
          </label>
        </div>
      </div>
    </div>
    
    <!-- Preço -->
    <div class="filter-section">
      <button 
        class="filter-section-header"
        @click="toggleSection('price')"
      >
        <div class="section-title">
          <IconCurrency class="section-icon" />
          <span>Preço</span>
          <span v-if="minPrice || maxPrice" class="filter-count">(Ativo)</span>
        </div>
        <IconChevronDown v-if="!expandedSections.price" class="chevron-icon" />
        <IconChevronUp v-else class="chevron-icon" />
      </button>
      
      <div v-show="expandedSections.price" class="filter-content">
        <div class="price-range">
          <div class="price-inputs">
            <div class="price-input-wrapper">
              <label class="price-label">De</label>
              <input 
                type="number" 
                v-model.number="minPrice" 
                placeholder="0"
                class="price-input"
                min="0"
                step="0.01"
              />
            </div>
            <div class="price-input-wrapper">
              <label class="price-label">Até</label>
              <input 
                type="number" 
                v-model.number="maxPrice" 
                placeholder="999"
                class="price-input"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <button class="apply-price-btn" @click="applyFilters">
            Aplicar Filtro
          </button>
        </div>
      </div>
    </div>
    
    <!-- Estoque -->
    <div class="filter-section">
      <label class="filter-item stock-filter">
        <input 
          type="checkbox" 
          v-model="onlyInStock"
          @change="applyFilters"
          class="filter-checkbox-input"
        />
        <IconCheckCircle class="check-icon" />
        <span class="filter-label">Apenas produtos em estoque</span>
        <span class="item-count">({{ getInStockCount() }})</span>
      </label>
    </div>
    
    <!-- Rodapé com ações -->
    <div class="filters-footer">
      <button class="apply-filters-btn" @click="applyFilters">
        Aplicar Filtros
      </button>
      <button 
        v-if="hasActiveFilters"
        class="clear-filters-btn" 
        @click="clearFilters"
      >
        Limpar Tudo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { categories, colors, sizes, products } from '../data/products';
import IconSearch from './icons/IconSearch.vue';
import IconTag from './icons/IconTag.vue';
import IconPalette from './icons/IconPalette.vue';
import IconRuler from './icons/IconRuler.vue';
import IconCurrency from './icons/IconCurrency.vue';
import IconChevronDown from './icons/IconChevronDown.vue';
import IconChevronUp from './icons/IconChevronUp.vue';
import IconCheckCircle from './icons/IconCheckCircle.vue';

const emit = defineEmits(['filter-change']);

const selectedCategories = ref([]);
const selectedColors = ref([]);
const selectedSizes = ref([]);
const minPrice = ref(null);
const maxPrice = ref(null);
const onlyInStock = ref(false);
const categorySearch = ref('');

// Inicializar como expandido por padrão (desktop)
const expandedSections = ref({
  categories: true,
  colors: true,
  sizes: true,
  price: true
});

// Detectar se é mobile e ajustar seções expandidas
const checkScreenSize = () => {
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    // No desktop, garantir que todas as seções estejam expandidas
    expandedSections.value = {
      categories: true,
      colors: true,
      sizes: true,
      price: true
    };
  } else {
    // No mobile, manter fechado
    expandedSections.value = {
      categories: false,
      colors: false,
      sizes: false,
      price: false
    };
  }
};

onMounted(() => {
  // Verificar tamanho da tela imediatamente ao montar
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section];
};

// Filtrar categorias baseado na busca
const filteredCategories = computed(() => {
  const cats = categories.filter(c => c !== 'Todos');
  if (!categorySearch.value) return cats;
  return cats.filter(cat => 
    cat.toLowerCase().includes(categorySearch.value.toLowerCase())
  );
});

// Contar produtos por categoria
const getCategoryCount = (category) => {
  return products.filter(p => p.category === category).length;
};

// Contar produtos por cor
const getColorCount = (color) => {
  return products.filter(p => p.colors.includes(color)).length;
};

// Contar produtos por tamanho
const getSizeCount = (size) => {
  return products.filter(p => p.sizes.includes(size)).length;
};

// Contar produtos em estoque
const getInStockCount = () => {
  return products.filter(p => p.inStock).length;
};

// Contar filtros ativos
const getActiveCategoryCount = () => {
  return selectedCategories.value.length;
};

const getActiveColorCount = () => {
  return selectedColors.value.length;
};

const getActiveSizeCount = () => {
  return selectedSizes.value.length;
};

const hasActiveFilters = computed(() => {
  return (
    selectedCategories.value.length > 0 ||
    selectedColors.value.length > 0 ||
    selectedSizes.value.length > 0 ||
    minPrice.value !== null ||
    maxPrice.value !== null ||
    onlyInStock.value
  );
});

const getColorCode = (color) => {
  const colorMap = {
    'Rosa': '#FFB6C1',
    'Azul': '#87CEEB',
    'Amarelo': '#FFD700',
    'Verde': '#98FB98',
    'Branco': '#FFFFFF',
    'Preto': '#000000',
    'Lavanda': '#E6E6FA',
    'Bege': '#F5F5DC'
  };
  return colorMap[color] || '#CCCCCC';
};

const applyFilters = () => {
  emit('filter-change', {
    categories: selectedCategories.value.length > 0 ? selectedCategories.value : [],
    colors: selectedColors.value.length > 0 ? selectedColors.value : [],
    sizes: selectedSizes.value.length > 0 ? selectedSizes.value : [],
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    onlyInStock: onlyInStock.value
  });
};

const clearFilters = () => {
  selectedCategories.value = [];
  selectedColors.value = [];
  selectedSizes.value = [];
  minPrice.value = null;
  maxPrice.value = null;
  onlyInStock.value = false;
  categorySearch.value = '';
  applyFilters();
};

// Inicializar filtros ao montar o componente
onMounted(() => {
  applyFilters();
});
</script>

<style scoped>
.filters-sidebar {
  background: rgba(255, 255, 255, 0.9);
  /* Textura granulada + glassmorphism leve */
  background-image: 
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
    radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.06) 1px, transparent 0);
  background-size: 100% 100%, 100% 100%, 4px 4px;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  height: fit-content;
  position: sticky;
  top: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-right: 0.75rem;
  transition: all 0.3s ease;
}

.filters-sidebar:hover {
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.15), 0 6px 20px rgba(0, 0, 0, 0.1);
}

.filters-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
}

.filters-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-icon {
  width: 18px;
  height: 18px;
  color: #e91e63;
}

.clear-all-btn {
  background: none;
  border: none;
  color: #e91e63;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.clear-all-btn:hover {
  background: #fce4ec;
}

.filter-section {
  border-bottom: 1px solid #e5e7eb;
}

.filter-section:last-of-type {
  border-bottom: none;
}

.filter-section-header {
  width: 100%;
  padding: 1rem 1.5rem;
  background: white;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: left;
}

.filter-section-header:hover {
  background: #f9fafb;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.9375rem;
}

.section-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.filter-count {
  color: #e91e63;
  font-weight: 600;
  font-size: 0.875rem;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  color: #9ca3af;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.filter-content {
  padding: 1rem 1.5rem;
  background: #fafafa;
  display: block;
  visibility: visible;
}

/* Search Input */
.search-wrapper {
  margin-bottom: 0.75rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.search-input::placeholder {
  color: #6b7280;
}

.search-input:focus {
  outline: none;
  border-color: #e91e63;
  box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
}

/* Filter Options */
.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  max-height: 280px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.filter-options::-webkit-scrollbar {
  width: 4px;
}

.filter-options::-webkit-scrollbar-track {
  background: transparent;
}

.filter-options::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.filter-options::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.filter-item:hover {
  background: white;
}

.filter-checkbox-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #e91e63;
  flex-shrink: 0;
}

.filter-label {
  font-size: 0.875rem;
  color: #4b5563;
  user-select: none;
  flex: 1;
}

.item-count {
  color: #9ca3af;
  font-size: 0.8125rem;
  font-weight: 500;
}

/* Color Grid */
.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.color-swatch-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  background: white;
  transition: all 0.2s ease;
  position: relative;
}

.color-swatch-item:hover {
  border-color: #e91e63;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(233, 30, 99, 0.15);
}

.color-swatch-item.active {
  border-color: #e91e63;
  background: #fce4ec;
}

.color-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.color-swatch-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
}

.color-swatch {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  display: block;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.color-name {
  font-size: 0.75rem;
  color: #4b5563;
  font-weight: 500;
  text-align: center;
}

.color-count {
  font-size: 0.6875rem;
  color: #9ca3af;
}

/* Size Grid */
.size-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
}

.size-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.625rem 0.5rem;
  border-radius: 6px;
  border: 2px solid #e5e7eb;
  background: white;
  transition: all 0.2s ease;
  position: relative;
  min-height: 60px;
}

.size-button:hover {
  border-color: #e91e63;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(233, 30, 99, 0.15);
}

.size-button.active {
  border-color: #e91e63;
  background: #fce4ec;
  color: #e91e63;
}

.size-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.size-label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #374151;
  user-select: none;
}

.size-button.active .size-label {
  color: #e91e63;
}

.size-count {
  font-size: 0.6875rem;
  color: #9ca3af;
  margin-top: 0.125rem;
}

/* Price Range */
.price-range {
  padding-top: 0.25rem;
}

.price-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.price-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.price-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-input {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.price-input:focus {
  outline: none;
  border-color: #e91e63;
  box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
}

.apply-price-btn {
  width: 100%;
  padding: 0.625rem;
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8125rem;
  transition: all 0.2s ease;
}

.apply-price-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(233, 30, 99, 0.3);
}

/* Stock Filter */
.stock-filter {
  padding: 1rem 1.5rem;
  border-bottom: none;
  background: white;
}

.check-icon {
  width: 18px;
  height: 18px;
  color: #e91e63;
  flex-shrink: 0;
}

/* Footer */
.filters-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.apply-filters-btn {
  width: 100%;
  padding: 0.625rem;
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8125rem;
  transition: all 0.2s ease;
}

.apply-filters-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(233, 30, 99, 0.3);
}

.clear-filters-btn {
  width: 100%;
  padding: 0.5rem;
  background: white;
  color: #6b7280;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

.clear-filters-btn:hover {
  background: #f9fafb;
  border-color: #e91e63;
  color: #e91e63;
}

/* Tablet */
@media (max-width: 1024px) {
  .filters-sidebar {
    position: static;
    margin-right: 0;
  }
}

/* Mobile Grande */
@media (max-width: 768px) {
  .filters-sidebar {
    position: static;
    margin-bottom: 2rem;
  }
  
  .filters-header {
    padding: 1rem 1.25rem;
  }
  
  .filter-section-header {
    padding: 0.875rem 1.25rem;
  }
  
  .filter-content {
    padding: 0.875rem 1.25rem;
  }
  
  .color-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.625rem;
  }
  
  .size-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
  }
  
  .size-button {
    min-height: 50px;
    padding: 0.5rem 0.25rem;
  }
  
  .filters-footer {
    padding: 0.875rem 1.25rem;
  }
}

/* Mobile Médio */
@media (max-width: 640px) {
  .filters-header {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .filter-section-header {
    padding: 0.875rem 1rem;
  }
  
  .filter-content {
    padding: 0.875rem 1rem;
  }
  
  .color-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .size-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  
  .price-inputs {
    grid-template-columns: 1fr;
  }
  
  .filters-footer {
    padding: 0.875rem 1rem;
  }
}

/* Mobile Pequeno */
@media (max-width: 480px) {
  .filters-sidebar {
    border-radius: 8px;
  }
  
  .filters-header {
    padding: 0.875rem;
  }
  
  .filters-title {
    font-size: 1rem;
  }
  
  .filter-section-header {
    padding: 0.75rem 0.875rem;
  }
  
  .section-title {
    font-size: 0.875rem;
  }
  
  .filter-content {
    padding: 0.75rem 0.875rem;
  }
  
  .color-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
  }
  
  .color-swatch {
    width: 32px;
    height: 32px;
  }
  
  .color-name {
    font-size: 0.6875rem;
  }
  
  .size-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  
  .size-button {
    min-height: 45px;
    padding: 0.5rem 0.25rem;
  }
  
  .size-label {
    font-size: 0.875rem;
  }
  
  .stock-filter {
    padding: 0.75rem 0.875rem;
  }
  
  .filters-footer {
    padding: 0.75rem 0.875rem;
  }
  
  .apply-filters-btn,
  .clear-filters-btn {
    font-size: 0.8125rem;
    padding: 0.625rem;
  }
}
</style>
