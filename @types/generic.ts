import express from 'express';

export namespace Gen {
    export interface User {
        id : number,
        username: string,
        password: string,
        email: string,
        createdAt: Date,
        role: string,
    }

    export interface Permission {
        id : number,
        name: string,
        description: string,
    }

    export interface Role {
        id : number,
        firstName: string,
        lastName: string
        permission: number,
    }

    export interface UserProfile {
        id : number,
        username: string,
        password: string,
        email: string,
        createdAt: Date,
        role: string,
        profid : number,
        firstName: string,
        lastName: string,
        rolePermission: number,
    }
}