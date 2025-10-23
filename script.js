/* --- CATÁLOGO DE PRODUCTOS COMPLETO --- */
const productosCatalogo = [
  // Metros
  { id: 'm1', nombre: 'Metro Stanley 3m', precio: 45.00, tipo: 'Medición', marca: 'Stanley', longitud: '3m', img: 'imagenes/metro_stanley3.avif' },
  { id: 'm2', nombre: 'Metro Stanley 5m', precio: 65.00, tipo: 'Medición', marca: 'Stanley', longitud: '5m', img: 'imagenes/metro_stanley5.jpg' },
  { id: 'm3', nombre: 'Metro Bosch 3m', precio: 42.00, tipo: 'Medición', marca: 'Bosch', longitud: '3m', img: 'imagenes/metro_bosch3.jpg' },
  { id: 'm4', nombre: 'Metro Bosch 5m', precio: 62.00, tipo: 'Medición', marca: 'Bosch', longitud: '5m', img: 'imagenes/metro_bosch5.jpg' },
  { id: 'm5', nombre: 'Metro Truper 3m', precio: 38.00, tipo: 'Medición', marca: 'Truper', longitud: '3m', img: 'imagenes/metro_truper3.jpg' },
  { id: 'm6', nombre: 'Metro Truper 5m', precio: 58.00, tipo: 'Medición', marca: 'Truper', longitud: '5m', img: 'imagenes/metro_truper5.jpg' },

  // Tubos PVC
  { id: 'pvc1', nombre: 'Tubo PVC 1/2" x 3m', precio: 28.00, tipo: 'Tubería', marca: 'Genérica', img: 'imagenes/tubo_pvc.jpg' },
  { id: 'pvc2', nombre: 'Tubo PVC 1" x 3m', precio: 45.00, tipo: 'Tubería', marca: 'Genérica', img: 'imagenes/tubo_pvc.jpg' },

  // Martillos
  { id: 'mart1', nombre: 'Martillo de uña 16oz', precio: 48.00, tipo: 'Herramienta', marca: 'Stanley', img: 'imagenes/martillo.jpg' },
  { id: 'mart2', nombre: 'Martillo rompe pavimento 3kg', precio: 120.00, tipo: 'Herramienta', marca: 'Truper', img: 'imagenes/martillo_grande.jpg' },

  // Taladros
  { id: 'tal1', nombre: 'Taladro Dewalt 18V', precio: 950.00, tipo: 'Electrodoméstico', marca: 'DeWalt', img: 'imagenes/taladro_dewalt.jpg' },
  { id: 'tal2', nombre: 'Taladro Bosch 12V', precio: 720.00, tipo: 'Electrodoméstico', marca: 'Bosch', img: 'imagenes/taladro_bosch.jpg' },
  { id: 'taladro-perc', nombre: 'Taladro Percutor 800W', precio: 560.00, tipo: 'Electrodoméstico', marca: 'Bosch', img: 'imagenes/taladro_percutor.jpg' },

  // Pulidoras
  { id: 'pul1', nombre: 'Pulidora 7" 1200W', precio: 480.00, tipo: 'Electrodoméstico', marca: 'Truper', img: 'imagenes/pulidora.jpg' },

  // Lijas
  { id: 'lija1', nombre: 'Lija 80 (pack 10)', precio: 12.00, tipo: 'Abrasivo', marca: 'Genérica', img: 'imagenes/lija.jpg' },
  { id: 'lija2', nombre: 'Lija 120 (pack 10)', precio: 14.00, tipo: 'Abrasivo', marca: 'Genérica', img: 'imagenes/lija.jpg' },

  // Pinturas
  { id: 'paint1', nombre: 'Pintura Interior Blanco 1L', precio: 95.00, tipo: 'Pintura', marca: 'Sherwin', color: 'Blanco', img: 'imagenes/pintura_blanco.jpg' },
  { id: 'paint2', nombre: 'Pintura Interior Gris 1L', precio: 98.00, tipo: 'Pintura', marca: 'Sherwin', color: 'Gris', img: 'imagenes/pintura_gris.png' },
  { id: 'paint3', nombre: 'Pintura Roja 1L', precio: 100.00, tipo: 'Pintura', marca: 'Sherwin', color: 'Rojo', img: 'imagenes/pintura_rojo.png' },

  // Clavos y tornillos
  { id: 'clav1', nombre: 'Clavos bolsa 1 lb', precio: 12.00, tipo: 'Accesorio', marca: 'Genérica', img: 'imagenes/clavos.jpg' },
  { id: 'tor1', nombre: 'Tornillos 1" (pack 50)', precio: 28.00, tipo: 'Accesorio', marca: 'Genérica', img: 'imagenes/tornillos.jpg' },

  // Otros
  { id: 'sierra1', nombre: 'Sierra de mano 22"', precio: 75.00, tipo: 'Herramienta', marca: 'Tramontina', img: 'imagenes/sierra.jpg' },
];

