import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config()

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

router.get('/api/trip-plan/:city1/:city2/:count/:food/:places/:hobbies/', (req, res) => {
  const getTripPlan = async () => {
  const prompt = `Please provide a detailed plan for each day of a road trip. The road trip will start from ${req.params.city1} and end at ${req.params.city2}, lasting for ${req.params.count} days. The plan should include a breakfast place, a lunch restaurant, a dinner restaurant, and 1 to 2 places to visit each day. To personalize the plan, please consider the following information: the traveler loves ${req.params.food} food, enjoys visiting ${req.params.places} places, and has hobbies and other interests such as ${req.params.hobbies}. It is requested to output a personalized description of each day of the trip with a narrative.`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  res.json(text);
}

getTripPlan();
});
  

export default router;