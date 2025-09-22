import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { StatusCodes } from 'http-status-codes';

describe('Fake Store API', () => {
  const baseUrl = 'https://fakestoreapi.com';
  const p = pactum;
  const rep = SimpleReporter;

  p.request.setDefaultTimeout(90000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());


  describe('Get Product By ID', () => {
    it('Product', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/1`)
        .expectStatus(StatusCodes.OK)
        .expectBodyContains("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    });
  });
});
