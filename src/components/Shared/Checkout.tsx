
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Ievent } from '@/lib/database/models/event.model'

import { loadStripe } from '@stripe/stripe-js';
import { CheckoutOrder } from '@/lib/actions/Order.action';

 loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = ({event,userId}:{event:Ievent, userId:string}) => {
  
      useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);
    const onCheckout = async(e: React.FormEvent)=>{
      e.preventDefault(); // Prevent default form submission
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price,
            isFree: event.isFree,
            buyerId: userId
          }

         try {
           const sessionUrl = await CheckoutOrder(order);
           if (sessionUrl) {
               // Redirect to the Stripe checkout page
               window.location.href = sessionUrl; // Redirect to the session URL
           }
         } catch (error) {
          console.error('Checkout error:', error);
         }
        
    }

  return (
    <form onSubmit={onCheckout}>
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  )
}

export default Checkout
