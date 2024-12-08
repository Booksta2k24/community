import UserModel from "../../models/users";

export const findByEmail =async (
    email:string,
    userModel:typeof UserModel
) =>{
    try {
        const userExist = await userModel.findOne({email:email});
        if(userExist){
            return userExist
        }else{
            return null
        }
    } catch (error) {
        throw error
    }
}