import request from 'supertest';
import app from '../../app';

describe('POST /api/leads/add', () => {
  const leadToAdd = {
    name: 'Josue',
    lastname: 'Pantoja',
    email: 'joxpulp@gmail.com',
    phone: '1167376954',
    product_name: 'Breakout',
    product_id: '65047bf4f34cbcc737c29ed4'
  };

  it('201 - Responds with an object of the inserted lead', async () => {
    const response = await request(app).post('/api/leads/add').set('Accept', 'application/json').send(leadToAdd).expect('Content-Type', /json/).expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe('Josue');
    expect(response.body).toHaveProperty('lastname');
    expect(response.body.lastname).toBe('Pantoja');
  });

  it('422 - Responds with a message saying that the email is invalid', async () => {
    const response = await request(app)
      .post('/api/leads/add')
      .set('Accept', 'application/json')
      .send({ ...leadToAdd, email: '422' })
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('email is invalid');
  });

  it('422 - Responds with a message saying that body properties are required', async () => {
    const response = await request(app).post('/api/leads/add').set('Accept', 'application/json').send({}).expect('Content-Type', /json/).expect(422);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('name is required');
  });

  it('422 - Responds with a 422 and message saying that the property to add is not accepted', async () => {
    const response = await request(app)
      .post('/api/leads/add')
      .set('Accept', 'application/json')
      .send({ ...leadToAdd, pepep: 'dasdo' })
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('the property you are trying to add in the body is not valid, this endpoint only accepts: name, lastname, email, phone, product_name and product_id');
  });
});
