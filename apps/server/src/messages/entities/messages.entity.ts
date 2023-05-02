import { Users } from 'src/users/entities/users.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ name: 'channelId', type: 'int', nullable: false })
  channelId: number;

  @Column({ type: 'varchar' })
  content: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;
}
