import { genSaltSync, hashSync } from 'bcrypt';
import { randomBytes, randomUUID } from 'crypto';
import { AfterLoad, BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Channels } from 'src/channels/entities/channels.entity';
import { encryptSymetrical } from 'src/utils/encryption';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  salt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Channels, (channel) => channel.id)
  channels: Array<Channels>;

  @BeforeInsert()
  public beforeInsert() {
    this.salt = randomBytes(32).toString('hex');
    this.uuid = randomUUID();

    this.username = encryptSymetrical(this.username);
    this.password = hashSync(this.password, genSaltSync());
  }

  @AfterLoad()
  public afterLoad() {
    // we better not leak this out
    if (this.salt) delete this.salt;
  }
}
