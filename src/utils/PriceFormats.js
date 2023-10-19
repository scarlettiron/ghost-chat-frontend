const formatPrice = (price) => {
    const formated = parseFloat(price / 100).toFixed(2)
    return formated
}

export {formatPrice}