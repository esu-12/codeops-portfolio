
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiKeyGuard } from '../common/guards/api-key.guard.js';
import { TimingInterceptor } from '../common/interceptors/timing.interceptor.js';
import { EventsService } from './events.service.js';
import type { FindEventsQuery } from './events.service.js';

import { CreateEventDto } from './dto/create-event.dto.js';

@UseInterceptors(TimingInterceptor)
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {}

  // GET /api/events
  @Get()
  findAll(
    @Query() query: Omit<FindEventsQuery, 'page' | 'limit'>,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.eventsService.findAll({
      ...query,
      page: page?.toString(),
      limit: limit?.toString(),
    });
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
  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }
}
