const btns = document.getElementsByClassName('addToCartBtn');

const addProductToCart = async (pId) => {
    try {
        // Obtén el valor de cId del elemento oculto
        const cId = document.getElementById('userCart').value;
        
        const result = await fetch(`https://backend-production-58a0.up.railway.app/api/carts/${cId}/product/${pId}`, {
            body: JSON.stringify({ quantity: 1 }),
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (result.status === 200 || result.status === 201) {
            alert('Product added to cart');
        } else {
            alert('Cannot add product to cart');
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
    const result = await fetch('https://backend-production-58a0.up.railway.app/api/session/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const { redirect } = await result.json();
    window.location.href = redirect;
});