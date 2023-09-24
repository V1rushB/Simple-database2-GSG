import {BaseEntity, BeforeInsert, Column, Entity,PrimaryGeneratedColumn,CreateDateColumn, ManyToMany, JoinTable} from 'typeorm';
import { Role } from './Role.js';


@Entity('permissions')
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Role, role => role.permissions)
    @JoinTable()
    roles: Role[];
}