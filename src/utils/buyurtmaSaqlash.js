const STORAGE_KEY = 'homefix_completed_orders';

export function readCompletedOrders() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

export function saveCompletedOrder(orderId, details) {
  const orders = readCompletedOrders();
  const updated = { ...orders, [orderId]: details };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('homefix-orders-updated'));
  return updated;
}
