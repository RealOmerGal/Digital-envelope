/*
    Blessing will be created by the guests (un-registered users) and will contain 
    text and a payment
*/

import { Event } from '../event/event.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from '../payment/payment.entity';

@Entity()
export class Blessing {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdBy: string;

  @Column()
  text: string;

  @ManyToOne(() => Event, (event) => event.blessings, {
    onDelete: 'CASCADE'
  })
  event: Event;

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;
}
