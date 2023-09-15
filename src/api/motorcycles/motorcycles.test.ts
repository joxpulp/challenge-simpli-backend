import request from 'supertest';
import app from '../../index';

describe('Get /api/motorcycles/list', () => {
  it('200 - Responds with an object containing paging and products with an array of motorcycles products', async () => {
    const response = await request(app).get('/api/motorcycles/list').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);

    expect(response.body).toHaveProperty('products');
    expect(response.body.products.length).toBeGreaterThan(0);
    expect(response.body).toHaveProperty('paging');
    expect(response.body.paging).toBeNull();
  });
});

describe('Get /api/motorcycles/list?page=1&limit=2', () => {
  it('200 - Responds with an object containing paging with an object containing the following properties: total_pages, current_pages, total_products', async () => {
    const response = await request(app).get('/api/motorcycles/list').query({ page: 1, limit: 2 }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);

    expect(response.body).toHaveProperty('products');
    expect(response.body.products.length).toEqual(2);
    expect(response.body).toHaveProperty('paging');
    expect(response.body.paging).toHaveProperty('total_pages');
    expect(response.body.paging).toHaveProperty('current_page');
    expect(response.body.paging).toHaveProperty('total_products');
  });

  it('422 - Responds with a message saying that the page param passed cannot be 0', async () => {
    const response = await request(app).get('/api/motorcycles/list').query({ page: 0, limit: 1 }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(422);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('page param cannot be 0');
  });
});

describe('Get /api/motorcycles/list?page=1&limit=2&sort_by=asc/desc', () => {
  it('200 - Responds with an object containing paging with an object containing the following properties: total_pages, current_pages, total_products', async () => {
    const response = await request(app).get('/api/motorcycles/list').query({ page: 1, limit: 2, sort_by: 'asc' }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);

    expect(response.body).toHaveProperty('products');
    expect(response.body.products.length).toEqual(2);
    expect(response.body.products[0]).toHaveProperty('name');
    expect(response.body.products[0].name).toBe('Hundai motitos');
    expect(response.body).toHaveProperty('paging');
    expect(response.body.paging).toHaveProperty('total_pages');
    expect(response.body.paging).toHaveProperty('current_page');
    expect(response.body.paging).toHaveProperty('total_products');
  });

  it('422 - Responds with a message saying that sort_by param accepts asc/desc as values', async () => {
    const response = await request(app).get('/api/motorcycles/list').query({ page: 1, limit: 2, sort_by: 'asodjo' }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(422);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('sort_by param only accepts asc/desc as values');
  });
});

describe('POST /api/motorcycles/add', () => {
  const productToAdd = {
    name: 'Moto Prueba',
    image: 'https://img.freepik.com/premium-psd/premium-motorcycle-mockup_473561-248.jpg',
    description: 'A motorcycle is a two-wheeled vehicle with an engine. Motorcycles are bigger, heavier, and much faster than bicycles, but they have many similar parts.',
    price: 422,
    currency: 'USD'
  };

  it('201 - Responds with an object of the inserted motorcycle', async () => {
    const response = await request(app).post('/api/motorcycles/add').set('Accept', 'application/json').send(productToAdd).expect('Content-Type', /json/).expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe('Moto Prueba');
  });

  it('422 - Responds with a message saying that price must be a string', async () => {
    const response = await request(app)
      .post('/api/motorcycles/add')
      .set('Accept', 'application/json')
      .send({ ...productToAdd, price: '422' })
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('price must be a number');
  });

  it('422 - Responds with a message saying that body properties are required', async () => {
    const response = await request(app).post('/api/motorcycles/add').set('Accept', 'application/json').send({}).expect('Content-Type', /json/).expect(422);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('image is required');
  });

  it('422 - Responds with a 422 and message saying that the property to add is not accepted', async () => {
    const response = await request(app)
      .post('/api/motorcycles/add')
      .set('Accept', 'application/json')
      .send({ ...productToAdd, pepep: 'dasdo' })
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('the property you are trying to add in the body is not valid, this endpoint only accepts: image, name, description, price and currency');
  });
});

describe('GET /api/motorcycles/list/:slug', () => {
  it('200 - Responds with an object containing the motorcycle finded by the slug', async () => {
    const response = await request(app).get('/api/motorcycles/list/moto-prueba').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe('Moto Prueba');
  });

  it('404 - Responds with status 404 and an message saying that the requested motorcycle does not exist', async () => {
    const response = await request(app).get('/api/motorcycles/list/asdjoasjo').set('Accept', 'application/json').expect('Content-Type', /json/).expect(404);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('product with slug: asdjoasjo, does not exist');
  });
});
