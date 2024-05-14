const btns = document.getElementsByClassName('addToCartBtn');

const addProductToCart = async (pId) => {
    try {
        // Obtén el valor de cId del elemento oculto
        const cId = document.getElementById('userCart').value;
        
        const result = await fetch(`http://localhost:8080/api/carts/${cId}/product/${pId}`, {
            body: JSON.stringify({ quantity: 1 }),
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (result.status === 200 || result.status === 201) {
            alert('Producto agregado al carrito');
        } else {
            alert('No se puede agregar el producto al carrito');
        }
    } catch (error) {
        alert('Error, algo salió mal');
    }
};

for (let btn of btns) {
    btn.addEventListener('click', (event) => {
        const pId = btn.id;
        addProductToCart(pId);
    });
}


const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', async (e) => {
    const result = await fetch('http://localhost:8080/api/session/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const { redirect } = await result.json();
    window.location.href = redirect;
});