import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe;

  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private config: ConfigService
  ) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2022-11-15',
      },
    );
  }

  // Create checkout session with the product_priceId from the stripe
  async createCheckOutSession(
    stripePriceId: string,
    productName: string,
    userId: number,
  ) {
    const session = await this.stripe.checkout.sessions.create({
      success_url:
        'http://localhost:3000/stripe/store-response/?id={CHECKOUT_SESSION_ID}',
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
    });

    // Create paymentIntent
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: session.amount_total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    paymentIntent;
    console.log(UpdateUserDto);

    return {
      id: session.id,
      checkoutUrl: session.url,
      amount: session.amount_total,
      session,
    };
  }
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async schecduleCheck(sessionId: string) {
    // Retrieve all paying customers
    const payingUsers = await this.prisma.users.findMany({
      where: {
        stripeCustomerId: {
          not: null,
        },
      },
    });
    // console.log(payingUsers);

    // Declare today's date
    const today = new Date();
    // console.log('Total paying users: ', payingUsers)

    // Loop through the users and get the subscription expiration date
    payingUsers.map(async (user) => {
      // TODO: Change the condition below
      if (today > user.subscriptionExpiryDate) {
        // Emit event
        this.eventEmitter.emit('check_stripe_status', user);
      }
    });
    return 'OK';
  }

  async storeResponse(allParams: any) {
    console.log('Response from stripe API: ', allParams);
    return allParams;
  }

  async retrieveSession(sessionId: string) {
    return this.stripe.checkout.sessions.retrieve(sessionId);
  }
}
