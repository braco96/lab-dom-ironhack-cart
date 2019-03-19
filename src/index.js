// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  // Obtenemos el precio del producto desde el span correspondiente
  const price = Number(product.querySelector('.price span').textContent);
  // Recuperamos la cantidad introducida por el usuario en el input
  const quantity = Number(product.querySelector('.quantity input').value);

  //... your code goes here
  // Calculamos el subtotal multiplicando precio por cantidad
  const subtotal = price * quantity;
  // Mostramos el subtotal calculado en la celda del DOM
  product.querySelector('.subtotal span').textContent = subtotal.toFixed(2);

  // Devolvemos el subtotal para poder reutilizarlo
  return subtotal;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  const singleProduct = document.querySelector('.product');
  updateSubtotal(singleProduct);
  // end of test
  // Seleccionamos todos los productos del carrito
  const products = document.querySelectorAll('.product');
  // Inicializamos el total en cero para acumularlo
  let total = 0;

  // ITERATION 2
  //... your code goes here
  // Recorremos cada producto y sumamos sus subtotales
  products.forEach(product => {
    total += updateSubtotal(product);
  });

  // ITERATION 3
  //... your code goes here
  // Mostramos el total acumulado en la sección correspondiente
  document.querySelector('#total-value span').textContent = total.toFixed(2);
}

// ITERATION 4

function removeProduct(event) {
  // Identificamos el botón que disparó el evento
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  //... your code goes here
  // Eliminamos la fila del producto del DOM
  target.closest('.product').remove();
  // Recalculamos el total tras la eliminación
  calculateAll();
}

// ITERATION 5

function createProduct() {
  //... your code goes here
  // Obtenemos la fila de creación y los valores introducidos
  const createRow = document.querySelector('.create-product');
  const name = createRow.querySelector('input[type="text"]').value;
  const price = Number(createRow.querySelector('input[type="number"]').value);

  // Creamos una nueva fila de producto usando los valores dados
  const newProduct = document.createElement('tr');
  newProduct.classList.add('product');
  newProduct.innerHTML = `
    <td class="name"><span>${name}</span></td>
    <td class="price">$<span>${price.toFixed(2)}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

  // Añadimos la nueva fila al cuerpo de la tabla
  document.querySelector('#cart tbody').appendChild(newProduct);
  // Asociamos el evento de eliminar al botón de la nueva fila
  newProduct.querySelector('.btn-remove').addEventListener('click', removeProduct);

  // Reseteamos los campos del formulario de creación
  createRow.querySelector('input[type="text"]').value = '';
  createRow.querySelector('input[type="number"]').value = 0;
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //... your code goes here
  // Asignamos eventos de eliminar a todos los botones existentes
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', removeProduct);
  });

  // Añadimos el evento para crear nuevos productos
  document.getElementById('create').addEventListener('click', createProduct);
});