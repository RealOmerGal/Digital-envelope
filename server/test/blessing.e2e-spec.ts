import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createBlessingDto, createEventDto, mockCookie } from './mocks';

describe('Blessing Module', () => {
  let app: INestApplication;
  let eventId;
  let blessingId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it('creates a new event and a new blessing attached to it', async () => {
    await request(app.getHttpServer())
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

    return request(app.getHttpServer())
      .post('/blessing')
      .send({ ...createBlessingDto, eventId })
      .expect(201)
      .then((res) => {
        blessingId = res.body.id;
        expect(blessingId).toBeDefined();
      });
  });
  it("returns 403 when user is not allowed to get an event's blessings", async () => {
    return await request(app.getHttpServer()).get('/blessing/' + eventId).expect(403);
  })

  it("finds the created blessing when looking for event's blessings", async () => {
    const res = (await request(app.getHttpServer()).get('/blessing/' + eventId).set('Cookie', mockCookie))
      .body;
    expect(res).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: blessingId })])
    )
  });
});
