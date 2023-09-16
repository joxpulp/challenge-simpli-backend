import { ObjectId } from 'mongodb';
import { db } from '../../services/mongodb/mongodb';
import { Lead } from '../../utils/types/lead.types';

export const Leads = db.collection<Lead>('leads');

export async function findAll() {
  const leads = await Leads.find().toArray();
  return leads;
}

export async function findOne(leadId: string) {
  try {
    const leadIdConverter = new ObjectId(leadId);
    const lead = await Leads.findOne({ _id: leadIdConverter });
    return lead;
  } catch (error) {}
}

export async function insertOne(data: Lead) {
  const insertedLead = await Leads.insertOne(data);
  return { _id: insertedLead.insertedId, ...data };
}
