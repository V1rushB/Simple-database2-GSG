import {BaseEntity, BeforeInsert, Column, Entity,PrimaryGeneratedColumn,CreateDateColumn, OneToOne} from 'typeorm';
import { User } from './User.js';

Entity('profiles-tbl')
export class Profile extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 255,nullable: false})
    firstName: string;
    
    @Column({length: 255,nullable: false})
    lastName: string;

    @Column({nullable: false})
    dateOfBirth: Date;

    @OneToOne(
        ()=> User,
        user=> user.profile
    )
    user: User;
}