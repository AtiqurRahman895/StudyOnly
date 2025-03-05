import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { TransferLists } from "../../Contexts/TransferLists";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const Payment = () => {
  const navigate = useNavigate();
  const {amount} = useParams();
  const {role}=useContext(TransferLists)

  if(role==="student"){
    return (
      <section className="mt-16">
        <div className="container hero flex items-center justify-center">
          <div className="fromWrapper max-w-md">
            <h1 className="text-4xl font-bold mb-8">pay {amount}$ now!</h1>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </section>
    )
  }else{
    navigate("/")
    toast.warning("Only student can book a session!")
  }

};

export default Payment;
