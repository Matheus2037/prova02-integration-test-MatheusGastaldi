import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { StatusCodes } from 'http-status-codes';

describe('Fake Store API', () => {
  const baseUrl = 'https://gorest.co.in/public/v2';
  const p = pactum;
  const rep = SimpleReporter;

  p.request.setDefaultTimeout(90000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());


  describe('Get Booker By ID', () => {
    it('Product', async () => {
      await p
        .spec()
        .get(`${baseUrl}/users/7440571`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains("Amrit Gowda")
    });
  });
});
