import UserModel from "@/resources/user/user.model";
import token from '@/utils/token';
import User from "@/resources/user/user.interface";

class UserService{
    private user = UserModel;

    // Register a new user

    public async register(name:string, email:string, password:string, role:string): Promise<string | Error> {
        try {
            const user =  await this.user.create({name, email, password, role});

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error) {
            console.error('error: ', error)
            throw new Error('Unable to create user');
        }
    }

    // log in attempt
    public async login(email:string, password:string): Promise<string | Error> {
        try {
            const user =  await this.user.findOne({email});
            if(!user) {
                throw new Error('Unable to find a user with the email')
            }

            if(await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given')
            }
        } catch (error) {
            throw new Error('Unable to log user in')
        }
    }
}

export default UserService;