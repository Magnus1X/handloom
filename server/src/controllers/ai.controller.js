import { GoogleGenerativeAI } from '@google/generative-ai';

const defaultFacts = [
    "Did you know? Handloom weaving is one of the oldest and most widespread industries in India, with roots tracing back to the Indus Valley Civilization.",
    "Did you know? India is the second-largest exporter of handloom products in the world, exporting mostly to the US, UK, and UAE.",
    "Did you know? The famous Chanderi fabric from Madhya Pradesh was traditionally woven with actual gold or silver wires in its zari.",
    "Did you know? Saffron, the most expensive spice in the world, is extensively grown in the Pampore region of Kashmir.",
    "Did you know? Banarasi silk sarees take anywhere from 15 days to a month, and sometimes up to six months to weave just one saree!"
];

export const getFunFact = async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (apiKey) {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = "Give me one very interesting and unique fun fact about Indian handloom products, authentic Indian foods, spices, or traditional Indian culture. Keep it around 2-3 sentences max. Do NOT use markdown. Start with 'Did you know?'. Make it engaging and mind-blowing.";

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            res.json({ fact: text, usingAI: true });
        } else {
            // Fallback
            const randomFact = defaultFacts[Math.floor(Math.random() * defaultFacts.length)];
            res.json({ fact: randomFact, usingAI: false });
        }
    } catch (error) {
        console.error("AI Error:", error);
        const randomFact = defaultFacts[Math.floor(Math.random() * defaultFacts.length)];
        res.json({ fact: randomFact, usingAI: false, error: 'Failed to generate AI fact' });
    }
};
