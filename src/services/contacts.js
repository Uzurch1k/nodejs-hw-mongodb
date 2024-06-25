import { SORT_ORDER } from '../constants/index.js';

import { СontactsCollection } from '../db/models/contacts.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = СontactsCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.favourite) {
    contactsQuery.where('isFavourite').equals(filter.favourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    СontactsCollection.find({ userId }).merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = async (contactId, userId) => {
  const contact = await СontactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async payload => {
  const contact = await СontactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  const rawResult = await СontactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
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

export const deleteContact = async (contactId, userId) => {
  const contact = await СontactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
