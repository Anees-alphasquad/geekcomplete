import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';

@Injectable()
export class EventsService {
  private stripe;
  constructor(
    private prisma: PrismaService,
    private products: ProductsService,
    private users: UsersService,
    private config: ConfigService
  ) {
    this.stripe = new Stripe(config.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2022-11-15',
      },
    );
  }

  async handleStripeStatus(data: any) {
    // TODO: Need to change the conditions to `greaterThan` todays data in stripe Service - its done
    try {
      // Retrieve product from data
      const product = await this.products.getProductsOnly(data.productId);
      console.log('GETTING PRODUCT: ', product);

      // Find the number of interactions in every product
      const productInteractions = product.numberOfInteractions;
      console.log('GETTING PRODUCT INTERACTIONS: ', productInteractions);

      // Get the subscription expiry date
      const expirationDate = data.subscriptionExpiryDate;
      console.log('GETTING EXPIRATION DATE OF PRODUCTS: ', expirationDate);

      // Update the subscription expiry date by one month if the status is paid
      const newExpiryDate = new Date();
      newExpiryDate.setDate(expirationDate.getDate(expirationDate) + 30);
      console.log('GETTING NEW EXPIRY DATE OF SUBSCRIPTION: ', newExpiryDate);

      // Retrieve checkout session from the data
      const session = await this.stripe.checkout.sessions.retrieve(
        data.stripeCustomerId,
      );

      console.log('GETTING PAYMENT STATUS: ', session.payment_status);

      if (session.payment_status == 'unpaid') {
        const { stripeCustomerId, email, userName, displayPicture } = data;

        const user = await this.users.findUserbyStripeId(stripeCustomerId);
        console.log('USER: ', user);

        // Update user with the new attributes if the payment is in paid status
        const updateUser = await this.prisma.users.update({
          where: {
            stripeCustomerId,
          },
          data: {
            email,
            userName,
            displayPicture,
            productId: data.productId,
            numberOfInteractionsUtilised: 0,
            subscriptionExpiryDate: data.subscriptionExpiryDate,
          },
        });
        console.log('UPDATED USER: ', updateUser);
        return 'Please renew your subscription';

      } else {
        const updateUserSubscription = await this.prisma.users.update({
          where: {
            id: data.stripeCustomerId,
          },
          data: {
            email: data.email,
            userName: data.userName,
            displayPicture: data.displayPicture,
            productId: data.productId,
            numberOfInteractionsUtilised: productInteractions,
            subscriptionExpiryDate: newExpiryDate,
          },
        });

        console.log(
          'UPDATE_USER_COMING_FROM_ELSE_CONDITION: ',
          updateUserSubscription,
        );
        return 'Payment plan is updated.';
      }
    } catch (error) {
      console.log(error);
    }
  }
}
