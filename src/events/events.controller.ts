import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventsService } from './events.service';


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @OnEvent('check_stripe_status')
  handleStripeStatus(data: any) {
    // console.log("data: ", data )
    this.eventsService.handleStripeStatus(data)
  }
}
