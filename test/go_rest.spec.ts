import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker';

describe('GoRest API', () => {
  const baseUrl = 'https://gorest.co.in/public/v2';
  const p = pactum;
  const rep = SimpleReporter;
  const token = 'f51127df7b2c27e91c36f302e46047b4363b9e1450c8e1d6e554f4e5ae4bd9ae';

  let id;
  let name;
  let email;

  p.request.setDefaultTimeout(90000);

  beforeAll( async () => {
    p.reporter.add(rep)
      const usersResponse = await p
        .spec()
        .get(`${baseUrl}/users`)
        .expectStatus(StatusCodes.OK)
        .returns("res.body");

      expect(usersResponse.length).toBeGreaterThan(0);

      const firstUser = usersResponse[0];
      id = firstUser.id;
      name = firstUser.name;
      email = firstUser.email
    });

  afterAll(() => p.reporter.end());

  describe('Get User by Id ', () => {
    it('deve pegar o usuário pelo ID', async () => {
      await p
        .spec()
        .get(`${baseUrl}/users/${id}`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains(name)
        .expectJsonLike({
          id: id,
          name: name
        });
    });
  });

  describe('Get por ID não existente', () => {
    it('deve tentar pegar um usuário por Id inválido', async () => {
      await p
        .spec()
        .get(`${baseUrl}/users/999999999999`)
        .expectStatus(StatusCodes.NOT_FOUND)
        .expectBodyContains('Resource not found')
    });
  });


  describe('Criar novo Usuário', () => {
    it('deve enviar um cadastro de usuário com POST autenticado', async () => {
      await p
      .spec()
      .post(`${baseUrl}/users`)
      .withBearerToken(token)
      .withJson({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        gender: 'male',
        status: 'active'
      })
      .expectStatus(StatusCodes.CREATED)
    });
  });

  describe('Bloqueio de cadastro para email repetido', () => {
    it('deve enviar um cadastro de usuário com email ja existente', async () => {
      await p
      .spec()
      .post(`${baseUrl}/users`)
      .withBearerToken(token)
      .withJson({
        name: faker.person.firstName(),
        email: email,
        gender: 'male',
        status: 'active'
      })
      .expectStatus(StatusCodes.UNPROCESSABLE_ENTITY)
      .expectBodyContains('has already been taken')
    });
  });
});
