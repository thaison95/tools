export default function applyDiscount(price, discount = 0.1) {
    return price * (1 - discount);
}