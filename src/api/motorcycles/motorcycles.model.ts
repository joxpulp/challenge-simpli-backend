import { db } from '../../services/mongodb/mongodb';
import { Product } from '../../utils/types/product.types';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export const Motorcycles = db.collection<Product>('motorcycles');

export async function findAll(currentPage: number, limit: number) {
  const page = currentPage - 1;
  const result = Motorcycles.find()
    .skip(page * limit)
    .limit(limit);
  const motorcycles = await result.toArray();

  const totalProducts = await Motorcycles.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);
  const meta = currentPage && limit ? { total_products: totalProducts, total_pages: totalPages, current_page: currentPage } : null;
  const motorcycleWithMeta = { products: motorcycles, meta };

  return motorcycleWithMeta;
}

export async function findOne(slug: string) {
  const motorcycle = await Motorcycles.findOne({ slug });
  return motorcycle;
}

export async function insertOne(data: Product) {
  const productNameExist = await Motorcycles.findOne({ name: data.name });
  let slug = slugify(data.name, { lower: true });

  if (productNameExist) slug = `${slug}-${uuidv4()}`;

  const insertedMotorcycles = await Motorcycles.insertOne({ ...data, slug });
  return { _id: insertedMotorcycles.insertedId, ...data, slug };
}
