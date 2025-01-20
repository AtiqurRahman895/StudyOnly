import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useBookSession from "../../Hooks/useBookSession";
import useSecureAxios from "../../Hooks/useSecureAxios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const {amount,session_id,email} = useParams();
  const secureAxios = useSecureAxios();
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const bookSession = useBookSession();

  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    secureAxios
      .post(`/create-payment-intent`, { amount })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 403) {
          logoutUser();
          toast.error(error.response.data.message);
          navigate("/login");
        }
      });
  }, [secureAxios, amount]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    }
    // else {
    //   console.log("[PaymentMethod]", paymentMethod);
    // }

    // Confirm Card Payment
    setLoading(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    } else {
      // console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        bookSession({session_id,email,transaction_info:paymentIntent});
      } else toast.error("Payment unsuccessful!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "14px",
              color: "#ffffff",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#e8092e",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className="formSubmitBtn"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
