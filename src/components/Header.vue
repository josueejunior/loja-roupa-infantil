<template>
  <header class="header">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="top-bar-content">
        <div class="top-bar-left">
          <span class="top-bar-item">
            <IconTruck class="top-icon" />
            <span>Frete Grátis acima de R$ 200,00</span>
          </span>
          <span class="top-bar-divider">|</span>
          <span class="top-bar-item">
            <IconCreditCard class="top-icon" />
            <span>Pagamento em até 20 minutos</span>
          </span>
        </div>
        <div class="top-bar-right">
          <a href="tel:+5587999391998" class="top-bar-link">
            <IconPhone class="top-icon" />
            (87) 99939-1998
          </a>
          <span class="top-bar-divider">|</span>
          <a href="mailto:contato@lojainfantil.com.br" class="top-bar-link">
            <IconEmail class="top-icon" />
            contato@lojainfantil.com.br
          </a>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="main-header">
      <div class="header-container">
        <div class="logo-section">
          <div class="logo-wrapper">
            <div class="logo-icon">👗</div>
            <div>
              <h1 class="logo">Loja Infantil</h1>
              <p class="tagline">Roupas cheias de charme para crianças</p>
            </div>
          </div>
        </div>
        
        <nav class="main-nav">
          <RouterLink to="/" class="nav-link" :class="{ active: route.name === 'home' }">
            <IconHome class="nav-icon" />
            <span>Início</span>
          </RouterLink>
          <RouterLink to="/" class="nav-link">
            <span>Produtos</span>
          </RouterLink>
          <RouterLink to="/sobre" class="nav-link" :class="{ active: route.name === 'about' }">
            <span>Sobre</span>
          </RouterLink>
          <RouterLink to="/contato" class="nav-link" :class="{ active: route.name === 'contact' }">
            <span>Contato</span>
          </RouterLink>
          <a href="#" class="nav-link" @click.prevent="toggleCart">
            <IconCart class="nav-icon" />
            <span>Ver carrinho</span>
          </a>
        </nav>
        
        <div class="header-actions">
          <!-- Search Bar -->
          <div class="search-bar">
            <IconSearch class="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              class="search-input"
              :value="searchQuery"
              @input="$emit('search', $event.target.value)"
            />
          </div>
          
          <button class="cart-button" @click="toggleCart">
            <div class="cart-button-content">
              <IconCart class="cart-icon" />
              <div class="cart-info">
                <span class="cart-label">Carrinho</span>
                <span class="cart-total">R$ {{ cartTotal.toFixed(2) }}</span>
              </div>
              <span class="cart-count-badge" v-if="cartItemCount > 0">
                {{ cartItemCount }}
              </span>
            </div>
          </button>
          
          <!-- Menu Mobile Button -->
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <IconMenu />
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <nav class="mobile-nav">
          <RouterLink to="/" class="mobile-nav-link" :class="{ active: route.name === 'home' }" @click="closeMobileMenu">
            <IconHome class="mobile-nav-icon" />
            <span>Início</span>
          </RouterLink>
          <RouterLink to="/" class="mobile-nav-link" @click="closeMobileMenu">
            <span>Produtos</span>
          </RouterLink>
          <RouterLink to="/sobre" class="mobile-nav-link" :class="{ active: route.name === 'about' }" @click="closeMobileMenu">
            <span>Sobre</span>
          </RouterLink>
          <RouterLink to="/contato" class="mobile-nav-link" :class="{ active: route.name === 'contact' }" @click="closeMobileMenu">
            <span>Contato</span>
          </RouterLink>
          <button 
            type="button" 
            class="mobile-nav-link" 
            @click="() => { toggleCart(); closeMobileMenu(); }"
          >
            <IconCart class="mobile-nav-icon" />
            <span>Ver carrinho</span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Breadcrumb / Info Bar -->
    <div class="info-bar">
      <div class="info-bar-content">
        <div class="breadcrumb">
          <a href="#" class="breadcrumb-link">
            <IconHome class="breadcrumb-icon" />
            Início
          </a>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">Produtos</span>
        </div>
        <div class="info-stats">
          <span class="stat-item">
            <strong>{{ totalProducts }}</strong> produtos disponíveis
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { products } from '../data/products';
import IconCart from './icons/IconCart.vue';
import IconPhone from './icons/IconPhone.vue';
import IconEmail from './icons/IconEmail.vue';
import IconCreditCard from './icons/IconCreditCard.vue';
import IconTruck from './icons/IconTruck.vue';
import IconHome from './icons/IconHome.vue';
import IconMenu from './icons/IconMenu.vue';
import IconSearch from './icons/IconSearch.vue';
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const cartStore = useCartStore();
const cartItemCount = cartStore.totalItems;
const cartTotal = cartStore.totalPrice;
const totalProducts = products.length;
const isMobileMenuOpen = ref(false);
const route = useRoute();

