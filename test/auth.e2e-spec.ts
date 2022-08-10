import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto/auth.dto';


describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    it('POST /login - SUCCESS', async () => {
        let correctTestDto: AuthDto = {
            login: "root",
            password: "123"
        };

        return request(app.getHttpServer())
            .post('/auth/login')
            .send(correctTestDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body?.token?.length).toBeGreaterThan(0);
            })
    })

    it('POST /login - FAIL', async () => {
        let correctTestDto: AuthDto = {
            login: "root",
            password: "1234"
        };

        return request(app.getHttpServer())
            .post('/auth/login')
            .send(correctTestDto)
            .expect(403);
    })

    afterAll(() => {
        disconnect();
        app.close();
    })

});