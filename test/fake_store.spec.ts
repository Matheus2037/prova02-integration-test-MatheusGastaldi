import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { StatusCodes } from 'http-status-codes';

describe('GoRest API', () => {
  const baseUrl = 'https://gorest.co.in/public/v2';
  const p = pactum;
  const rep = SimpleReporter;

  p.request.setDefaultTimeout(90000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Get user dynamically', () => {
    it('should get first user and validate by id', async () => {
      const usersResponse = await p
        .spec()
        .get(`${baseUrl}/users`)
        .expectStatus(StatusCodes.OK)
        .returns("res.body");

      expect(usersResponse.length).toBeGreaterThan(0);

      const firstUser = usersResponse[0];
      const { id, name } = firstUser;

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
});
