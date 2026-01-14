import { ref, computed } from 'vue';

const cart = ref([]);
const isCartOpen = ref(false);

export function useCartStore() {
  const addToCart = (product, selectedSize, selectedColor) => {
    const existingItem = cart.value.find(
      item => item.id === product.id && 
      item.size === selectedSize && 
      item.color === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity: 1
      });
    }
  };

  const removeFromCart = (index) => {
    cart.value.splice(index, 1);
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeFromCart(index);
    } else {
      cart.value[index].quantity = quantity;
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const openCart = () => {
    isCartOpen.value = true;
  };

  const closeCart = () => {
    isCartOpen.value = false;
  };

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };

  const totalItems = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    const total = cart.value.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + (price * quantity);
    }, 0);
    return Number.isNaN(total) ? 0 : total;
  });

  return {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    totalItems,
    totalPrice
  };
}

