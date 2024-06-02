import { СontactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await СontactsCollection.find();
  return contacts;
};

export const getContactsById = async contactId => {
  const contact = await СontactsCollection.findById(contactId);
  return contact;
};
