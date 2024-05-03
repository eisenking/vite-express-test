import ContactClient from '../models/contactClientModel.js';

// Контроллер для создания новой заявки
const createContactClient = async (req, res) => {
  try {
    const { phone, email, question, prefMessenger } = req.body;

    // Создаем новую заявку
    const contactClient = new ContactClient({
      phone,
      email,
      question,
      prefMessenger,
    });

    // Сохраняем заявку в базу данных
    await contactClient.save();

    res.status(201).json({ message: 'Заявка успешно добавлена' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};

export { createContactClient };