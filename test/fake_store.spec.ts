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
        .withHeaders({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        })
        .expectStatus(StatusCodes.OK)
        .expectBodyContains("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    });
  });
});
