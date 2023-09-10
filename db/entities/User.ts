import {BaseEntity, BeforeInsert, Column, Entity,PrimaryGeneratedColumn,CreateDateColumn,ManyToMany, OneToOne, JoinTable, JoinColumn} from 'typeorm';
import bcrypt from 'bcrypt';
import { Role } from './Role.js';
import { Profile } from './Profile.js';

@Entity('usrs-tbl')
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 255,nullable: false})
    username: string;

    @Column({length: 255, nullable: false})
    password: string;

    @Column({length: 255})
    email: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        }   
    }
    
    @CreateDateColumn({
        type: 'timestamp',
        default: ()=>"CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @ManyToMany(() => Role, role => role.users, { eager: true })
    @JoinTable()
    roles: Role[];
}