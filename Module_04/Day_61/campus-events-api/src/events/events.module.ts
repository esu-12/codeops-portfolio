import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { EventsController } from './events.controller.js';
import { EventsService } from './events.service.js';

@Module({
  imports: [AuthModule],
  controllers: [EventsController],
  providers: [EventsService, RolesGuard],
})
export class EventsModule {}
