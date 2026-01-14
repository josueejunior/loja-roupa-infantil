<template>
  <div v-if="isOpen" class="cart-overlay" @click="$emit('close')">
    <div class="cart-sidebar" @click.stop>
      <div class="cart-header">
        <h2>
          <IconCart class="header-icon" />
          Carrinho de Compras
        </h2>
        <button class="close-cart" @click="$emit('close')">
          <IconClose />
        </button>
      </div>
      
      <div class="cart-content">
        <div v-if="cart.length === 0" class="empty-cart">
          <p>Seu carrinho está vazio</p>
          <span>Adicione produtos para começar!</span>
        </div>
        
        <div v-else class="cart-items">
          <div 
            v-for="(item, index) in cart" 
            :key="`${item.id}-${item.size}-${item.color}`"
            class="cart-item"
          >
            <img 
              :src="item.image" 
              :alt="item.name" 
              class="cart-item-image"
              loading="lazy"
              @error="handleImageError"
            />
            
            <div class="cart-item-info">
              <h4>{{ item.name }}</h4>
              <p class="cart-item-details">
                Tamanho: {{ item.size }} | Cor: {{ item.color }}
              </p>
              <p class="cart-item-price">R$ {{ item.price.toFixed(2) }}</p>
            </div>
            
            <div class="cart-item-controls">
              <div class="quantity-controls">
                <button @click="updateQuantity(index, item.quantity - 1)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="updateQuantity(index, item.quantity + 1)">+</button>
              </div>
              <button class="remove-btn" @click="removeItem(index)">
                <IconTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="cart.length > 0" class="cart-footer">
        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>R$ {{ totalPrice.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Frete:</span>
            <span>{{ shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}` }}</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>R$ {{ (totalPrice + shippingCost).toFixed(2) }}</span>
          </div>
          <div v-if="totalPrice < 200" class="min-order-warning">
            <IconWarning class="warning-icon" />
            <span v-if="remainingForFreeShipping > 0">
              Faltam <strong>R$ {{ remainingForFreeShipping.toFixed(2) }}</strong> para ganhar <strong>frete grátis</strong>.
            </span>
          </div>
        </div>
        
        <button 
          class="checkout-btn" 
          @click="checkout"
          :disabled="totalPrice < 200"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cart';
import IconCart from './icons/IconCart.vue';
import IconClose from './icons/IconClose.vue';
import IconTrash from './icons/IconTrash.vue';
import IconWarning from './icons/IconWarning.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const cartStore = useCartStore();
const { cart, updateQuantity: updateCartQuantity, removeFromCart } = cartStore;

const totalPrice = computed(() => cartStore.totalPrice);
const shippingCost = computed(() => totalPrice.value >= 200 ? 0 : 15.00);
const remainingForFreeShipping = computed(() => {
  const remaining = 200 - totalPrice.value;
  return remaining > 0 ? remaining : 0;
});

const updateQuantity = (index, quantity) => {
  cartStore.updateQuantity(index, quantity);
};

const removeItem = (index) => {
  cartStore.removeFromCart(index);
};

const checkout = () => {
  if (totalPrice.value >= 200) {
    alert('Redirecionando para o pagamento...\n\nForma de pagamento: PIX\nPrazo: 20 minutos');
    cartStore.clearCart();
    emit('close');
  }
};

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300x400/F3F4F6/9CA3AF?text=Imagem+Indisponível';
};
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.cart-sidebar {
  background: white;
  width: 100%;
  max-width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15), -2px 0 12px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.cart-header {
  padding: 1.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(233, 30, 99, 0.2);
}

.cart-header h2 {
  margin: 0;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-icon {
  width: 24px;
  height: 24px;
}

.close-cart {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  cursor: pointer;
  color: white;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease;
}

.close-cart svg {
  width: 20px;
  height: 20px;
}

.close-cart:hover {
  background: rgba(255, 255, 255, 0.2);
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  color: #999;
}

.empty-cart p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  border-radius: 12px;
  border: 1px solid rgba(229, 231, 235, 0.8);
  transition: all 0.2s ease;
}

.cart-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.cart-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cart-item-info h4 {
  margin: 0;
  font-size: 0.95rem;
  color: #333;
}

.cart-item-details {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

.cart-item-price {
  font-weight: bold;
  color: #c2185b;
  margin: 0;
}

.cart-item-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.25rem;
}

.quantity-controls button {
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.quantity-controls button:hover {
  background: #eee;
}

.quantity-controls span {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
}

.remove-btn {
  background: #e91e63;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.remove-btn svg {
  width: 18px;
  height: 18px;
}

.remove-btn:hover {
  background: #c44569;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
  background: #f9f9f9;
}

.cart-summary {
  margin-bottom: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #c2185b;
  padding-top: 0.5rem;
  border-top: 1px solid #ddd;
  margin-top: 0.5rem;
}

.min-order-warning {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #fff3cd;
  color: #856404;
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.warning-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(233, 30, 99, 0.4);
  letter-spacing: 0.5px;
}

.checkout-btn:hover:not(:disabled) {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(194, 24, 91, 0.4);
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Tablet */
@media (max-width: 1024px) {
  .cart-sidebar {
    max-width: 500px;
  }
}

/* Mobile Grande */
@media (max-width: 768px) {
  .cart-sidebar {
    max-width: 100%;
  }
  
  .cart-header {
    padding: 1.25rem;
  }
  
  .cart-header h2 {
    font-size: 1.125rem;
  }
  
  .cart-content {
    padding: 0.875rem;
  }
  
  .cart-item {
    padding: 0.875rem;
    gap: 0.875rem;
  }
  
  .cart-item-image {
    width: 70px;
    height: 70px;
  }
  
  .cart-footer {
    padding: 1.25rem;
  }
}

/* Mobile Médio */
@media (max-width: 640px) {
  .cart-header {
    padding: 1rem;
  }
  
  .cart-content {
    padding: 0.75rem;
  }
  
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
  
  .cart-item-image {
    width: 100%;
    height: 200px;
    border-radius: 8px;
  }
  
  .cart-item-controls {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .cart-footer {
    padding: 1rem;
  }
}

/* Mobile Pequeno */
@media (max-width: 480px) {
  .cart-header {
    padding: 0.875rem;
  }
  
  .cart-header h2 {
    font-size: 1rem;
  }
  
  .header-icon {
    width: 20px;
    height: 20px;
  }
  
  .close-cart {
    width: 28px;
    height: 28px;
  }
  
  .close-cart svg {
    width: 18px;
    height: 18px;
  }
  
  .cart-content {
    padding: 0.625rem;
  }
  
  .cart-item {
    padding: 0.875rem;
  }
  
  .cart-item-image {
    height: 180px;
  }
  
  .cart-item-info h4 {
    font-size: 0.875rem;
  }
  
  .cart-item-details {
    font-size: 0.75rem;
  }
  
  .cart-item-price {
    font-size: 0.9375rem;
  }
  
  .cart-footer {
    padding: 0.875rem;
  }
  
  .summary-row {
    font-size: 0.875rem;
  }
  
  .summary-row.total {
    font-size: 1.125rem;
  }
  
  .checkout-btn {
    padding: 0.875rem;
    font-size: 0.9375rem;
  }
}
</style>

