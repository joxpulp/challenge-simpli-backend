import { db } from '../../services/mongodb/mongodb';
import { Lead } from '../../utils/types/lead.types';

export const Leads = db.collection<Lead>('leads');

export async function insertOne(data: Lead) {
  const insertedLead = await Leads.insertOne(data);
  return { _id: insertedLead.insertedId, ...data };
}
