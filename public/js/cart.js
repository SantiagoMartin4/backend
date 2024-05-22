document.addEventListener('DOMContentLoaded', () => {
    const buyCartBtn = document.getElementById('buyCartBtn');
    const cartId = document.getElementById('cartId').value;

    buyCartBtn.addEventListener('click', async () => {
        try {
            const result = await fetch(`/api/carts/${cartId}/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (result.ok) {
                alert('Purchase successful!');
                window.location.href = '/cart';
            } else {
                const error = await result.json();
                alert('Purchase failed: ' + error.message);
            }
        } catch (error) {
            console.error('Error purchasing cart:', error);
            alert('An error occurred while purchasing the cart.');
        }
    });
});