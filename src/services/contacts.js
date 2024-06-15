import { SORT_ORDER } from '../constants/index.js';
import { СontactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const constantsQuery = СontactsCollection.find();

  if (filter.type) {
    constantsQuery.where('contactType').equals(filter.type);
  }
  if (filter.favourite) {
    constantsQuery.where('isFavourite').equals(filter.favourite);
  }

  const [constantsCount, constants] = await Promise.all([
    СontactsCollection.find().merge(constantsQuery).countDocuments(),
    constantsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(constantsCount, perPage, page);

  return {
    data: constants,
    ...paginationData,
  };
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
