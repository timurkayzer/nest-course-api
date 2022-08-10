import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CreateReviewDto } from '../src/review/create-review.dto';
import { disconnect } from 'mongoose';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Types } from 'mongoose';




const productId = new Types.ObjectId().toHexString();
const wrongProductId = new Types.ObjectId().toHexString();


const testDto: CreateReviewDto = {
    name: 'Test',
    title: 'Heading',
    description: 'Description',
    productId,
    rating: 5
};

let createdId: string;

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const { body } = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                login: "root",
                password: "123"
            });
        token = body.token;
    });



    it('POST /review - SUCCESS', async () => {
        return request(app.getHttpServer())
            .post('/review')
            .auth(token, { type: 'bearer' })
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                createdId = body._id;
                expect(createdId).toBeDefined();
            });
    });

    it('GET /review/product/ - SUCCESS', () => {
        return request(app.getHttpServer())
            .get('/review/product/' + productId)
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBeGreaterThan(0);
                expect(body[0]._id).toBe(createdId);
            });
    });

    it('GET /review/product/ - FAIL', () => {
        return request(app.getHttpServer())
            .get('/review/product/' + wrongProductId)
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(0);
            });
    });

    it('DELETE /review/product/ - FAIL', () => {
        return request(app.getHttpServer())
            .delete('/review/product/' + wrongProductId)
            .auth(token, { type: 'bearer' })
            .expect(HttpStatus.NOT_FOUND);
    });

    it('DELETE /review - SUCCESS', () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId.toString())
            .auth(token, { type: 'bearer' })
            .expect(200);
    });

    afterAll(() => {
        disconnect();
        app.close();
    })
});
