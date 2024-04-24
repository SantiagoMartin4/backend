export const generateProductErrorInfo = (product) => {
    return `One or more properties are incomplete or invalid
        title: needs to be a string, received ${typeof product.title}
        description: needs to be a string, received ${typeof product.description}
        category: needs to be a string, received ${typeof product.category}
        price: needs to be a number, received ${typeof product.price}
        thumbnail: needs to be a string, received ${typeof product.thumbnail}
        code: needs to be a string, received ${typeof product.code}
        stock: needs to be a number, received ${typeof product.stock}
        `;
}

// Invalid credentials... actualmente no lo utilizo (se usaba en la parte de passport.config.js) dado que me pisa la redirección que hago con flash
export const invalidCredentials = () => {
    return 'Invalid credentials';
}

export const productNotFound = (pId) => {
    return `Product not found, the id provided does not exist, pId: ${pId}`;
}