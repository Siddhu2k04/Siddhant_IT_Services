import "../../styles/BecomeSeller.css";
import { useNavigate } from "react-router-dom";

const benefits = [
  "Earn money by selling your projects",
  "Reach thousands of students and colleges",
  "Get featured on Siddhant IT Services platform",
  "Build your professional portfolio",
  "Supportive seller community & guidance"
];

const BecomeSeller = () => {
  const navigate = useNavigate();

  return (
    <div className="seller-choice-page">
      <div className="seller-choice">
        <h1>Become a Seller</h1>
        <p>Join Siddhant IT Services and start earning by selling your projects!</p>

        <div className="seller-buttons">
          <button onClick={() => navigate("/seller/register")}>
            Register as Seller
          </button>

          <button onClick={() => navigate("/seller/login")}>
            Seller Login
          </button>
        </div>

        <section className="seller-benefits">
          <h2>Benefits of Becoming a Seller</h2>
          <ul>
            {benefits.map((benefit, index) => (
              <li key={index}>
                <span className="checkmark">✔</span> {benefit}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default BecomeSeller;
