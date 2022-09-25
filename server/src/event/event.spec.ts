import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventTypes } from './event.entity';
import { User } from '../user/user.entity';

describe('Event Controller', () => {
  let eventController: EventController;
  const fakeEventService = {
    create: jest.fn((dto, user, session) => {
      const event = {
        id: Math.floor(Math.random() * 100),
        createdAt: mockDate,
        lastUpdatedAt: mockDate,
        user: { id: user.id },
        ...dto,
      } as Event;
      if (session) session.event = event;
      return Promise.resolve(event);
    }),

    update: jest.fn((currentEvent, dto, session) => {
      const updatedEvent = {
        id: currentEvent.id,
        createdAt: mockDate,
        lastUpdatedAt: new Date(),
        ...dto,
      } as Event;
      if (session) session.event = updatedEvent;
      return Promise.resolve(updatedEvent);
    }),
  };
  const mockDate = new Date();
  const mockUser = {
    id: '9999',
    paymentProfileId: 'acde',
  } as User;

  const mockCreateDto = {
    estimatedGuests: 150,
    name: 'Tested Event',
    type: EventTypes.Birthday,
    closed: false,
  };
  const mockSession: any = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: fakeEventService,
        },
      ],
    }).compile();

    eventController = module.get<EventController>(EventController);
  });
  it('Should be defined', () => {
    expect(eventController).toBeDefined();
  });

  describe('Create event', () => {
    it('Should create a new event', async () => {
      const event = await eventController.create(
        mockCreateDto,
        mockUser,
        mockSession,
      );
      expect(event.id).toEqual(expect.any(Number));
      expect(event.user.id).toEqual(mockUser.id);
    });

    it('Should store the created event in the provided session', async () => {
      const event = await eventController.create(
        mockCreateDto,
        mockUser,
        mockSession,
      );
      expect(mockSession.event).toEqual(event);
    });
  });

  describe('Update event', () => {
    it('Should updated the event stored in the provided session', async () => {
      const updatedEvent = await eventController.update(
        mockSession.event,
        { name: 'Update test' },
        mockSession,
      );
      expect(updatedEvent.lastUpdatedAt.getTime()).toBeGreaterThan(
        updatedEvent.createdAt.getTime(),
      );
      expect(updatedEvent.name).toEqual('Update test');
    });

    it('Should set the updated event on the session provided', async () => {
      const updatedEvent = await eventController.update(
        mockSession.event,
        { name: 'Update session test' },

        mockSession,
      );
      expect(mockSession.event).toEqual(updatedEvent);
    });
  });
  // describe('Delete event', () => {
  //   it('Should delete an event', async () => {
  //     await eventController.remove();
  //   });

  //   it('Should clear the even from the provided session', async () => {
  //     await eventController.remove('', mockSession);
  //     expect(mockSession.event).toBeNull();
  //   });
  // });
});
