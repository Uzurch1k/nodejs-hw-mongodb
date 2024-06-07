import { getAllContacts, getContactsById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getStudentByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);

    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Not found',
      error: error.message,
    });
  }
};

// app.get('/contacts', async (req, res) => {
//   const contacts = await getAllContacts();

//   res.status(200).json({
//     message: 'Successfully found contacts!',
//     data: contacts,
//   });
// });

// app.get('/contacts/:contactId', async (req, res) => {
//   try {
//     const { contactId } = req.params;
//     const contact = await getContactsById(contactId);

//     res.status(200).json({
//       message: `Successfully found contact with id ${contactId}!`,
//       data: contact,
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: 'Not found',
//       error: error.message,
//     });
//   }
// });
