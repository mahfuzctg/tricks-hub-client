'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { toast } from 'sonner';
import { useAppSelector } from '@/redux/hooks';
import { useSavePaymentMutation } from '@/redux/features/payment/paymentApi';
import { useUpdateUserMutation } from '@/redux/features/user/userApi';
import envConfig from '@/app/config/envConfig';

export default function CheckoutForm({
  membersShip,
  setOpen,
}: {
  membersShip: { name: string; price: number };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [savePayment] = useSavePaymentMutation();
  const [updateUser] = useUpdateUserMutation();

  const currentUser = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (membersShip?.price) {
      fetch(`${envConfig.baseApi}/api/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalCost: membersShip.price, currency: 'usd' }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
          if (res?.data) {
            setClientSecret(res.data);
          } else {
            throw new Error('Invalid response from the server');
          }
        })
        .catch((error) => {
          console.error('Error fetching payment intent:', error);
          toast.error('Failed to create payment intent. Please try again later.');
        });
    }
  }, [membersShip?.price]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error('Stripe is not initialized.');
      setLoading(false);
      return;
    }

    if (!clientSecret) {
      toast.error('Client secret not available. Please try again.');
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      toast.error('Card element is not available.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await stripe.createPaymentMethod({ type: 'card', card });
      if (error) {
        throw error;
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.name,
            email: currentUser?.email,
          },
        },
      });

      if (confirmError) {
        throw confirmError;
      }

      if (paymentIntent?.status === 'succeeded') {
        const today = new Date();
        today.setDate(today.getDate() + 30);
        const expiryMembershipDate = today.toISOString();

        const payment = {
          email: currentUser?.email,
          cost: Number(membersShip.price),
          membersShip: {
            package: membersShip,
            takenDate: new Date().toISOString(),
            exp: expiryMembershipDate,
          },
          transactionId: paymentIntent.id,
        };

        const res = await savePayment(payment);

        if (res.data?.success) {
          await updateUser({
            userId: currentUser?._id as string,
            payload: {
              memberShip: {
                package: membersShip,
                takenDate: new Date().toISOString(),
                exp: expiryMembershipDate,
              },
            },
          }).unwrap();

          toast.success(`Successfully Purchased ${membersShip.name}`);
          setLoading(false);
          setOpen(false);
        } else {
          throw new Error('Failed to save payment.');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
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
          }}
        />
        <button
          className="bg-green-600 my-6 py-2 text-sm md:text-base font-semibold uppercase px-12 rounded-md text-white/80"
          disabled={!stripe || !elements || loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={16} aria-label="Loading Spinner" speedMultiplier={0.8} />
          ) : (
            'Pay Now'
          )}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="px-8 ml-2 text-sm lg:text-base mr-3 py-2 md:py-2 font-semibold text-white rounded transition bg-red-600 hover:bg-red-700"
        >
          Close
        </button>
      </form>
    </section>
  );
}
