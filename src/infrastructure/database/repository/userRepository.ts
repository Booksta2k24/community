import { IUser } from './../../../domain/users';
import { IUserRepository } from "../../../usecase/usecase/interface/repository/IuserRepository";
import UserModel from '../models/users';
import { save } from './user/save';
import { findByEmail } from './user/findByEmail';

export class UserRepository implements IUserRepository {
    constructor(
        private readonly userModel: typeof UserModel
    ){}

    async save(user: IUser): Promise<Boolean> {
        return save(user, this.userModel)
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return findByEmail(email, this.userModel);
    }
}