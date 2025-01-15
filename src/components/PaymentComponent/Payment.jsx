import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const Payment = () => {
    return (
        <section className='mt-16'>
            <div className="container hero flex items-center justify-center">
                <div className="fromWrapper max-w-md">
                    <h1 className="text-4xl font-bold mb-8">pay 40$ now!</h1>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </section>
    );
};

export default Payment;