const emit = defineEmits(['search']);

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
});

const toggleCart = () => {
  cartStore.toggleCart();
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<style scoped>
.header {
  background: #fafafa;
  /* Textura granulada suave harmonizada com o site */
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
    radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0);
  background-size: 100% 100%, 100% 100%, 4px 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

/* Top Bar */
.top-bar {
  background: linear-gradient(135deg, #f472b6 0%, #ec4899 35%, #db2777 100%);
  color: white;
  padding: 0.5rem 0;
  font-size: 0.8125rem;
  display: block;
}

.top-bar-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.top-bar-left,
.top-bar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.top-bar-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.top-bar-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.top-bar-link:hover {
  opacity: 0.8;
}

.top-icon {
  width: 14px;
  height: 14px;
  opacity: 0.9;
}

.top-bar-divider {
  opacity: 0.5;
  color: rgba(255, 255, 255, 0.5);
}

/* Main Header */
.main-header {
  background: rgba(255, 255, 255, 0.95);
  /* Textura granulada sutil harmonizada */
  background-image: 
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.01) 0px,
      transparent 1px,
      transparent 2px,
      rgba(0, 0, 0, 0.01) 3px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.01) 0px,
      transparent 1px,
      transparent 2px,
      rgba(0, 0, 0, 0.01) 3px
    );
  background-size: 100% 100%, 100% 100%;
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  backdrop-filter: blur(8px);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.logo-section {
  flex: 1;
  min-width: 200px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 2rem;
  line-height: 1;
}

.logo {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0;
  margin-top: 0.125rem;
}

/* Search Bar */
.search-bar {
  width: 280px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.875rem;
  width: 18px;
  height: 18px;
  color: #9ca3af;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.875rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 999px;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  border-color: #e91e63;
  background: white;
  box-shadow: 0 0 0 4px rgba(233, 30, 99, 0.12), 0 2px 8px rgba(233, 30, 99, 0.15);
}

.search-input::placeholder {
  color: #9ca3af;
}

/* Navigation */
.main-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.1rem;
  color: #374151;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  background: #f3f4f6;
  color: #e91e63;
}

.nav-link.active {
  color: #e91e63;
  background: #fce4ec;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: #e91e63;
  border-radius: 2px 2px 0 0;
}

.nav-icon {
  width: 18px;
  height: 18px;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-button {
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  color: white;
  border: none;
  padding: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
  overflow: hidden;
}

.cart-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(233, 30, 99, 0.45);
}

.cart-button-content {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 1rem;
  position: relative;
}

.cart-icon {
  width: 20px;
  height: 20px;
}

.cart-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
}

.cart-label {
  font-size: 0.6875rem;
  opacity: 0.9;
  font-weight: 500;
}

.cart-total {
  font-size: 0.875rem;
  font-weight: 700;
}

.cart-count-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ffd700;
  color: #1f2937;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: #f3f4f6;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  color: #374151;
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover {
  background: #e5e7eb;
  color: #e91e63;
}

.mobile-menu-btn svg {
  width: 20px;
  height: 20px;
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 1rem 0;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 2rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  color: #4b5563;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  background: #fce4ec;
  color: #e91e63;
}

.mobile-nav-icon {
  width: 20px;
  height: 20px;
}

/* Info Bar */
.info-bar {
  background: rgba(249, 250, 251, 0.95);
  /* Textura granulada sutil harmonizada */
  background-image: 
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.01) 0px,
      transparent 1px,
      transparent 2px,
      rgba(0, 0, 0, 0.01) 3px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.01) 0px,
      transparent 1px,
      transparent 2px,
      rgba(0, 0, 0, 0.01) 3px
    );
  background-size: 100% 100%, 100% 100%;
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  padding: 0.75rem 0;
  backdrop-filter: blur(8px);
}

