import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { mockCookie, createEventDto } from './mocks';

describe('Event Module', () => {
  let app: INestApplication;
  let eventId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('returns 403 on unregistred guest event creation attempt', async () => {
    return await request(app.getHttpServer())
      .post('/event')
      .send(createEventDto)
      .expect(403);
  })

  it('creates a new event', async () => {
    return await request(app.getHttpServer())
      .post('/event')
      .send(createEventDto)
      .set('Cookie', mockCookie)
      .expect(201)
      .then((res) => {
        const { id, name } = res.body;
        expect(id).toBeDefined();
        expect(name).toEqual(name);
        eventId = id;
      });
  });

  it('finds the created event', () => {
    return request(app.getHttpServer())
      .get('/event/' + eventId)
      .set('Cookie', mockCookie)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(eventId);
      });
  });

  it('updates name of the created event', () => {
    const newName = 'UPDATED_EVENT';
    return request(app.getHttpServer())
      .put('/event/' + eventId)
      .set('Cookie', mockCookie)
      .send({ name: newName })
      .then((res) => {
        expect(res.body.id).toEqual(eventId);
        expect(res.body.name).toEqual(newName);
      });
  });

});
