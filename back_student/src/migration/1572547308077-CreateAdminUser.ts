import {MigrationInterface, QueryRunner} from 'typeorm';
import {User} from '../entity/User';
import {AppDataSource} from '../config/data-source';

export class CreateAdminUser1572547308077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: {username: 'admin'},
    });

    if (!existingUser) {
      const user = new User();
      user.username = 'admin';
      user.password = 'admin';
      user.hashPassword();
      user.role = 'ADMIN';
      await userRepository.save(user);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.delete({username: 'admin'});
  }
}
