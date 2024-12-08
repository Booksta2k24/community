import { IUser } from "../../../../domain/users";

export interface IUserRepository {
    save(user: IUser): Promise<Boolean>;
    findByEmail(email: string): Promise<IUser | null>;
}