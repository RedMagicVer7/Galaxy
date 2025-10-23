const loadSharedLayout = async () => {
  try {
    const response = await fetch('layout.html');
    if (!response.ok) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(await response.text(), 'text/html');

    const sharedHeader = doc.querySelector('header.site-header');
    const sharedFooter = doc.querySelector('footer.site-footer');

    if (sharedHeader) {
      const currentHeader = document.querySelector('header.site-header');
      if (currentHeader && currentHeader !== sharedHeader) {
        currentHeader.replaceWith(sharedHeader.cloneNode(true));
      }
    }

    if (sharedFooter) {
      const currentFooter = document.querySelector('footer.site-footer');
      if (currentFooter && currentFooter !== sharedFooter) {
        currentFooter.replaceWith(sharedFooter.cloneNode(true));
      }
    }
  } catch (error) {
    console.error('Failed to load shared layout', error);
  }
};

loadSharedLayout().then(() => {
  const menuToggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});

