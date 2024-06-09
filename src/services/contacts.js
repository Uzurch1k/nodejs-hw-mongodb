import { СontactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await СontactsCollection.find();
  return contacts;
};

export const getContactsById = async contactId => {
  const contact = await СontactsCollection.findById(contactId);
  return contact;
};

export const createContact = async payload => {
  const contact = await СontactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload) => {
  const rawResult = await СontactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async contactId => {
  const contact = await СontactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
