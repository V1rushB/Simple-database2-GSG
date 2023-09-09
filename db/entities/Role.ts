import {BaseEntity, BeforeInsert, Column, Entity,PrimaryGeneratedColumn,CreateDateColumn, ManyToMany, JoinTable} from 'typeorm';
import { User } from './User.js';
import { Permission } from './Permission.js';

Entity('roles-tbl')
export class Role extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 255,nullable: false})
    name: string;

    @ManyToMany(
        ()=> User,
        user => user.role,
        {
            eager: true,
        }
    )
    @JoinTable()

    @ManyToMany(
        ()=> Permission,
        permission=> permission.role

    )
    permission: Permission[]
    @JoinTable()

    user: User[];
}