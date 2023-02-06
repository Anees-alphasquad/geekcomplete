import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import Stripe from 'stripe';


@Injectable()
export class StripeService {
    private stripe;
     
 constructor() {
    this.stripe = new Stripe('sk_test_51IC1P6F3OApwwatv1e7EwxoSWgEeiX1GQvNfyF6ffOOUybMZc04vd4hVMb4InZ4PpDgVrnL9hGF29X2C7akNruYp00tNUSrhc5', {

        apiVersion: '2022-11-15'
    })
 }

// Create checkout session with the product_priceId from the stripe
async createCheckOutSession(stripePriceId: string, productName: string, userId: number) {
    const session = await this.stripe.checkout.sessions.create({
        success_url: "http://localhost:3000/stripe/store-response/?id={CHECKOUT_SESSION_ID}",
        line_items: [{
            price: stripePriceId , quantity: 1
        }],
        mode: 'subscription',
    })

    // Create paymentIntent
    const paymentIntent = await this.stripe.paymentIntents.create({
        amount: session.amount_total,
        currency: 'usd',
        automatic_payment_methods: {enabled: true}
    })
    paymentIntent; 
    console.log(UpdateUserDto)

    return {
        id: session.id,
        checkoutUrl: session.url,
        amount: session.amount_total
    }
}
async storeResponse(allParams: any) {
console.log('Response from stripe API: ', allParams)
return allParams
}
}


