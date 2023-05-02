import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Users } from 'src/users/entities/users.entity';

@Entity()
export class Channels {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: 'boolean', default: false })
  isGlobal: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @JoinTable({ name: 'user_channels' })
  @ManyToMany(() => Users, (user) => user.id)
  users: Array<Users>;
}
