
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { EventsService } from './events.service';
import type { FindEventsQuery } from './events.service';

import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {}

  // GET /api/events
  @Get()
  findAll(@Query() query: FindEventsQuery) {
    return this.eventsService.findAll(query);
  }

  // GET /api/events/upcoming
  @Get('upcoming')
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  // GET /api/events/:id/sessions/:sessionId
  @Get(':id/sessions/:sessionId')
  findOneSession(
    @Param('id') id: string,
    @Param('sessionId') sessionId: string,
  ) {
    return this.eventsService.findOneSession(id, sessionId);
  }

  // GET /api/events/:id/sessions
  @Get(':id/sessions')
  findSessions(@Param('id') id: string) {
    return this.eventsService.findSessions(id);
  }

  // GET /api/events/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  // POST /api/events
  @Post()
  create(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }
}
