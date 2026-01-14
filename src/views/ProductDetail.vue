<template>
  <div class="app">
    <Header />

    <main class="detail-main">
      <div class="detail-container" v-if="product">
        <div class="detail-breadcrumb">
          <RouterLink to="/" class="breadcrumb-link">
            Início
          </RouterLink>
          <span class="breadcrumb-separator">›</span>
          <RouterLink to="/" class="breadcrumb-link">
            Produtos
          </RouterLink>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">{{ product.name }}</span>
        </div>

        <section class="detail-content">
          <div class="detail-image-wrapper">
            <img
              :src="product.image"
              :alt="product.name"
              class="detail-image"
              loading="lazy"
              @error="handleImageError"
            />
            <div class="detail-badges">
              <span v-if="product.featured" class="badge featured">
                <IconStar class="badge-icon" />
                Destaque
              </span>
              <span v-if="product.originalPrice" class="badge discount">
                {{ discountPercent }}% OFF
              </span>
              <span v-if="!product.inStock" class="badge out-of-stock-badge">
                Sem estoque
              </span>
            </div>
          </div>

          <div class="detail-info">
            <h1 class="detail-title">{{ product.name }}</h1>
            <p class="detail-category">{{ product.category }}</p>

            <div class="detail-price">
              <span class="current-price">R$ {{ product.price.toFixed(2) }}</span>
              <span v-if="product.originalPrice" class="original-price">
                R$ {{ product.originalPrice.toFixed(2) }}
              </span>
            </div>

            <p class="detail-description">
              Roupinha pensada para ficar linda nas fotos, confortável no dia a dia e com o jeitinho
              especial da sua criança. Tecido macio, ótimo caimento e acabamento delicado.
            </p>

            <div class="detail-options">
              <div class="option-group">
                <span class="option-label">Tamanho</span>
                <div class="option-list">
                  <button
                    v-for="size in product.sizes"
                    :key="size"
                    class="option-pill"
                    :class="{ active: selectedSize === size }"
                    @click="selectedSize = size"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <div class="option-group">
                <span class="option-label">Cor</span>
                <div class="option-list">
                  <button
                    v-for="color in product.colors"
                    :key="color"
                    class="option-pill color-pill"
                    :class="{ active: selectedColor === color }"
                    :style="{ backgroundColor: getColorCode(color) }"
                    @click="selectedColor = color"
                  >
                    {{ color }}
                  </button>
                </div>
              </div>
            </div>

            <button
              class="add-to-cart-btn"
              @click="addToCart"
              :disabled="!product.inStock || !selectedSize || !selectedColor"
            >
              <IconShopping v-if="product.inStock" class="btn-icon" />
              {{ product.inStock ? 'Adicionar ao carrinho' : 'Sem estoque' }}
            </button>

            <ul class="detail-extra-info">
              <li>Envio rápido para todo o Brasil</li>
              <li>Pagamento via PIX em até 20 minutos</li>
              <li>Peças selecionadas com muito carinho</li>
            </ul>
          </div>
        </section>

        <!-- Produtos relacionados -->
        <section v-if="relatedProducts.length" class="related-section">
          <h2 class="related-title">Você também pode gostar</h2>
          <div class="related-grid">
            <RouterLink
              v-for="item in relatedProducts"
              :key="item.id"
              :to="{ name: 'product-detail', params: { id: item.id } }"
              class="related-card"
            >
              <div class="related-image-wrapper">
                <img
                  :src="item.image"
                  :alt="item.name"
                  loading="lazy"
                  @error="handleImageError"
                />
              </div>
              <div class="related-info">
                <h3 class="related-name">{{ item.name }}</h3>
                <p class="related-price">R$ {{ item.price.toFixed(2) }}</p>
              </div>
            </RouterLink>
          </div>
        </section>
      </div>

      <div v-else class="detail-not-found">
        <p>Produto não encontrado.</p>
        <RouterLink to="/" class="back-link">
          Voltar para a vitrine
        </RouterLink>
      </div>
    </main>

    <ShoppingCart :is-open="cartStore.isCartOpen.value" @close="cartStore.closeCart" />
    <Footer />
    <WhatsAppButton />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import WhatsAppButton from '../components/WhatsAppButton.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import IconStar from '../components/icons/IconStar.vue';
import IconShopping from '../components/icons/IconShopping.vue';
import { products } from '../data/products';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const cartStore = useCartStore();
const selectedSize = ref('');
const selectedColor = ref('');

