const btns = document.getElementsByClassName('addToCartBtn');

const addProductToCart = async (pId) => {
    try {
        // Obtén el valor de cId del elemento oculto
        const cId = document.getElementById('userCart').value;
        
        const result = await fetch(`/api/carts/${cId}/product/${pId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },    
            body:JSON.stringify({"quantity": 1})
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
    const result = await fetch('/api/session/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const { redirect } = await result.json();
    window.location.href = redirect;
});