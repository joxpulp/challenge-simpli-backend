import { SortDirection } from 'mongodb';
import { db } from '../../services/mongodb/mongodb';
import { Product } from '../../utils/types/product.types';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export const Accessories = db.collection<Product>('accessories');

export async function findAll(currentPage: number = 0, limit: number = 0, sort?: SortDirection, minPrice?: number, maxPrice?: number) {
  const minMaxPriceFilter = { ...((minPrice || maxPrice) && { price: { ...(minPrice && { $gte: minPrice }), ...(maxPrice && { $lte: maxPrice }) } }) };
  const page = currentPage - 1;
  const totalProducts = await Accessories.countDocuments(minMaxPriceFilter);
  const totalPages = Math.ceil(totalProducts / limit);
  const accessoriesData = await Accessories.find(minMaxPriceFilter)
    .skip(page * limit)
    .limit(limit)
    .sort({ ...(sort && { name: sort }), ...((minPrice || maxPrice) && { price: 'asc' }) })
    .toArray();

  const paging = currentPage && limit ? { total_products: totalProducts, total_pages: totalPages, current_page: currentPage } : null;
  const accessoriesDataWithPaging = { products: accessoriesData, paging };

  return accessoriesDataWithPaging;
}

export async function findOne(slug: string) {
  const accessory = await Accessories.findOne({ slug });
  return accessory;
}

export async function insertOne(data: Product) {
  const productNameExist = await Accessories.findOne({ name: data.name });
  let slug = slugify(data.name, { lower: true });

  if (productNameExist) slug = `${slug}-${uuidv4()}`;

  const insertedAccessories = await Accessories.insertOne({ ...data, slug });
  return { _id: insertedAccessories.insertedId, ...data, slug };
}
