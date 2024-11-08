/* eslint-disable @typescript-eslint/no-explicit-any */

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { MdOutlinePayment } from "react-icons/md";
import CheckoutForm from "./CheckOutForm";
// import envConfig from "@/config/envConfig";

// get stripe promise with publishable key 
const stripePromise = loadStripe('rk_test_51Q80yRRshYN8wYCWUgvbvPf2QrQgUdxhsiarNlt4bLDpyeiUdt4MwFt245RTkMzxqa2TP4EOQdd2uX6tN7H4bkoT0077dpfukI')


type TModalProps = {
  membersShip : any,
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
}



export default function  PaymentModal({ setOpen, membersShip } : TModalProps) {

  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/30 dark:bg-black/60 backdrop-blur-sm flex justify-center items-center overflow-y-auto">  
       
       <div className="w-[400px] md:w-[600px] p-7 bg-white dark:bg-gray-800 rounded-md relative" >


      {/* Membership info  */}
      <section className="flex items-center gap-3">
        {/* <img className="md:w-36 h-20 object-contain" src={booking?.car?.images[0]}/> */}

        <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300">{membersShip?.name}</h2>
              <p className="text-gray-600 mt-2 dark:text-gray-400">{membersShip?.description}</p>
              <div className="my-4">
                <span className={`text-4xl font-bold text-${membersShip?.color}`}>${membersShip?.price}</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="text-gray-600 mb-6">
                {membersShip?.features?.map((feature: string) => <><li className="mb-2 flex items-center dark:text-gray-400">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i> {feature}
                </li></>)}
                
              </ul>
            </div>
      
      </section>


          {/* payment   */}
        <section className="max-w-5xl mx-auto rounded-md border dark:border-gray-600 px-4 mt-12">
        <div className="bg-amber-500 text-white/80 w-16 h-16 rounded-full -mt-14 mx-auto flex justify-center items-center p-2">
            <MdOutlinePayment size={35}  />
        </div>
        <h2 className= "uppercase text-gray-500  text-[20px] font-semibold text-center my-3 dark:text-gray-400" >STRIPE PAYMENT </h2>
        
    <Elements stripe={stripePromise}>
        <CheckoutForm membersShip={membersShip} setOpen={setOpen} />
    </Elements>
    </section>


</div>
       
       </section>
  )
}
