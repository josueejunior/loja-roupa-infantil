<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">Loja Infantil</h3>
        <p class="footer-description">
          Roupas cheias de charme para crianças. Qualidade e estilo em cada peça.
        </p>
        <div class="social-links">
          <a href="#" class="social-link" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="social-icon">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="social-icon">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Links Rápidos</h4>
        <ul class="footer-links">
          <li><a href="#">Início</a></li>
          <li><a href="#">Produtos</a></li>
          <li><a href="#">Sobre Nós</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Categorias</h4>
        <ul class="footer-links">
          <li><a href="#">Vestidos</a></li>
          <li><a href="#">Macaquitos</a></li>
          <li><a href="#">Conjuntos</a></li>
          <li><a href="#">Calças</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Contato</h4>
        <ul class="footer-contact">
          <li>
            <IconPhone class="contact-icon" />
            <a href="tel:+5587999391998">(87) 99939-1998</a>
          </li>
          <li>
            <IconEmail class="contact-icon" />
            <a href="mailto:contato@lojainfantil.com.br">contato@lojainfantil.com.br</a>
          </li>
          <li>
            <IconTruck class="contact-icon" />
            <span>Frete Grátis acima de R$ 200,00</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2024 Loja Infantil. Todos os direitos reservados.</p>
      <p class="footer-cnpj">CNPJ: 48.569.408/0001-05</p>
    </div>
  </footer>
</template>

<script setup>
import IconPhone from './icons/IconPhone.vue';
import IconEmail from './icons/IconEmail.vue';
import IconTruck from './icons/IconTruck.vue';
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #831843 0%, #9f1239 30%, #be185d 60%, #db2777 100%);
  color: white;
  margin-top: 4rem;
  padding-top: 3rem;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.03) 0px,
      transparent 1px,
      transparent 2px,
      rgba(255, 255, 255, 0.03) 3px
    );
  pointer-events: none;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.5px;
}

.footer-description {
  color: #fce7f3;
  font-size: 0.9375rem;
  line-height: 1.7;
  margin: 0;
  font-weight: 400;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  background: #e91e63;
  transform: translateY(-2px);
}

.social-icon {
  width: 20px;
  height: 20px;
}

.footer-subtitle {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  color: #ffffff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.3px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links li a {
  color: #fce7f3;
  text-decoration: none;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  font-weight: 500;
  display: inline-block;
}

.footer-links li a:hover {
  color: #ffffff;
  transform: translateX(4px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-contact li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fce7f3;
  font-size: 0.9375rem;
  font-weight: 500;
}

.contact-icon {
  width: 20px;
  height: 20px;
  color: #ffffff;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.footer-contact li a {
  color: #fce7f3;
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 500;
}

.footer-contact li a:hover {
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.75rem 2rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.15);
  position: relative;
}

.footer-bottom p {
  margin: 0.375rem 0;
  color: #fce7f3;
  font-size: 0.9375rem;
  font-weight: 500;
}

.footer-cnpj {
  font-size: 0.8125rem !important;
  color: #f9a8d4 !important;
  font-weight: 400 !important;
}

@media (max-width: 768px) {
  .footer {
    margin-top: 2rem;
    padding-top: 2rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    padding: 0 1rem;
    gap: 2rem;
  }
  
  .footer-bottom {
    padding: 1rem;
  }
}
</style>

