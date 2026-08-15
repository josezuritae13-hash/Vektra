    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const mobileLinks = mobileMenu?.querySelectorAll('a');

    const setMenuState = (isOpen) => {
      mobileMenu.classList.toggle('hidden', !isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    };

    menuBtn.addEventListener('click', () => {
      setMenuState(mobileMenu.classList.contains('hidden'));
    });

    menuCloseBtn?.addEventListener('click', () => {
      setMenuState(false);
    });

    mobileLinks?.forEach((link) => {
      link.addEventListener('click', () => {
        setMenuState(false);
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        setMenuState(false);
      }
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('shadow-sm');
        header.querySelector('.mt-4')?.classList.add('border-slate-200');
      } else {
        header.classList.remove('shadow-sm');
        header.querySelector('.mt-4')?.classList.remove('border-slate-200');
      }
    });

window.addEventListener("load", () => {

    const splash = document.getElementById("splash-screen");

    setTimeout(() => {

        splash.classList.add("hidden");

        setTimeout(() => {

            splash.remove();

        }, 800);

    }, 1500);

});