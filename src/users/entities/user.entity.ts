import { Request } from 'express';
import { CreateUserDto } from '../dto/create-user.dto'
 
interface RequestWithUser extends Request {
  user: CreateUserDto;
}
 
export default RequestWithUser;