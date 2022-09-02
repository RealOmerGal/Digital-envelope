import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentPlatform {
  PAYPAL = 'paypal',
  STRIPE = 'stripe',
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'money' })
  amount: number;

  @Column({ type: 'enum', enum: PaymentPlatform })
  platform: PaymentPlatform;

  @Column()
  ref: string;
}
