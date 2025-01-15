import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { TransferLists } from "../../Contexts/TransferLists";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAddAppointment from "../../Hooks/useAddAppointment";
import useSecureAxios from "../../Hooks/useSecureAxios";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {amount,appointmentCredentials,setAppointmentCredentials}=useContext(TransferLists)
    const { secureAxios } = useSecureAxios();
    const{user,logoutUser}=useContext(AuthContext)
    const navigate = useNavigate();
    const addAppointment=useAddAppointment()


    const [loading, setLoading] = useState(false)
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        secureAxios.post(`/create-payment-intent`,{amount,email:user.email})
        .then((res) => {
            setClientSecret(res.data.clientSecret)
        })
        .catch((error) => {
            if (error.status === 401 || error.status === 403) {
              logoutUser();
              toast.error(error.response.data.message);
              navigate("/login");
            }
        });
    }, [secureAxios,amount,user.email]);
  
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
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }

    // Confirm Card Payment
    setLoading(true)
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card,
            billing_details:{
                email:user?.email||'anonymous',
                name:user?.displayName||'anonymous',
            }
        }
    });
    if (confirmError) {
      console.log(confirmError)

    } else{
      console.log(paymentIntent)
      if(paymentIntent.status==="succeeded"){
        appointmentCredentials.transaction_id=paymentIntent.id
        setAppointmentCredentials(appointmentCredentials)
        addAppointment()
      }else(
        toast.error(
            "Payment unsuccessful!"
        )
      )
    }
    setLoading(false)

};

    console.log(!stripe,"1")
    console.log(!clientSecret,"2")
    console.log(loading,"3")
    console.log(!appointmentCredentials,"4")
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '14px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#e8092e',
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe || !clientSecret || loading || !appointmentCredentials} className="formSubmitBtn">
          Pay
        </button>
      </form>
    );
  };

export default CheckoutForm;