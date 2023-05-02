import { genSaltSync, hashSync } from 'bcrypt';
import { randomBytes, randomUUID } from 'crypto';
import { encryptSymetrical } from 'src/utils/encryption';
import { AfterLoad, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

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
