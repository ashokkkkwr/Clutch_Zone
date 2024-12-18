import { authenticateUser } from '../middleware/authenticateUser';
import userService from '../services/user.service';

export const resolvers = {
  Query: {
    hello: () => "Hello World.",
  }, 
  Mutation: {
    register: async (
      _: any,
      { username, email, password }: { username: string; email: string; password: string },
      { req }: { req: any } // Access req from context
    ) => {
      return userService.register(username, email, password);
    },
    verifyOtp: async (_:any, { otp, email }:{otp:string;email:string}) => {
      return userService.verifyOtp(otp, email);
    },
    login:async(
      _:any,
      {email,password}:{email:string,password:string},
    )=>{
      return userService.login(email,password)
    },
    getDetails:async(
      _:any,
      context:any
    )=>{
      const id=authenticateUser(context)
      return userService.userDetails(id)
    }

  },
};