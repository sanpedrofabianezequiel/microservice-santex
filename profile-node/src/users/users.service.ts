import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { SignUpInput } from 'src/auth/dtos/inputs/signup-input';
import * as bcrypt from 'bcryptjs';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { UpdateUserInput } from './dtos/inputs/update-user.input';
import { In } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(signUpInput: SignUpInput): Promise<User> {
    try {
      const input = new User({
        ...signUpInput,
        password: bcrypt.hashSync(signUpInput.password, 10),
      });
      return await this.userRepository.create(input);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ id });
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async findByRoles(roles: ValidRoles[]): Promise<User[]> {
    if (roles.length === 0)
      return await this.userRepository.find(
        {},
        {
          lastUpdatedBy: true,
        },
      );

    return await this.userRepository.findQueryBuilder(
      'ARRAY[roles] && ARRAY[:...roles]',
      'roles',
      roles,
    );
  }

  /*
  async find({}): Promise<User[]> {
    return await this.userRepository.find({});
  }

  */
  /*
  async findOneAndDelete(id: string): Promise<boolean> {
    await this.userRepository.findOneAndDelete({ id });
    return true;
  }

  async updateUser({
    id,
    updateUserInput,
    updateBy,
  }: {
    id: string;
    updateUserInput: UpdateUserInput;
    updateBy: User;
  }): Promise<User> {
    try {
      const userToUpdate = await this.userRepository.preload({
        id,
        ...updateUserInput,
      } as User);
      if (!userToUpdate)
        throw new NotFoundException(`User with id ${id} not found`);
      const updatedUser = Object.assign(userToUpdate, updateUserInput);
      return await this.userRepository.save(updatedUser);
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async blockUser(id: string, ownerUser: User): Promise<User> {
    const userToblock = await this.findOne(id);
    userToblock.isActive = false;
    userToblock.lastUpdatedBy = ownerUser;
    return await this.userRepository.save(userToblock);
  }*/
}
