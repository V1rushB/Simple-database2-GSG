import express from 'express';
import { User } from '../db/entities/User.js';
import {Gen} from '../@types/generic.js';
import dataSource from '../db/dataSource.js';
import { Role } from '../db/entities/Role.js';
import { Permission } from '../db/entities/Permission.js';
import { In } from 'typeorm';
import { Profile } from '../db/entities/Profile.js';


// const findUserProfileInfo = async (userid : number)=> {
//     return await User.findOne({where: {id:userid},relations:['Profile']});
// }

// export default findUserProfileInfo;

const insertRole = async (payload: Role) => {
    try {
        const newRole = new Role();
        newRole.name = payload.name;
        newRole.permissions = await Permission.findBy({id: In(payload.permissions)});
        
        await newRole.save();
    } catch(err) {
        throw (`An error occured while trying to add the Role. error: ${err}`);
    }
}
const insertUserProfile = async (payload: Gen.UserProfile) => {
    return dataSource.manager.transaction(async trans => {
      const role = await Role.findOneBy({ name: payload.role });
      
    //   const newProfile = Profile.create({
    //     firstName: payload.firstName,
    //     lastName: payload.lastName,
    //   });
  
      const newUser = User.create({
        username: payload.username,
        password: payload.password,
        email: payload.email,
        roles: [role] as Role[],
        //profile: newProfile,
      });
  
      //await trans.save(newProfile);
      await trans.save(newUser);
    });
  }

const insertPermission = async (payload: Permission) => {
    try {
        const newPerm = new Permission();
        newPerm.name = payload.name;
        newPerm.description = payload.description;
        
        await newPerm.save();
    } catch(err) {
        throw (`An error occured while trying to add the permission. error: ${err}`)
    }
}

const getUsers = () => {
    const users = User.find();
    return users;
}

const getRoles = () => {
    const roles = Role.find();
    return roles;
}

export {
    insertPermission,
    insertRole,
    insertUserProfile,
    getUsers,
    getRoles,
}