import bcrypt from "bcrypt";

interface IUSerService{
    maximumLetter(request: String): boolean;
    criptPassword(request: String): void;
}

class User implements IUSerService{

    maximumLetter = (username: string) => {
        if(username.length >= 10){
            return false
        }
        return true
    }

    criptPassword = async (password: string) => {
        return await bcrypt.hash(password, 10)
    }

}

export default User
