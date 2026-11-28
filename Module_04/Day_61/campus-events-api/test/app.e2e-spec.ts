
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { jest } from '@jest/globals';

describe('Authentication API (e2e)', () => {
  jest.setTimeout(60000); 
  let app: INestApplication<App>;
  let accessToken: string;
  let refreshToken: string;

  const email = 'auth-test@example.com';
  const password = 'TestPassword123';
  const name = 'Authentication Test User';

  beforeAll(async () => {
    process.env.JWT_ACCESS_SECRET ??=
      'test-access-secret-at-least-32-characters';
    process.env.JWT_REFRESH_SECRET ??=
      'test-refresh-secret-at-least-32-characters';

    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. registers a student without exposing password data', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ name, email, password })
      .expect(201);

    expect(response.body.message).toBe('Registration successful');
    expect(response.body.user.email).toBe(email);
    expect(response.body.user.role).toBe('STUDENT');
    expect(response.body.user.password).toBeUndefined();
    expect(response.body.user.refreshHash).toBeUndefined();
  });

  it('2. rejects duplicate email registration', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ name, email, password })
      .expect(409);
  });

  it('3. rejects invalid registration data', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name,
        email: 'not-an-email',
        password: 'short',
      })
      .expect(400);
  });

  it('4. rejects a client-supplied role during registration', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        name: 'Unauthorized Admin',
        email: 'fake-admin@example.com',
        password,
        role: 'ADMIN',
      })
      .expect(400);
  });

  it('5. logs in and returns access and refresh tokens', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email, password })
      .expect(201);

    expect(response.body.access_token).toBeDefined();
    expect(response.body.refresh_token).toBeDefined();
    expect(response.body.token_type).toBe('Bearer');
    expect(response.body.expires_in).toBe(900);

    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
  });

  it('6. rejects incorrect login credentials with the same 401 message', async () => {
    const wrongPassword = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email,
        password: 'WrongPassword123',
      })
      .expect(401);

    const unknownEmail = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'unknown@example.com',
        password,
      })
      .expect(401);

    expect(wrongPassword.body.message).toBe(
      unknownEmail.body.message,
    );
  });

  it('7. rejects access to /auth/me without an access token', async () => {
    await request(app.getHttpServer())
      .get('/api/auth/me')
      .expect(401);
  });

  it('8. rejects a tampered access token', async () => {
    await request(app.getHttpServer())
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${accessToken}.tampered`)
      .expect(401);
  });

  it('9. accepts a valid access token at /auth/me', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.email).toBe(email);
    expect(response.body.role).toBe('STUDENT');
  });

  it('10. rotates refresh tokens and rejects reuse of the old token', async () => {
    const oldRefreshToken = refreshToken;

    const response = await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: oldRefreshToken })
      .expect(201);

    expect(response.body.access_token).toBeDefined();
    expect(response.body.refresh_token).toBeDefined();
    expect(response.body.refresh_token).not.toBe(oldRefreshToken);

    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;

    await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: oldRefreshToken })
      .expect(401);
  });

  it('11. logs out and invalidates the refresh token', async () => {
    const tokenToInvalidate = refreshToken;

    await request(app.getHttpServer())
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(201);

    await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: tokenToInvalidate })
      .expect(401);
  });
});
