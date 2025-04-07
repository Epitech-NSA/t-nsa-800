import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../entity/User';
import { AppDataSource } from '../config/data-source';

class AuthController {
  public static register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send('Username and password are required');
      return;
    }

    const user = new User();
    user.username = username;
    user.password = password;
    user.role = 'NORMAL';

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

  public static login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send('Username and password are required');
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send('Username or password incorrect');
      return;
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send('Username or password incorrect');
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.send({ token });
  };

  public static getMe = async (req: Request, res: Response): Promise<void> => {
    const userRepository = AppDataSource.getRepository(User);
    try {
      const user = await userRepository.findOneOrFail({
        select: ['id', 'username', 'role'],
        where: { id: res.locals.jwtPayload.userId },
      });
      res.send({ user });
    } catch (error) {
      res.status(404).send('User not found');
    }
  };

  public static changePassword = async (req: Request, res: Response): Promise<void> => {
    const id = res.locals.jwtPayload.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400).send('Old and new password are required');
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      res.status(401).send('User not found');
      return;
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send('Old password is incorrect');
      return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();
    await userRepository.save(user);

    res.status(204).send();
  };
}

export default AuthController;
