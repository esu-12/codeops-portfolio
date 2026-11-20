import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ApiKeyGuard } from '../common/guards/api-key.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TimingInterceptor } from '../common/interceptors/timing.interceptor.js';
import { UserRole } from '../users/types/user-role.enum.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { EventsService } from './events.service.js';
import type { FindEventsQuery } from './events.service.js';

@UseInterceptors(TimingInterceptor)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

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

  @Get('upcoming')
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  @Get(':id/sessions/:sessionId')
  findOneSession(
    @Param('id') id: string,
    @Param('sessionId') sessionId: string,
  ) {
    return this.eventsService.findOneSession(id, sessionId);
  }

  @Get(':id/sessions')
  findSessions(@Param('id') id: string) {
    return this.eventsService.findSessions(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  // JWT: organizers and admins can create events.
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @Post()
  create(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }

  // API key: trusted server-to-server integrations.
  @UseGuards(ApiKeyGuard)
  @Post('import')
  importEvent(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }
}
