import { SortDirection } from 'mongodb';
import { db } from '../../services/mongodb/mongodb';
import { Product } from '../../utils/types/product.types';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export const Motorcycles = db.collection<Product>('motorcycles');

export async function findAll(currentPage: number = 0, limit: number = 0, sort?: SortDirection, minPrice?: number, maxPrice?: number) {
  const minMaxPriceFilter = { ...((minPrice || maxPrice) && { price: { ...(minPrice && { $gte: minPrice }), ...(maxPrice && { $lte: maxPrice }) } }) };
  const page = currentPage - 1;
  const totalProducts = await Motorcycles.countDocuments(minMaxPriceFilter);
  const totalPages = Math.ceil(totalProducts / limit);
  const motorcyclesData = await Motorcycles.find(minMaxPriceFilter)
    .skip(page * limit)
    .limit(limit)
    .sort({ ...(sort && { name: sort }), ...((minPrice || maxPrice) && { price: 'asc' }) })
    .toArray();

  const paging = currentPage && limit ? { total_products: totalProducts, total_pages: totalPages, current_page: currentPage } : null;
  const motorcycleDataWithPaging = { products: motorcyclesData, paging };

  return motorcycleDataWithPaging;
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
