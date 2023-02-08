import { Body, Controller, Get, Post, Query, Request, RequestMapping } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {

    constructor(private stripe: StripeService){}

    @Post('create-checkout-session')
    createCheckOutSession(@Body('stripePriceId') stripePriceId: string, @Body('productName') productName: string, @Body("userId") userId: number, @Body() updateUserDto: UpdateUserDto) {
        return this.stripe.createCheckOutSession(stripePriceId, productName, userId)
    }

    @Get('store-response') 
    storeResponse(@Query() allParams: any) {
        return this.stripe.storeResponse(allParams)
    }

    @Post('retrieve-checkout-session')
    retrieveCheckOutSession (@Body('sessionId') sessionId: string) {
        return this.stripe.retrieveCheckOutSession(sessionId)
    }
}
