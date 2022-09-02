import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Event } from './event/event.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) { }



  async paidGuestsCount(eventId: number) {
    const res = await this.entityManager.query(
      `SELECT event."estimatedGuests" AS Max, COUNT(blessing.id)::int AS Current
      FROM event
      INNER JOIN blessing
      ON event.id = blessing."eventId"
      WHERE blessing."eventId" = $1
      GROUP BY event."estimatedGuests"
  `,
      [eventId],
    );
    return res[0];
  }

  async totalAmount(eventId: number) {
    const res = await this.entityManager.query(
      `
      SELECT SUM(payment.amount)
      FROM payment
      INNER JOIN blessing 
      ON payment.id = blessing."paymentId"
      INNER JOIN event
      ON event.id = blessing."eventId"
      WHERE event.id = $1
    `,
      [eventId],
    );
    return res[0];
  }

  async averagePerGuest(eventId: number) {
    const res = await this.entityManager.query(
      `SELECT AVG(payment.amount::numeric)::int
       FROM payment
       INNER JOIN blessing
       ON blessing."paymentId" = payment.id
       INNER JOIN event
       ON blessing."eventId"  = event.id
       WHERE event.id = $1`,
      [eventId],
    );
    // const similarEvents = await this.entityManager.query(
    //   `SELECT AVG(payment.amount::numeric)::int
    //   FROM payment
    //   INNER JOIN blessing
    //   ON blessing."paymentId" = payment.id
    //   INNER JOIN event
    //   ON blessing."eventId"  = event.id
    //   WHERE event.type = $1
    //   AND event."estimatedGuests" BETWEEN $2 AND $3
    //   AND EXTRACT(YEAR FROM event."createdAt") = $4
    //   `
    // )
    return res[0];
  }
  async amountDistribution(eventId: number) {
    const res = await this.entityManager.query(
      `SELECT COUNT(payment.amount), payment.amount FROM payment
      INNER JOIN blessing ON blessing."paymentId"  = payment.id
      WHERE blessing."eventId" = $1
      GROUP BY payment.amount
      ORDER BY COUNT(payment.amount) DESC
      FETCH FIRST 8 ROWS ONLY`, [eventId]
    )
    return res;
  }
}
