
import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller.js';
import { EventsService } from './events.service.js';
import { EventOwnershipPolicy } from '../policies/event-ownership.policy.js';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {},
        },
        {
          provide: EventOwnershipPolicy,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});