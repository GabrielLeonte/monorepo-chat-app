import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