/* --- ESTADO DEL CARRITO --- */
let carrito = JSON.parse(localStorage.getItem('carrito-ferre')) || [];

function formatoPrecio(n) {
  return Number(n).toFixed(2);
}

/* --- RENDER PRODUCTOS --- */
function renderProductos(lista) {
  const cont = document.getElementById('productos');
  if (!cont) return;
  cont.innerHTML = '';

  lista.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}" onerror="this.src='imagenes/placeholder.jpg'">
      <h3>${p.nombre}</h3>
      <div class="meta">${p.tipo} • ${p.marca}</div>
      <p>Q${formatoPrecio(p.precio)}</p>
      <button data-id="${p.id}" class="btn-agregar">Agregar al carrito</button>
    `;
    cont.appendChild(div);
  });

  document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.dataset.id;
      const producto = productosCatalogo.find(x => x.id === id);
      if (producto) agregarCarrito(producto);
    });
  });
}


/* --- BUSCADOR Y FILTROS --- */
function configurarBuscador() {
  const buscador = document.getElementById("buscador");
  const filtroTipo = document.getElementById("filtro-tipo");
  const filtroMarca = document.getElementById("filtro-marca");
  const precioMin = document.getElementById("precio-min");
  const precioMax = document.getElementById("precio-max");
  const orden = document.getElementById("orden");
  const btnAplicar = document.getElementById("btn-aplicar");
  const btnLimpiar = document.getElementById("btn-limpiar");

  if (!buscador) return;

  // Llenar opciones de tipo y marca dinámicamente
  const tipos = [...new Set(productosCatalogo.map(p => p.tipo))];
  const marcas = [...new Set(productosCatalogo.map(p => p.marca))];

  tipos.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    filtroTipo.appendChild(opt);
  });

  marcas.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    filtroMarca.appendChild(opt);
  });

  // Función de filtrado general
  function filtrarProductos() {
    let lista = [...productosCatalogo];
    const texto = buscador.value.toLowerCase().trim();
    const tipo = filtroTipo.value;
    const marca = filtroMarca.value;
    const min = parseFloat(precioMin.value) || 0;
    const max = parseFloat(precioMax.value) || Infinity;
    const criterio = orden.value;

    // Filtros
    lista = lista.filter(p => {
      const coincideTexto = p.nombre.toLowerCase().includes(texto);
      const coincideTipo = tipo ? p.tipo === tipo : true;
      const coincideMarca = marca ? p.marca === marca : true;
      const coincidePrecio = p.precio >= min && p.precio <= max;
      return coincideTexto && coincideTipo && coincideMarca && coincidePrecio;
    });

    // Ordenamiento
    if (criterio === "nombre-asc") lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (criterio === "precio-asc") lista.sort((a, b) => a.precio - b.precio);
    if (criterio === "precio-desc") lista.sort((a, b) => b.precio - a.precio);

    renderProductos(lista);
  }

  buscador.addEventListener("input", filtrarProductos);
  filtroTipo.addEventListener("change", filtrarProductos);
  filtroMarca.addEventListener("change", filtrarProductos);
  orden.addEventListener("change", filtrarProductos);
  btnAplicar.addEventListener("click", filtrarProductos);

  btnLimpiar.addEventListener("click", () => {
    buscador.value = "";
    filtroTipo.value = "";
    filtroMarca.value = "";
    precioMin.value = "";
    precioMax.value = "";
    orden.value = "default";
    renderProductos(productosCatalogo);
  });
}


/* --- CARRITO --- */
function agregarCarrito(producto) {
  const idx = carrito.findIndex(i => i.id === producto.id);
  if (idx > -1) carrito[idx].cantidad += 1;
  else carrito.push({ ...producto, cantidad: 1 });
  guardarCarrito();
  mostrarCarrito();
  abrirPanel();
}

function quitarItem(id) {
  carrito = carrito.filter(i => i.id !== id);
  guardarCarrito();
  mostrarCarrito();
}

function cambiarCantidad(id, delta) {
  const idx = carrito.findIndex(i => i.id === id);
  if (idx === -1) return;
  carrito[idx].cantidad += delta;
  if (carrito[idx].cantidad <= 0) carrito.splice(idx, 1);
  guardarCarrito();
  mostrarCarrito();
}

function guardarCarrito() {
  localStorage.setItem('carrito-ferre', JSON.stringify(carrito));
}

function calcularTotal() {
  return carrito.reduce((acc, it) => acc + (it.precio * (it.cantidad || 1)), 0);
}

function mostrarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalEl = document.getElementById('total');
  const contador = document.getElementById('contador-carrito');

  if (!lista) return;

  lista.innerHTML = '';
  if (carrito.length === 0) {
    lista.innerHTML = '<li class="empty">Tu carrito está vacío</li>';
    totalEl.textContent = 'Total: Q0.00';
    contador.textContent = '0';
    return;
  }

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.className = 'item-carrito';
    li.innerHTML = `
      <img src="${item.img}" alt="">
      <div class="item-info">
        <b>${item.nombre}</b>
        <div>Q${formatoPrecio(item.precio)} x ${item.cantidad}</div>
      </div>
      <div class="item-actions">
        <button class="small-btn" data-action="dec" data-id="${item.id}">−</button>
        <button class="small-btn" data-action="inc" data-id="${item.id}">+</button>
        <button class="small-btn" data-action="remove" data-id="${item.id}">🗑️</button>
      </div>
    `;
    lista.appendChild(li);
  });

  totalEl.textContent = `Total: Q${formatoPrecio(calcularTotal())}`;
  contador.textContent = carrito.reduce((a, b) => a + (b.cantidad || 0), 0);

  lista.querySelectorAll('.small-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.dataset.id;
      const action = e.currentTarget.dataset.action;
      if (action === 'dec') cambiarCantidad(id, -1);
      if (action === 'inc') cambiarCantidad(id, 1);
      if (action === 'remove') quitarItem(id);
    });
  });
}

/* --- PANEL DEL CARRITO --- */
function abrirPanel() {
  document.getElementById('panel-carrito').classList.add('open');
}
function cerrarPanel() {
  document.getElementById('panel-carrito').classList.remove('open');
}

/* --- PAGAR CON STRIPE --- */
async function iniciarPagoStripe() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: carrito }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("No se pudo iniciar el pago ❌");
      console.error("Respuesta del servidor:", data);
    }
  } catch (error) {
    console.error("Error al iniciar el pago:", error);
    alert("Hubo un problema al conectar con el servidor de pagos.");
  }
}

/* --- INICIALIZACIÓN --- */
document.addEventListener("DOMContentLoaded", () => {
  renderProductos(productosCatalogo);
  mostrarCarrito();
  configurarBuscador(); // 🔍 activa el buscador y filtros
  document.getElementById('btn-carrito')?.addEventListener('click', abrirPanel);
  document.getElementById('cerrar-panel')?.addEventListener('click', cerrarPanel);
  document.getElementById('vaciar-carrito')?.addEventListener('click', () => {
    if (confirm('¿Vaciar carrito?')) {
      carrito = [];
      guardarCarrito();
      mostrarCarrito();
    }
  });
  document.getElementById('checkout')?.addEventListener('click', iniciarPagoStripe);
  
  
  // --- Render de productos destacados ---
  const destacados = productosCatalogo.slice(0, 6);
  const cont = document.getElementById('productos-destacados');
  if (cont) {
    cont.innerHTML = '';
    destacados.forEach(p => {
      const div = document.createElement('div');
      div.className = 'producto';
      div.innerHTML = `
        <img src="${p.img}" alt="${p.nombre}" onerror="this.src='imagenes/placeholder.jpg'">
        <h3>${p.nombre}</h3>
        <p>Q${p.precio.toFixed(2)}</p>
        <button data-id="${p.id}" class="btn-agregar">Agregar al carrito</button>
      `;
      cont.appendChild(div);
    });

    // activar botones agregar
    cont.querySelectorAll('.btn-agregar').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.currentTarget.dataset.id;
        const prod = productosCatalogo.find(p => p.id === id);
        if (prod) agregarCarrito(prod);
      });
    });
  }

  // Simula carga inicial
  const loader = document.getElementById('loader');
  const contenido = document.getElementById('contenido');
  if (loader && contenido) {
    setTimeout(() => {
      loader.style.display = 'none';
      contenido.style.display = 'block';
    }, 1200);
  }
});
//carrusel de inicio 
const images = document.querySelectorAll(".carousel img");
let current = 0;

setInterval(() => {
  images[current].classList.remove("active");
  current = (current + 1) % images.length;
  images[current].classList.add("active");
}, 4000);
