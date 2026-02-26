export const openRazorpay = async ({ amount, onSuccess }) => {
  const response = await fetch("http://localhost:5000/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  const order = await response.json();

  const options = {
    key: "rzp_live_SKnAAXsoSOko7w",
    amount: order.amount,
    currency: order.currency,
    order_id: order.id,
    name: "Siddhant IT Services",
    handler: function (response) {
      onSuccess(response);
    },
    theme: {
      color: "#2563eb",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};