const product = computed(() => {
  const id = Number(route.params.id);
  return products.find(p => p.id === id);
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  // Produtos da mesma categoria, exceto o atual, limitando a 4
  return products
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4);
});

const discountPercent = computed(() => {
  if (!product.value || !product.value.originalPrice) return 0;
  return Math.round(
    ((product.value.originalPrice - product.value.price) / product.value.originalPrice) * 100
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

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/500x600/F3F4F6/9CA3AF?text=Imagem+Indispon%C3%ADvel';
};

const addToCart = () => {
  if (product.value && selectedSize.value && selectedColor.value) {
    cartStore.addToCart(product.value, selectedSize.value, selectedColor.value);
    cartStore.openCart();
  }
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
  background:
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.03) 0px,
      transparent 1px,
      transparent 2px,
      rgba(0, 0, 0, 0.03) 3px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.03) 0px,
      transparent 1px,
      transparent 2px,
      rgba(0, 0, 0, 0.03) 3px
    ),
    radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.15) 1px, transparent 0),
    radial-gradient(circle at 10% 20%, rgba(255, 182, 193, 0.25) 0, transparent 45%),
    radial-gradient(circle at 90% 10%, rgba(173, 216, 230, 0.25) 0, transparent 45%),
    radial-gradient(circle at 0% 80%, rgba(255, 228, 181, 0.3) 0, transparent 50%),
    radial-gradient(circle at 85% 85%, rgba(221, 160, 221, 0.25) 0, transparent 45%),
    linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 100%);
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

.detail-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.detail-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.breadcrumb-link {
  color: #6b7280;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.breadcrumb-link:hover {
  color: #e91e63;
}

.breadcrumb-separator {
  color: #9ca3af;
}

.breadcrumb-current {
  color: #374151;
  font-weight: 500;
}

.detail-content {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 2rem;
  align-items: flex-start;
}

.detail-image-wrapper {
  position: relative;
  background: #f3f4f6;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
}

.detail-image {
  width: 100%;
  display: block;
  object-fit: cover;
}

.detail-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.badge.featured {
  background: #ffd700;
  color: #333;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.badge.discount {
  background: #e91e63;
}

.badge.out-of-stock-badge {
  background: #4b5563;
}

.badge-icon {
  width: 14px;
  height: 14px;
}

.detail-info {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1), 0 4px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border: 1px solid rgba(229, 231, 235, 0.8);
}

.detail-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.detail-category {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.detail-price {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.current-price {
  font-size: 1.75rem;
  font-weight: 800;
  color: #c2185b;
}

.original-price {
  font-size: 0.9375rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.detail-description {
  font-size: 0.9375rem;
  color: #4b5563;
  line-height: 1.6;
}

.detail-options {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option-label {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.option-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.option-pill {
  min-width: 40px;
  padding: 0.5rem 0.875rem;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s ease;
}

.option-pill:hover {
  border-color: #e91e63;
}

.option-pill.active {
  background: #e91e63;
  color: white;
  border-color: #e91e63;
}

.color-pill {
  min-width: 80px;
}

.add-to-cart-btn {
  width: 100%;
  margin-top: 0.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  box-shadow: 0 8px 24px rgba(233, 30, 99, 0.4), 0 4px 12px rgba(233, 30, 99, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.3px;
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(233, 30, 99, 0.5);
}

.add-to-cart-btn:disabled {
  background: #d1d5db;
  box-shadow: none;
  cursor: not-allowed;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.detail-extra-info {
  margin-top: 0.75rem;
  padding-left: 1.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.detail-extra-info li + li {
  margin-top: 0.25rem;
}

.related-section {
  margin-top: 3rem;
}

.related-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1.5rem 0;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.25rem;
}

.related-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.08);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.related-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
}

.related-image-wrapper {
  background: #f3f4f6;
  height: 160px;
  overflow: hidden;
}

.related-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.related-info {
  padding: 0.75rem 0.9rem 1rem;
}

.related-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.related-price {
  font-size: 0.9rem;
  font-weight: 700;
  color: #c2185b;
  margin: 0;
}

.detail-not-found {
  max-width: 600px;
  margin: 3rem auto;
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08);
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.65rem 1.25rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  color: white;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
}

.back-link:hover {
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .detail-main {
    padding: 1.5rem;
  }

  .detail-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .detail-main {
    padding: 1rem;
  }

  .detail-info {
    padding: 1.25rem;
  }

  .detail-title {
    font-size: 1.5rem;
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>


