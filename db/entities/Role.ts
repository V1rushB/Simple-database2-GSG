import {BaseEntity, BeforeInsert, Column, Entity,PrimaryGeneratedColumn,CreateDateColumn, ManyToMany, JoinTable} from 'typeorm';
import { User } from './User.js';
import { Permission } from './Permission.js';

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        type: 'enum',
        enum: ['user', 'admin', 'editor'],
        default: "user",
        unique: true
    })
    name: 'user' | 'admin' | 'editor';

    @ManyToMany(() => User, user => user.roles, { cascade: true })
    users: User[];

    @ManyToMany(() => Permission, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permission[];
}