import { createUser } from "../../controllers/userController";
import  request  from "supertest";
import { app } from "../../app";
import User from "../../models/user";
import bcrypt from 'bcryptjs';
import sequelize from '../../config/database';

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sincroniza o banco de dados antes de rodar os testes
});


beforeEach(async() => {
    await User.destroy({where: {}})
})


describe('POST /users',() => {
    test('Create user', async () => {
        const newUserPayload = {
            firstName: 'Test',
            lastName: 'User',
            password: 'senha123',
            email: 'teste@example.com',
            cpf: '12345678901',
            role: 'admin',
        }

        const response = await request(app)
            .post('/api/users')
            .send(newUserPayload)
            .expect(201);

        
        const userInDb = await User.findOne({
            where: { email: newUserPayload.email}
        })

        expect(userInDb).toBeTruthy();
        expect(userInDb.cpf).toBe(newUserPayload.cpf);
        expect(userInDb.role).toBe(newUserPayload.role);

        // const isPasswordHashed = await bcrypt.compare(newUserPayload.password, userInDb.password)
        // expect(isPasswordHashed).toBe(true);

        expect(response.body.email).toBe(newUserPayload.email);
        // expect(response.body).not.toHaveProperty('password');


    })
})