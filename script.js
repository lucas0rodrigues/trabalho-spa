const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');

let products = [];

function renderProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        
        const productInfo = document.createElement('div');
        productInfo.innerHTML = `<span>${product.name} - ${product.price}</span>`;
        
        const buttonsDiv = document.createElement('div');
        
        const editButton = document.createElement('button');
        editButton.textContent = "Editar";
        editButton.onclick = () => editProduct(index);
        editButton.classList.add('edit-button');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Excluir";
        deleteButton.onclick = () => deleteProduct(index);
        
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(document.createTextNode("\u00A0")); 
        buttonsDiv.appendChild(deleteButton);
        
        productItem.appendChild(productInfo);
        productItem.appendChild(buttonsDiv);
        
        productList.appendChild(productItem);
    });
}

function addProduct(name, price) {
    const product = {
        name: name,
        price: price
    };
    products.push(product);
    renderProducts();
}

function editProduct(index) {
    const newName = prompt('Nome:');
    const newPrice = prompt('Preço:');
    if (newName !== null && newPrice !== null) {
        products[index].name = newName;
        products[index].price = newPrice;
        renderProducts();
    }
}

function deleteProduct(index) {
        products.splice(index, 1);
        renderProducts();
    
}

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = productNameInput.value.trim();
    const productPrice = productPriceInput.value.trim();
    if (productName !== '' && productPrice !== '') {
        addProduct(productName, productPrice);
        productNameInput.value = '';
        productPriceInput.value = '';
    }
});

function showEditPopup(index) {
    const editModal = document.getElementById('edit-product-modal');
    const editForm = document.getElementById('edit-product-form');
    const editNameInput = document.getElementById('edit-product-name');
    const editPriceInput = document.getElementById('edit-product-price');
    
    const product = products[index];
    editNameInput.value = product.name;
    editPriceInput.value = product.price;

    editModal.style.display = 'block';

    const closeButton = document.querySelector('.close');
    closeButton.onclick = function() {
        editModal.style.display = 'none';
    }

    editForm.onsubmit = function(e) {
        e.preventDefault();
        const newName = editNameInput.value.trim();
        const newPrice = editPriceInput.value.trim();
        if (newName !== '' && newPrice !== '') {
            products[index].name = newName;
            products[index].price = newPrice;
            renderProducts();
            editModal.style.display = 'none';
        }
    }
}

renderProducts();

function editProduct(index) {
    showEditPopup(index);
}

renderProducts();
