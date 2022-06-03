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

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });



    it('POST /review - SUCCESS', () => {
        return request(app.getHttpServer())
            .post('/review')
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
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBeGreaterThan(0);
                expect(body[0]._id).toBe(createdId);
            });
    });

    it('GET /review/product/ - FAIL', () => {
        return request(app.getHttpServer())
            .get('/review/product/' + wrongProductId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(0);
            });
    });

    it('DELETE /review/product/ - FAIL', () => {
        return request(app.getHttpServer())
            .delete('/review/product/' + wrongProductId)
            .expect(HttpStatus.NOT_FOUND);
    });

    it('DELETE /review - SUCCESS', () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .expect(200);
    });

    afterEach(() => {
        disconnect();
        app.close();
    })
});
