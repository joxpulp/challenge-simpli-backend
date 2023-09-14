import { db } from '../../services/mongodb/mongodb';
import { Product } from '../../utils/types/product.types';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export const Motorcycles = db.collection<Product>('motorcycles');

export async function findAll() {
  const result = Motorcycles.find();
  const motorcycles = await result.toArray();
  return motorcycles;
}
export async function insertOne(data: Product) {
  const productNameExist = await Motorcycles.findOne({ name: data.name });
  let slug = slugify(data.name);

  if (productNameExist) slug = slug + uuidv4();

  const insertedMotorcycles = await Motorcycles.insertOne({ ...data, slug });
  return { _id: insertedMotorcycles.insertedId, ...data, slug };
}
