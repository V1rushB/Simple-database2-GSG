import {BaseEntity, BeforeInsert, Column, Entity,PrimaryGeneratedColumn,CreateDateColumn, ManyToMany, JoinTable} from 'typeorm';
import { Role } from './Role.js';


Entity('permissions-tbl')
export class Permission extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 255,nullable: false})
    name: string;

    @ManyToMany(
        ()=>Role,
        role=> role.permission
    )
    @JoinTable()
    
    role: Role[];
}