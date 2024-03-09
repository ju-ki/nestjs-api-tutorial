import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
  });
  it.todo('should pass');

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    describe('Sign up', () => {
      it.todo('should sign up');
    });
    describe('Sign in', () => {
      it.todo('should sign in');
    });
  });

  describe('User', () => {
    describe('Get me', () => {});

    describe('Edit User', () => {});
  });

  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {});

    describe('Get Bookmarks', () => {});

    describe('Get Bookmark by id', () => {});

    describe('Edit Bookmark', () => {});

    describe('Delete Bookmark', () => {});
  });
});
