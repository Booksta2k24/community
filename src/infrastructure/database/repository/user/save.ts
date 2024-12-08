import { IUser } from "../../../../domain/users";
import UserModel from "../../models/users";


export const save = async (
    newUser: IUser,
    userModel: typeof UserModel
) => {
    try {
        const user = await userModel.create(newUser)
        if(user){
            await user.save()
            return true
        }
        return false
    } catch (error) {
        throw error;
    }
}