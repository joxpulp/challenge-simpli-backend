import { db } from '../../services/mongodb/mongodb';
import { Product } from '../../utils/types/product.types';
import slugify from 'slugify';

export const Motorcycles = db.collection<Product>('motorcycles');

export async function findAll() {
  const result = Motorcycles.find();
  const motorcycles = await result.toArray();
  return motorcycles;
}
export async function insertOne(data: Product) {
  const slug = slugify(data.name);
  const insertedMotorcycles = await Motorcycles.insertOne({ ...data, slug });
  return { _id: insertedMotorcycles.insertedId, ...data, slug };
}
