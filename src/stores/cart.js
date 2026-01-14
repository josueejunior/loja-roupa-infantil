import { ref, computed } from 'vue';

const cart = ref([]);

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

  const totalItems = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
}

