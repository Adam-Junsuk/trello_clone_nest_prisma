import { Test, TestingModule } from '@nestjs/testing';
<<<<<<<< HEAD:src/users-email/users.controller.spec.ts
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
========
import { AuthController } from './auth.controller';
>>>>>>>> f436bddd11958f0628610248be1cfd194c29c650:src/users/auth/auth.controller.spec.ts

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
<<<<<<<< HEAD:src/users-email/users.controller.spec.ts
      controllers: [UsersController],
      providers: [UsersService],
========
      controllers: [AuthController],
>>>>>>>> f436bddd11958f0628610248be1cfd194c29c650:src/users/auth/auth.controller.spec.ts
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