.info-bar-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #e91e63;
}

.breadcrumb-icon {
  width: 14px;
  height: 14px;
}

.breadcrumb-separator {
  color: #9ca3af;
}

.breadcrumb-current {
  color: #374151;
  font-weight: 500;
}

.info-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.stat-item {
  font-size: 0.875rem;
  color: #6b7280;
}

.stat-item strong {
  color: #e91e63;
  font-weight: 700;
}

/* Tablet */
@media (max-width: 1200px) {
  .header-container {
    padding: 1rem 1.5rem;
  }
  
  .top-bar-content {
    padding: 0 1.5rem;
  }
  
  .info-bar-content {
    padding: 0 1.5rem;
  }
}

@media (max-width: 1024px) {
  .main-nav {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .header-container {
    padding: 1rem 1.5rem;
    gap: 1.5rem;
  }
}

/* Mobile Grande */
@media (max-width: 768px) {
  .top-bar {
    display: none;
  }
  
  .header-container {
    padding: 0.875rem 1rem;
    gap: 1rem;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-end;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  
  .search-bar {
    order: 3;
    max-width: 100%;
    width: 100%;
    margin-top: 0.5rem;
  }
  
  .logo-section {
    min-width: auto;
    flex: 1;
  }
  
  .logo-wrapper {
    gap: 0.5rem;
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
  
  .logo {
    font-size: 1.25rem;
  }
  
  .tagline {
    font-size: 0.75rem;
    display: none;
  }
  
  .header-actions {
    gap: 0.5rem;
  }
  
  .cart-button {
    padding: 0;
  }
  
  .cart-button-content {
    padding: 0.5rem 0.625rem;
    gap: 0.375rem;
  }
  
  .cart-icon {
    width: 18px;
    height: 18px;
  }
  
  .cart-info {
    display: none;
  }
  
  .cart-count-badge {
    position: static;
    width: 18px;
    height: 18px;
    font-size: 0.625rem;
  }
  
  .mobile-menu-btn {
    padding: 0.5rem;
  }
  
  .mobile-menu-btn svg {
    width: 18px;
    height: 18px;
  }
  
  .mobile-nav {
    padding: 0 1rem;
  }
  
  .info-bar {
    padding: 0.5rem 0;
  }
  
  .info-bar-content {
    padding: 0 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .breadcrumb {
    font-size: 0.8125rem;
  }
  
  .stat-item {
    font-size: 0.8125rem;
  }
}

/* Mobile Médio */
@media (max-width: 640px) {
  .header-container {
    padding: 0.75rem 1rem;
  }
  
  .logo {
    font-size: 1.125rem;
  }
  
  .logo-icon {
    font-size: 1.25rem;
  }
  
  .cart-button-content {
    padding: 0.5rem 0.625rem;
  }
}

/* Mobile Pequeno */
@media (max-width: 480px) {
  .header-container {
    padding: 0.75rem 0.875rem;
    gap: 0.75rem;
  }
  
  .logo-wrapper {
    gap: 0.375rem;
  }
  
  .logo-icon {
    font-size: 1.125rem;
  }
  
  .logo {
    font-size: 1rem;
  }
  
  .header-actions {
    gap: 0.375rem;
  }
  
  .cart-button-content {
    padding: 0.5rem;
  }
  
  .cart-icon {
    width: 16px;
    height: 16px;
  }
  
  .cart-count-badge {
    width: 16px;
    height: 16px;
    font-size: 0.625rem;
  }
  
  .mobile-menu-btn {
    padding: 0.5rem;
  }
  
  .mobile-menu-btn svg {
    width: 18px;
    height: 18px;
  }
  
  .mobile-nav {
    padding: 0 0.875rem;
  }
  
  .mobile-nav-link {
    padding: 0.75rem 0.875rem;
    font-size: 0.875rem;
  }
  
  .info-bar-content {
    padding: 0 0.875rem;
  }
  
  .breadcrumb {
    font-size: 0.75rem;
  }
  
  .stat-item {
    font-size: 0.75rem;
  }
}
</style>
