export const openRazorpay = ({ amount, onSuccess }) => {
  const options = {
    key: "YOUR_RAZORPAY_KEY_ID", // test key
    amount: amount * 100,
    currency: "INR",
    name: "Siddhant IT Services",
    description: "Project Purchase",
    handler: function (response) {
      onSuccess(response);
    },
    theme: {
      color: "#2196F3"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
