/**
 * Ana Carolina - Terapeuta Manual
 * Scripts Interativos & Experiência de Usuário Premium
 */

// Configuração do WhatsApp da Profissional (Substitua pelo número real com DDI e DDD)
const WHATSAPP_PHONE = '5562994467074';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicialização do AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: 'mobile' ? false : false
    });
  }

  // 2. Comportamento do Header na Rolagem (Sticky & Blur)
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-[#F9F7F2]/95', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-[#C5A059]/20');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('bg-[#F9F7F2]/95', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-[#C5A059]/20');
      header.classList.add('bg-transparent');
    }
  });

  // 3. Menu Mobile (Drawer / Dropdown)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // 4. Máscara de Telefone / WhatsApp no Formulário
  const phoneInput = document.getElementById('telefone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else {
        value = value.replace(/^(\d*)$/, '$1');
      }
      e.target.value = value;
    });
  }

  // 5. Interação com Cards de Serviços -> Pré-selecionar no Formulário
  const selectServiceBtns = document.querySelectorAll('.btn-select-service');
  const serviceSelect = document.getElementById('procedimento');
  const bookingSection = document.getElementById('agendamento');

  selectServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
        // Efeito sutil de destaque no select
        serviceSelect.classList.add('ring-2', 'ring-[#C5A059]');
        setTimeout(() => {
          serviceSelect.classList.remove('ring-2', 'ring-[#C5A059]');
        }, 1800);
      }
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 6. Formulário de Captura / Agendamento Rápido -> Integração WhatsApp
  const bookingForm = document.getElementById('booking-form');
  const modalSuccess = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const btnWhatsappRedirect = document.getElementById('btn-whatsapp-redirect');
  const modalCustomerName = document.getElementById('modal-customer-name');
  const modalProcedure = document.getElementById('modal-procedure');

  let pendingWhatsappUrl = '';

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome')?.value.trim() || '';
      const telefone = document.getElementById('telefone')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const procedimento = document.getElementById('procedimento')?.value || 'Terapia Manual Integrativa';
      const observacao = document.getElementById('observacao')?.value.trim() || '';

      if (!nome || !telefone) {
        alert('Por favor, preencha pelo menos seu Nome e WhatsApp para entrarmos em contato.');
        return;
      }

      // Monta mensagem de alta conversão para o WhatsApp
      let msg = `Olá, Ana Carolina! Gostaria de agendar uma sessão de Terapia Manual.\n\n`;
      msg += `*Nome:* ${nome}\n`;
      msg += `*WhatsApp:* ${telefone}\n`;
      if (email) msg += `*E-mail:* ${email}\n`;
      msg += `*Procedimento de Interesse:* ${procedimento}\n`;
      if (observacao) msg += `*Observações/Queixa:* ${observacao}\n\n`;
      msg += `Aguardo seu retorno para verificar disponibilidade de horários. Muito obrigado(a)!`;

      const encodedMsg = encodeURIComponent(msg);
      pendingWhatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedMsg}`;

      // Atualiza dados no Modal
      if (modalCustomerName) modalCustomerName.textContent = nome;
      if (modalProcedure) modalProcedure.textContent = procedimento;

      // Exibe Modal de Sucesso
      if (modalSuccess) {
        modalSuccess.classList.remove('hidden');
        modalSuccess.classList.add('flex');
      }

      // Limpa formulário
      bookingForm.reset();
    });
  }

  // Ações do Modal de Sucesso
  if (btnWhatsappRedirect) {
    btnWhatsappRedirect.addEventListener('click', () => {
      if (pendingWhatsappUrl) {
        window.open(pendingWhatsappUrl, '_blank');
      }
      if (modalSuccess) {
        modalSuccess.classList.add('hidden');
        modalSuccess.classList.remove('flex');
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (modalSuccess) {
        modalSuccess.classList.add('hidden');
        modalSuccess.classList.remove('flex');
      }
    });
  }

  // Fechar modal ao clicar fora
  if (modalSuccess) {
    modalSuccess.addEventListener('click', (e) => {
      if (e.target === modalSuccess) {
        modalSuccess.classList.add('hidden');
        modalSuccess.classList.remove('flex');
      }
    });
  }

  // 7. Accordion de Dúvidas Frequentes (FAQ)
  const faqButtons = document.querySelectorAll('.faq-toggle-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isAlreadyOpen = content.classList.contains('open');

      // Fecha outros abertos
      document.querySelectorAll('.faq-content').forEach(c => {
        c.classList.remove('open');
      });
      document.querySelectorAll('.faq-icon').forEach(i => {
        i.classList.remove('open');
      });

      // Abre o atual se não estava aberto
      if (!isAlreadyOpen) {
        content.classList.add('open');
        if (icon) icon.classList.add('open');
      }
    });
  });

  // 8. Botão Flutuante de WhatsApp e Links Gerais de WhatsApp
  const generalWhatsappBtns = document.querySelectorAll('.btn-whatsapp-direct');
  generalWhatsappBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customText = btn.getAttribute('data-message') ||
        'Olá, Ana Carolina! Gostaria de saber mais sobre a Terapia Manual e verificar disponibilidade de horários.';
      const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(customText)}`;
      window.open(url, '_blank');
    });
  });

  // 9. Smooth Scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
