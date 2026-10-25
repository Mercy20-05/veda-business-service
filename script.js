document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Close menu when clicking link (mobile experience)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // Active Link Tracking via Intersection Observer
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${currentId}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));

  // FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other accordions
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Contact Form Submission Handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !email) {
        formStatus.textContent = 'Please fill out all required fields.';
        formStatus.style.color = '#ef4444';
        return;
      }

      // Simulate sending feedback
      formStatus.textContent = 'Submitting message...';
      formStatus.style.color = '#2563eb';

      setTimeout(() => {
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.style.color = '#16a34a';
        contactForm.reset();

        setTimeout(() => {
          formStatus.textContent = '';
        }, 5000);
      }, 1000);
    });
  }
});