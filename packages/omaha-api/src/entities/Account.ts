import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'src/support/orm/decorators';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Collaboration } from './Collaboration';
import { Token } from './Token';

@Entity({ name: 'accounts' })
export class Account {

	@PrimaryGeneratedColumn({ unsigned: true })
	@Exclude()
	public id!: number;

	@Column({ length: 32 })
	public name!: string;

	@Column()
	@Index({ unique: true })
	public email!: string;

	@Column()
	@Exclude()
	public password!: string;

	@Column({ default: false })
	public verified!: boolean;

	@CreateDateColumn()
	public created_at!: Date;

	@UpdateDateColumn()
	public updated_at!: Date;

	@OneToMany(() => Collaboration, collab => collab.account)
	public collaborations!: Promise<Collaboration[]>;

	@OneToMany(() => Token, token => token.account)
	public tokens!: Promise<Token[]>;

}
