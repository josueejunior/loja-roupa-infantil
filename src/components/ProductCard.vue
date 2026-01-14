<template>
  <div class="product-card" :class="{ 'out-of-stock': !product.inStock }">
    <div class="product-image-container" @click="goToDetail">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="product-image"
        loading="lazy"
        @error="handleImageError"
      />
      <div class="product-badges">
        <span v-if="product.featured" class="badge featured">
          <IconStar class="badge-icon" />
          Destaque
        </span>
        <span v-if="product.originalPrice" class="badge discount">
          {{ discountPercent }}% OFF
        </span>
        <span v-if="!product.inStock" class="badge out-of-stock-badge">Sem Estoque</span>
      </div>
    </div>
    
    <div class="product-info">
      <h3 class="product-name" @click="goToDetail">
        {{ product.name }}
      </h3>
      <p class="product-category">{{ product.category }}</p>
      
      <div class="product-sizes">
        <span class="size-label">Tamanhos:</span>
        <div class="sizes-list">
          <span 
            v-for="size in product.sizes" 
            :key="size"
            class="size-tag"
          >
            {{ size }}
          </span>
        </div>
      </div>
      
      <div class="product-colors">
        <span class="color-label">Cores:</span>
        <div class="colors-list">
          <span 
            v-for="color in product.colors" 
            :key="color"
            class="color-tag"
            :style="{ backgroundColor: getColorCode(color) }"
            :title="color"
          ></span>
        </div>
      </div>
      
      <div class="product-price">
        <span class="current-price">R$ {{ product.price.toFixed(2) }}</span>
        <span v-if="product.originalPrice" class="original-price">
          R$ {{ product.originalPrice.toFixed(2) }}
        </span>
      </div>
      
      <button 
        class="add-to-cart-btn" 
        @click="showSizeColorModal = true"
        :disabled="!product.inStock"
      >
        <IconShopping v-if="product.inStock" class="btn-icon" />
        {{ product.inStock ? 'Adicionar ao Carrinho' : 'Sem Estoque' }}
      </button>

      <button 
        class="view-details-link"
        type="button"
        @click="goToDetail"
      >
        Ver detalhes do produto
      </button>
    </div>
    
    <!-- Modal para seleção de tamanho e cor -->
    <Transition name="modal">
      <div v-if="showSizeColorModal" class="modal-overlay" @click="showSizeColorModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <div class="modal-product-info">
              <img :src="product.image" :alt="product.name" class="modal-product-image" />
              <div>
                <h3 class="modal-title">{{ product.name }}</h3>
                <p class="modal-price">R$ {{ product.price.toFixed(2) }}</p>
              </div>
            </div>
            <button class="close-modal" @click="showSizeColorModal = false" aria-label="Fechar">
              <IconClose />
            </button>
          </div>
          
          <div class="modal-body">
            <div class="modal-section">
              <label class="modal-label">
                <span>Tamanho</span>
                <span v-if="selectedSize" class="selected-indicator">Selecionado: {{ selectedSize }}</span>
              </label>
              <div class="size-options">
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  class="option-btn size-btn"
                  :class="{ active: selectedSize === size }"
                  @click="selectedSize = size"
                >
                  {{ size }}
                </button>
              </div>
            </div>
            
            <div class="modal-section">
              <label class="modal-label">
                <span>Cor</span>
                <span v-if="selectedColor" class="selected-indicator">Selecionado: {{ selectedColor }}</span>
              </label>
              <div class="color-options">
                <button
                  v-for="color in product.colors"
                  :key="color"
                  class="option-btn color-option"
                  :class="{ active: selectedColor === color }"
                  :style="{ 
                    backgroundColor: getColorCode(color),
                    borderColor: selectedColor === color ? '#e91e63' : 'transparent'
                  }"
                  @click="selectedColor = color"
                  :title="color"
                >
                  <span class="color-name">{{ color }}</span>
                  <span v-if="selectedColor === color" class="check-mark">✓</span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button 
              class="confirm-btn"
              @click="addToCart"
              :disabled="!selectedSize || !selectedColor"
            >
              <IconShopping class="btn-icon" />
              <span>Adicionar ao Carrinho</span>
            </button>
            <p v-if="!selectedSize || !selectedColor" class="helper-text">
              Selecione o tamanho e a cor para continuar
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import IconStar from './icons/IconStar.vue';
import IconShopping from './icons/IconShopping.vue';
import IconClose from './icons/IconClose.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['added-to-cart']);

const cartStore = useCartStore();
const router = useRouter();
const showSizeColorModal = ref(false);
const selectedSize = ref('');
const selectedColor = ref('');

