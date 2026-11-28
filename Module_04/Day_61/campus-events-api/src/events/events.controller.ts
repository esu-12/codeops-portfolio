
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  Delete,
  Patch,
} from '@nestjs/common';
import type { Request } from 'express';

import { Public } from '../auth/decorators/public.decorator.js';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard.js';
import { ApiKeyGuard } from '../common/guards/api-key.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TimingInterceptor } from '../common/interceptors/timing.interceptor.js';

import { PermissionsGuard } from '../permissions/permissions.guard.js';
import { RequirePermissions } from '../permissions/permissions.decorator.js';
import { Permission } from '../permissions/permission.enum.js';

import { UserRole } from '../users/types/user-role.enum.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { EventsService } from './events.service.js';
import type { FindEventsQuery } from './events.service.js';

import { EventOwnershipPolicy } from '../policies/event-ownership.policy.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { PublishEventDto } from './dto/publish-event.dto.js';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: UserRole;
    mustChangePassword: boolean;
  };
}

type OptionalAuthenticatedRequest = Omit<Request, 'user'> & {
  user?: AuthenticatedRequest['user'];
};

@UseInterceptors(TimingInterceptor)
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventOwnershipPolicy: EventOwnershipPolicy,
  ) {}

  // Public event listing with optional authentication.
  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  findAll(
    @Query() query: Omit<FindEventsQuery, 'page' | 'limit'>,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Req() request?: OptionalAuthenticatedRequest,
  ) {
    return this.eventsService.findAll(
      {
        ...query,
        page: page?.toString(),
        limit: limit?.toString(),
      },
      request?.user ?? null,
    );
  }

  // Upcoming events with optional authentication.
  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Get('upcoming')
  findUpcoming(@Req() request: OptionalAuthenticatedRequest) {
    return this.eventsService.findUpcoming(request.user ?? null);
  }

  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id/sessions/:sessionId')
  findOneSession(
    @Param('id') id: string,
    @Param('sessionId') sessionId: string,
    @Req() request: OptionalAuthenticatedRequest,
  ) {
    return this.eventsService.findVisibleSession(
      id,
      sessionId,
      request.user ?? null,
    );
  }

  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id/sessions')
  findSessions(
    @Param('id') id: string,
    @Req() request: OptionalAuthenticatedRequest,
  ) {
    return this.eventsService.findVisibleSessions(
      id,
      request.user ?? null,
    );
  }

  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() request: OptionalAuthenticatedRequest,
  ) {
    return this.eventsService.findVisibleOne(
      id,
      request.user ?? null,
    );
  }

  // Organizers and admins can create events.
  @UseGuards(RolesGuard, PermissionsGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @RequirePermissions(Permission.EVENT_CREATE)
  @Post()
  create(
    @Body() body: CreateEventDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.eventsService.create(body, request.user.id);
  }

  // Trusted server-to-server event import.
  @UseGuards(ApiKeyGuard)
  @Post('import')
  importEvent(@Body() body: CreateEventDto) {
    return this.eventsService.createImported(body);
  }

  // Organizers can update their own events; admins can update any event.
  @UseGuards(RolesGuard, PermissionsGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @RequirePermissions(Permission.EVENT_UPDATE)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateEventDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const event = this.eventsService.findOne(id);

    this.eventOwnershipPolicy.assertCanManage(request.user, event);

    return this.eventsService.update(id, body);
  }

  // Publishing requires its own permission and ownership check.
  @UseGuards(RolesGuard, PermissionsGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @RequirePermissions(Permission.EVENT_PUBLISH)
  @Patch(':id/publish')
  publish(
    @Param('id') id: string,
    @Body() body: PublishEventDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const event = this.eventsService.findOne(id);

    this.eventOwnershipPolicy.assertCanManage(request.user, event);

    return this.eventsService.update(id, body);
  }

  // Organizers can delete their own events; admins can delete any event.
  @UseGuards(RolesGuard, PermissionsGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @RequirePermissions(Permission.EVENT_DELETE)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    const event = this.eventsService.findOne(id);

    this.eventOwnershipPolicy.assertCanManage(request.user, event);

    return this.eventsService.remove(id);
  }
}
