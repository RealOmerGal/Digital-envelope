import { Event } from '../event/event.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  photoUrl?: string

  @OneToMany(() => Event, (event) => event.user)
  events?: Event[];
}