const discountPercent = computed(() => {
  if (!props.product.originalPrice) return 0;
  return Math.round(((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100);
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

const addToCart = () => {
  if (selectedSize.value && selectedColor.value) {
    cartStore.addToCart(props.product, selectedSize.value, selectedColor.value);
    emit('added-to-cart');
    showSizeColorModal.value = false;
    selectedSize.value = '';
    selectedColor.value = '';
  }
};

const goToDetail = () => {
  router.push({ name: 'product-detail', params: { id: props.product.id } });
};

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300x400/F3F4F6/9CA3AF?text=Imagem+Indisponível';
};
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.product-card.out-of-stock {
  opacity: 0.7;
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-top: 133.33%; /* 3:4 aspect ratio */
  overflow: hidden;
  background: #f5f5f5;
  cursor: pointer;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
}

.badge.featured {
  background: #FFD700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.badge-icon {
  width: 14px;
  height: 14px;
}

.badge.discount {
  background: #e91e63;
}

.badge.out-of-stock-badge {
  background: #666;
}

.product-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.product-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.product-name:hover {
  color: #e91e63;
}

.product-category {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

.product-sizes,
.product-colors {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.size-label,
.color-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
}

.sizes-list,
.colors-list {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.size-tag {
  padding: 2px 6px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #666;
}

.color-tag {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ddd;
  display: inline-block;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
}

.current-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #c2185b;
}

.original-price {
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background: radial-gradient(circle at 0 0, #ffe4f1 0, transparent 55%),
              radial-gradient(circle at 100% 0, #ffd9f2 0, transparent 55%),
              linear-gradient(135deg, #f9739b 0%, #ec4899 45%, #db2777 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(194, 24, 91, 0.45);
}

.add-to-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.view-details-link {
  margin-top: 0.35rem;
  background: none;
  border: none;
  padding: 0;
  color: #6b7280;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  align-self: flex-start;
  transition: color 0.2s ease;
}

.view-details-link:hover {
  color: #e91e63;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  gap: 1rem;
}

.modal-product-info {
  display: flex;
  gap: 1rem;
  flex: 1;
}

.modal-product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.modal-price {
  font-size: 1.125rem;
  font-weight: 700;
  color: #e91e63;
  margin: 0;
}

.close-modal {
  background: #f3f4f6;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.close-modal:hover {
  background: #e5e7eb;
  color: #374151;
}

.close-modal svg {
  width: 20px;
  height: 20px;
}

.modal-body {
  padding: 1.5rem;
  flex: 1;
}

.modal-section {
  margin-bottom: 1.75rem;
}

.modal-section:last-child {
  margin-bottom: 0;
}

.modal-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.selected-indicator {
  font-weight: 500;
  color: #e91e63;
  font-size: 0.8125rem;
}

.size-options,
.color-options {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
}

.option-btn {
  padding: 0.625rem 1rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.875rem;
  color: #374151;
  position: relative;
}

.size-btn {
  min-width: 50px;
}

.option-btn:hover {
  border-color: #e91e63;
  background: #fce4ec;
  transform: translateY(-1px);
}

.option-btn.active {
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  color: white;
  border-color: #e91e63;
  box-shadow: 0 2px 8px rgba(233, 30, 99, 0.3);
}

.color-option {
  min-width: 100px;
  padding: 0.5rem 0.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border: 2px solid #e5e7eb;
}

.color-option .color-name {
  color: #374151;
  font-weight: 500;
}

.color-option.active .color-name {
  color: white;
  font-weight: 600;
}

.check-mark {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #f3f4f6;
  background: #fafafa;
}

.confirm-btn {
  width: 100%;
  padding: 0.875rem 1.25rem;
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.4);
  transition: all 0.2s ease;
}

.confirm-btn:disabled {
  background: #d1d5db;
  box-shadow: none;
  cursor: not-allowed;
  opacity: 0.6;
}

.confirm-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(233, 30, 99, 0.5);
}

.helper-text {
  margin: 0.75rem 0 0 0;
  font-size: 0.8125rem;
  color: #9ca3af;
  text-align: center;
}

/* Modal Animations */
.modal-enter-active {
  transition: opacity 0.3s ease;
}

.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content {
  animation: modalSlideIn 0.3s ease;
}

.modal-leave-active .modal-content {
  animation: modalSlideOut 0.2s ease;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes modalSlideOut {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .product-info {
    padding: 0.875rem;
  }
  
  .product-name {
    font-size: 1rem;
  }
  
  .product-category {
    font-size: 0.8125rem;
  }
  
  .current-price {
    font-size: 1.2rem;
  }
  
  .add-to-cart-btn {
    padding: 0.625rem;
    font-size: 0.875rem;
  }
  
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-content {
    max-width: 100%;
    border-radius: 12px;
  }
  
  .modal-header {
    padding: 1.25rem;
  }
  
  .modal-product-image {
    width: 50px;
    height: 50px;
  }
  
  .modal-title {
    font-size: 0.9375rem;
  }
  
  .modal-price {
    font-size: 1rem;
  }
  
  .modal-body {
    padding: 1.25rem;
  }
  
  .modal-section {
    margin-bottom: 1.5rem;
  }
  
  .size-options,
  .color-options {
    gap: 0.5rem;
  }
  
  .option-btn {
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem;
  }
  
  .color-option {
    min-width: 90px;
  }
  
  .modal-footer {
    padding: 1.25rem;
  }
  
  .confirm-btn {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .product-info {
    padding: 0.75rem;
  }
  
  .product-name {
    font-size: 0.9375rem;
  }
  
  .product-sizes,
  .product-colors {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.375rem;
  }
  
  .sizes-list,
  .colors-list {
    width: 100%;
  }
  
  .current-price {
    font-size: 1.125rem;
  }
  
  .original-price {
    font-size: 0.8125rem;
  }
  
  .modal-content {
    padding: 1.25rem;
    max-width: 98%;
  }
  
  .size-options {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .color-options {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .option-btn {
    padding: 0.5rem;
    font-size: 0.8125rem;
  }
  
  .color-option {
    min-width: auto;
  }
}
</style>

