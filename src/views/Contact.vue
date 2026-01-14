<template>
  <div class="app">
    <Header />
    
    <main class="contact-main">
      <div class="contact-container">
        <div class="contact-header">
          <h1>Entre em Contato</h1>
          <p class="contact-subtitle">Estamos aqui para ajudar você!</p>
        </div>

        <div class="contact-content">
          <div class="contact-info">
            <h2>Informações de Contato</h2>
            
            <div class="info-cards">
              <div class="info-card">
                <div class="info-icon">📞</div>
                <div>
                  <h3>Telefone</h3>
                  <a href="tel:+5587999391998" class="info-link">
                    (87) 99939-1998
                  </a>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">✉️</div>
                <div>
                  <h3>E-mail</h3>
                  <a href="mailto:contato@lojainfantil.com.br" class="info-link">
                    contato@lojainfantil.com.br
                  </a>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">💬</div>
                <div>
                  <h3>WhatsApp</h3>
                  <a 
                    href="https://wa.me/5587999391998?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos." 
                    target="_blank"
                    class="info-link"
                  >
                    Fale conosco no WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div class="contact-hours">
              <h3>Horário de Atendimento</h3>
              <p>Segunda a Sexta: 9h às 18h</p>
              <p>Sábado: 9h às 13h</p>
              <p>Domingo: Fechado</p>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <h2>Envie sua Mensagem</h2>
            <form class="contact-form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name"
                  required
                  placeholder="Seu nome"
                />
              </div>

              <div class="form-group">
                <label for="email">E-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div class="form-group">
                <label for="phone">Telefone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone"
                  placeholder="(87) 99999-9999"
                />
              </div>

              <div class="form-group">
                <label for="subject">Assunto</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject"
                  required
                  placeholder="Sobre o que você quer falar?"
                />
              </div>

              <div class="form-group">
                <label for="message">Mensagem</label>
                <textarea 
                  id="message" 
                  v-model="form.message"
                  required
                  rows="5"
                  placeholder="Escreva sua mensagem aqui..."
                ></textarea>
              </div>

              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">Enviar Mensagem</span>
                <span v-else>Enviando...</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>

    <ShoppingCart :is-open="cartStore.isCartOpen.value" @close="cartStore.closeCart" />
    <Footer />
    <WhatsAppButton />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import WhatsAppButton from '../components/WhatsAppButton.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();
const isSubmitting = ref(false);

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const handleSubmit = () => {
  isSubmitting.value = true;
  
  // Simular envio (aqui você integraria com um backend real)
  setTimeout(() => {
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
    isSubmitting.value = false;
  }, 1000);
};
</script>

<style scoped>
.contact-main {
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
    linear-gradient(to bottom, #ffffff 0%, #fffefb 30%, #fff5f8 60%, #ffffff 100%);
}

.contact-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.contact-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #f9739b 0%, #ec4899 40%, #db2777 75%, #be185d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;
}

.contact-subtitle {
  font-size: 1.25rem;
  color: #4b5563;
  margin: 0;
  font-weight: 500;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2rem;
}

.contact-info,
.contact-form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.contact-info h2,
.contact-form-wrapper h2 {
  font-size: 1.625rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.3px;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.info-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem;
  background: #f9fafb;
  border-radius: 12px;
  border-left: 4px solid #e91e63;
}

.info-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.info-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.info-link {
  color: #e91e63;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.info-link:hover {
  color: #c2185b;
  text-decoration: underline;
}

.contact-hours {
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.contact-hours h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
}

.contact-hours p {
  font-size: 0.9375rem;
  color: #6b7280;
  margin: 0.5rem 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-family: inherit;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #e91e63;
  box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #f9739b 0%, #ec4899 40%, #db2777 75%, #be185d 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.4);
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(233, 30, 99, 0.5);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contact-container {
    padding: 0 1rem;
  }

  .contact-header h1 {
    font-size: 2rem;
  }

  .contact-info,
  .contact-form-wrapper {
    padding: 1.5rem;
  }
}
</style>

