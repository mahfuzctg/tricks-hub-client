'use clien'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useSavePaymentMutation } from "@/redux/features/payment/paymentApi";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import envConfig from "@/app/config/envConfig";




export default function CheckoutForm({membersShip, setOpen } : { membersShip : { name : string, price : number},  setOpen : React.Dispatch<React.SetStateAction<boolean>>}) {

  const [ savePayment ] = useSavePaymentMutation();
  const [ updateUser ] = useUpdateUserMutation()

      const currentUser = useAppSelector(state => state.auth.user)
    const [ loading , setLoading ] = useState(false);

    const [ clientSecret, setClientSecret ] = useState({});
    const stripe = useStripe()
    const elements = useElements();


    useEffect(()=>{
       if(membersShip?.price){

        fetch(`${envConfig.baseApi}/payments/create-payment-intent`, {
          method : 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify({ totalCost : membersShip.price, currency : 'usd'})
        }).then(data => data.json())
        .then(res => setClientSecret(res.data))
       }
    },[membersShip?.price])



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)

        if(!stripe || !elements){
          setLoading(false)
            return;
        }
        
 
        const card = elements.getElement(CardElement);

        if(card === null){
          setLoading(false)
            return;
        }

        const { paymentMethod, error } = await stripe.createPaymentMethod({ type: 'card', card })

        if(error){
          setLoading(false)
            console.log(error)
        }else{ console.log( 'payment method', paymentMethod)}

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment( clientSecret as string, {

           payment_method : {
                card : card,
                billing_details: {
                    name: currentUser?.name,
                    email: currentUser?.email
                }
           }
        })

        if(confirmError){
            console.log(confirmError)
            setLoading(false)
        }
        
        if(paymentIntent?.status === 'succeeded'){

          const today = new Date();
          today.setDate(today.getDate() + 30);
          const expiryMembershipDate = today.toISOString();

              // now save the payment in database 
              const payment = {
                email: currentUser?.email,
                cost: Number(membersShip.price),
                membersShip : {
                  package: membersShip,
                  takenDate : new Date().toISOString(),
                  exp : expiryMembershipDate
                },
                transactionId : paymentIntent.id,
              }

             const res = await savePayment(payment);
          
            if(res.data?.success){

              // update the membership field in the user 
              await updateUser({
                userId : currentUser?._id as string,
                payload : { memberShip : { 
                  package: membersShip,
                  takenDate : new Date().toISOString(),
                  exp : expiryMembershipDate,
                }},
              }).unwrap();

              toast.success(`Successfully Purchased ${membersShip.name}`) 
              setLoading(false)
              setOpen(false)
            }
            else{
              toast.error('something wrong')
            }
        }
    }

  return ( 
    <section>

        <form onSubmit={handleSubmit}>
            <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}/>
            <button className=" bg-green-600 my-6 py-2 text-sm md:text-base font-semibold uppercase px-12 rounded-md text-white/80" disabled={!stripe || !elements}> {loading?  <ClipLoader
           color='#ffffff'
        
           size={16}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} /> : 'Pay Now'}</button>

<button onClick={() => setOpen(!open)} className="px-8 ml-2 text-sm lg:text-base mr-3 py-2 md:py-2 font-semibold text-white rounded transition bg-red-600 hover:bg-red-700 "> Close </button>
        </form>
        
    </section>
  )
}
