import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | undefined>;
    createUser(email: string, password: string, name: string): Promise<User>;
    findById(id: number): Promise<User | undefined>;
}
