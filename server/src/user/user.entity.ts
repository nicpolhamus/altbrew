import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  private _profilePicture: Buffer | undefined;

  constructor() {
    this.profilePicture = `\\x${this.ProfilePicture ? this.ProfilePicture.toString('hex') : ''}`;
  }

  get ProfilePicture(): Buffer {
    if (!this._profilePicture) {
      this._profilePicture = new Buffer(this.profilePicture, 'hex');
    }
    return this._profilePicture;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('bytea', {nullable: false, name: 'profilePicture'})
  profilePicture: string;
}