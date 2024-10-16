import { createUser } from "../../controllers/userController";
import  request  from "supertest";
import { app } from "../../app";
import User from "../../models/user";
import sequelize from '../../config/database';
import { extensions } from "sequelize/lib/utils/validator-extras";

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sincroniza o banco de dados antes de rodar os testes
});


beforeEach(async() => {
    await User.destroy({where: {}})
})


describe('POST /api/users',() => {
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

describe('GET  /api/users', () => {
    test('Get all users', async () => {
        const users = [
            {
              firstName: 'John',
              lastName: 'Doe',
              password: 'senha123',
              email: 'john@example.com',
              cpf: '12345678910',
              role: 'user',
            },
            {
              firstName: 'Jane',
              lastName: 'Smith',
              password: 'senha456',
              email: 'jane@example.com',
              cpf: '10987654321',
              role: 'admin',
            },
        ];


        await User.bulkCreate(users);

        const response = await request(app)
            .get('/api/users')
            .expect(200)

        expect(response.body.length).toBe(2)

        expect(response.body[0].email).toBe(users[0].email)
        expect(response.body[1].email).toBe(users[1].email)

    })
});


describe('GET /api/users/:id', () => {
    test('Get a user', async() => {

        const user = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            password: 'senha123',
            email: 'john@example.com',
            cpf: '12345678910',
            role: 'user',
        });
        console.log(user.id)
        const response = await request(app)
            .get(`/api/users/${user.id}`)
            .expect(200)

        expect(response.body.id).toBe(user.id)
        expect(response.body.email).toBe(user.email)
        expect(response.body.cpf).toBe(user.cpf)

    })
});



describe('GET /api/users/:id', () => {
    test('Update user', async () => {

        const user = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            password: 'senha123',
            email: 'john@example.com',
            cpf: '12345678910',
            role: 'user',
        });

        const updatedUserPayload = {
            firstName: 'Johnny',
            lastName: 'Smith',
            email: 'johnny@example.com',
            role: 'admin',
        };

        const response = await request(app)
        .put(`/api/users/${user.id}`)
        .send(updatedUserPayload)
        .expect(200)


        expect(response.body.firstName).toBe(updatedUserPayload.firstName);
        expect(response.body.lastName).toBe(updatedUserPayload.lastName);
        expect(response.body.email).toBe(updatedUserPayload.email);
        expect(response.body.role).toBe(updatedUserPayload.role);
    })

    test('Return 404 to user not found', async () => {
        const nonExistentUserId = 9999; 
        
        const response = await request(app)
          .put(`/api/users/${nonExistentUserId}`) 
          .send({
            firstName: 'Johnny',
            lastName: 'Smith',
            email: 'johnny@example.com',
            role: 'admin',
          })
          .expect(404); // Esperamos um status 404
    
        // Verifica se a mensagem de erro está correta
        expect(response.body.message).toBe('Not found');
    });

});


describe('DELETE /users/:id', () => {
    test('Delete user', async () => {

        const user = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            password: 'senha123',
            email: 'john2@example.com',
            cpf: '12345678913',
            role: 'user',
        });

        const response = await request(app)
            .delete(`/api/users/${user.id}`)
            .expect(200)
        
        expect(response.body.message).toBe("Deleted Successfully")
        
        const userInDb = await User.findByPk(user.id)
        expect(userInDb).toBeNull();
        
        
    })
})





