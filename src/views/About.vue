<template>
  <div class="app">
    <Header />
    
    <main class="about-main">
      <div class="about-container">
        <div class="about-header">
          <h1>Sobre Nós</h1>
          <p class="about-subtitle">Roupas cheias de charme para crianças</p>
        </div>

        <section class="about-content">
          <div class="about-section">
            <h2>Nossa História</h2>
            <p>
              Bem-vindos à nossa loja infantil! Somos apaixonados por roupas que combinam 
              estilo, conforto e qualidade para as crianças. Cada peça é selecionada com 
              muito carinho, pensando no bem-estar e na felicidade dos pequenos.
            </p>
            <p>
              Nossa missão é oferecer roupas que façam as crianças se sentirem especiais, 
              enquanto os pais têm a tranquilidade de saber que estão investindo em produtos 
              de qualidade e durabilidade.
            </p>
          </div>

          <div class="about-section">
            <h2>Nossos Valores</h2>
            <div class="values-grid">
              <div class="value-card">
                <div class="value-icon">✨</div>
                <h3>Qualidade</h3>
                <p>Selecionamos apenas os melhores produtos para suas crianças</p>
              </div>
              <div class="value-card">
                <div class="value-icon">💝</div>
                <h3>Carinho</h3>
                <p>Cada peça é escolhida com muito amor e atenção aos detalhes</p>
              </div>
              <div class="value-card">
                <div class="value-icon">🎨</div>
                <h3>Estilo</h3>
                <p>Roupas modernas e cheias de charme para os pequenos</p>
              </div>
              <div class="value-card">
                <div class="value-icon">🤝</div>
                <h3>Confiança</h3>
                <p>Atendimento dedicado e compromisso com sua satisfação</p>
              </div>
            </div>
          </div>

          <div class="about-section">
            <h2>Por que escolher a gente?</h2>
            <ul class="features-list">
              <li>
                <strong>Frete Grátis</strong> para compras acima de R$ 200,00
              </li>
              <li>
                <strong>Pagamento Rápido</strong> via PIX em até 20 minutos
              </li>
              <li>
                <strong>Produtos Selecionados</strong> com muito cuidado e atenção
              </li>
              <li>
                <strong>Atendimento Personalizado</strong> para melhor experiência
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>

    <ShoppingCart :is-open="cartStore.isCartOpen.value" @close="cartStore.closeCart" />
    <Footer />
    <WhatsAppButton />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import WhatsAppButton from '../components/WhatsAppButton.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();
</script>

<style scoped>
.about-main {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
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
    radial-gradient(circle at 10% 20%, rgba(252, 231, 243, 0.95) 0, transparent 45%),
    radial-gradient(circle at 90% 10%, rgba(255, 228, 230, 0.9) 0, transparent 45%),
    linear-gradient(to bottom, #fff7fb 0%, #ffeaf3 35%, #ffe4f0 70%, #fde7f3 100%);
}

.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.about-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;
}

.about-subtitle {
  font-size: 1.25rem;
  color: #4b5563;
  margin: 0;
  font-weight: 500;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.about-section {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.about-section h2 {
  font-size: 1.875rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.5px;
}

.about-section p {
  font-size: 1.0625rem;
  color: #374151;
  line-height: 1.8;
  margin: 0 0 1rem 0;
  font-weight: 400;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.value-card {
  text-align: center;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.value-card:hover {
  transform: translateY(-4px);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.value-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.value-card p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.features-list li {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #e91e63;
  font-size: 1rem;
  color: #4b5563;
}

.features-list strong {
  color: #e91e63;
  font-weight: 600;
}

@media (max-width: 768px) {
  .about-container {
    padding: 0 1rem;
  }

  .about-header h1 {
    font-size: 2rem;
  }

  .about-section {
    padding: 1.5rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>

