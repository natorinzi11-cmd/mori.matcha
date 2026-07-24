// MORI MATCHA - Interactive Features

// Loader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 600);
});

// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  // active nav
  const sections = document.querySelectorAll('section[id]');
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) cur = s.id;
  });
  document.querySelectorAll('#nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${cur}`);
  });
});

// Burger
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  nav.classList.remove('open');
}));

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Menu filters
const filterBtns = document.querySelectorAll('.filter-btn');
const drinks = document.querySelectorAll('.drink');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    drinks.forEach(d => {
      const cat = d.dataset.category;
      const show = f === 'all' || cat === f;
      d.classList.toggle('hide', !show);
      if (show) {
        d.style.animation = 'none';
        d.offsetHeight;
        d.style.animation = null;
      }
    });
  });
});

// Cart logic
let cart = JSON.parse(localStorage.getItem('mori_cart') || '[]');

const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const cartItemsEl = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total-price');

function saveCart() {
  localStorage.setItem('mori_cart', JSON.stringify(cart));
}

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCartFn() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('show');
  document.body.style.overflow = '';
}
cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartFn);
cartOverlay.addEventListener('click', closeCartFn);

function updateCartUI() {
  const totalCount = cart.reduce((s, i) => s + i.qty, 0);
  cartCountEl.textContent = totalCount;
  cartCountEl.style.display = totalCount ? 'inline-flex' : 'none';

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<div class="empty-cart"><div style="font-size:42px">🍃</div><p>Your cart is empty<br><small>Add something tasty!</small></p></div>`;
    cartTotalEl.textContent = '$0.00';
    saveCart();
    return;
  }

  cartItemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <img src="${item.img || ''}" onerror="this.style.background='#fffaf8'" alt="">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)} each</p>
        <div class="qty">
          <button onclick="changeQty(${idx}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${idx}, 1)">+</button>
          <button onclick="removeItem(${idx})" style="margin-left:8px;border-color:#ffd0d0;color:#e05a5a">✕</button>
        </div>
      </div>
      <b>$${(item.price * item.qty).toFixed(2)}</b>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
  saveCart();
}

window.changeQty = (idx, delta) => {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
}
window.removeItem = (idx) => {
  cart.splice(idx, 1);
  updateCartUI();
  toast('Removed from cart');
}

document.querySelectorAll('.drink').forEach(card => {
  const btn = card.querySelector('.add-btn');
  btn.addEventListener('click', () => {
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const imgEl = card.querySelector('img');
    const img = imgEl ? imgEl.src : '';
    const existing = cart.find(i => i.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, price, qty: 1, img });

    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = '+ Add'; btn.classList.remove('added'); }, 1200);

    updateCartUI();
    toast(`${name} added to cart 🍵`, 'success');
    // auto open on first add
    if (cart.length === 1) openCart();
  });
});

updateCartUI();

// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (!cart.length) return toast('Cart empty', 'error');
  toast('Order placed! See you in 15 min 🌸', 'success');
  cart = [];
  updateCartUI();
  closeCartFn();
});

// Toast system
const toastContainer = document.getElementById('toast-container');
function toast(msg, type = '') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  toastContainer.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px) scale(.95)';
    setTimeout(() => t.remove(), 300);
  }, 2800);
}

// Booking form
const bookingForm = document.getElementById('booking-form');
const dateInput = document.getElementById('book-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  dateInput.valueAsDate = new Date(Date.now() + 86400000);
}
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(bookingForm);
  const name = fd.get('name').trim();
  const email = fd.get('email').trim();
  const date = fd.get('date');
  const time = fd.get('time');

  if (name.length < 2) return toast('Please enter your name', 'error');
  if (!email.includes('@')) return toast('Invalid email', 'error');
  if (!date) return toast('Pick a date', 'error');
  if (!time) return toast('Pick a time', 'error');

  const chosen = new Date(date + 'T' + time);
  if (chosen < new Date()) return toast('Choose a future time', 'error');

  // Save bookings to localStorage
  const bookings = JSON.parse(localStorage.getItem('mori_bookings') || '[]');
  bookings.push({ name, email, date, time, guests: fd.get('guests'), notes: fd.get('notes'), at: Date.now() });
  localStorage.setItem('mori_bookings', JSON.stringify(bookings));

  toast(`Reserved! See you ${date} at ${time}, ${name} 🌿`, 'success');
  bookingForm.reset();
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
    dateInput.valueAsDate = new Date(Date.now() + 86400000);
  }
});

// Parallax-ish mouse for hero
const heroWrap = document.querySelector('.hero-img-wrap');
if (heroWrap) {
  heroWrap.addEventListener('mousemove', (e) => {
    const rect = heroWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroWrap.querySelector('.hero-img').style.transform = `translate(${x*12}px, ${y*12}px)`;
    heroWrap.querySelectorAll('.float-card').forEach((c, i) => {
      c.style.transform = `translate(${x* (10+i*6)}px, ${y* (10+i*6)}px)`;
    });
  });
  heroWrap.addEventListener('mouseleave', () => {
    heroWrap.querySelector('.hero-img').style.transform = '';
    heroWrap.querySelectorAll('.float-card').forEach(c => c.style.transform = '');
  });
}

console.log('%c🍃 Mori Matcha — made by hand, not by robot. If something breaks, tell me.', 'color:#6c8d4d;font-size:13px;font-weight:600');
