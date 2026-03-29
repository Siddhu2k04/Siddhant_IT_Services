export const openRazorpay = ({ amount, order_id, onSuccess }) => {

  const options = {
    key: "rzp_live_SX7fvHO1Lr8aKi", // your Razorpay key
    amount: amount * 100,
    currency: "INR",
    order_id: order_id,
    handler: function (response) {
      onSuccess(response);
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};