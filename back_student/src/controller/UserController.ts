import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../config/data-source';

class UserController {
  public static listAll = async (req: Request, res: Response): Promise<void> => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'username', 'role'],
    });
    res.send(users);
  };

  public static getOneById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const userRepository = AppDataSource.getRepository(User);
    try {
      const user = await userRepository.findOneOrFail({
        where: { id },
        relations: ['jpo', 'prospection'],
        select: ['id', 'username', 'role'],
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send('User not found');
    }
  };

  public static newUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password, role } = req.body;

    if (!username || !password || !['NORMAL', 'ADMIN'].includes(role)) {
      res.status(400).send('Invalid input data');
      return;
    }

    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();

    const userRepository = AppDataSource.getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('Username already in use');
      return;
    }

    res.status(201).send('User created');
  };

  public static editUser = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { username, role } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }

    user.username = username;
    user.role = role;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('Username already in use');
      return;
    }

    res.status(204).send();
  };

  public static deleteUser = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const userRepository = AppDataSource.getRepository(User);

    try {
      const user = await userRepository.findOneOrFail({ where: { id } });
      await userRepository.remove(user);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }

    res.status(204).send();
  };
}

export default UserController;
