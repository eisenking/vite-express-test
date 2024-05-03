import express from 'express';
const router = express.Router();
import { createContactClient } from '../controllers/contactClientController.js';

// Маршрут для создания новой заявки
router.route('/callback').post(createContactClient);

export default router;