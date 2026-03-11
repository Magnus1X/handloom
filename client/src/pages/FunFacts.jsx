import { useState, useEffect } from 'react';
import { Lightbulb, Sparkles, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const FunFacts = () => {
    const [fact, setFact] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAI, setIsAI] = useState(false);
    const { isDark } = useTheme();

    const fetchFact = async () => {
        try {
            setLoading(true);
            // Fetch fun fact from our backend
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/ai/fun-fact`);
            setFact(response.data.fact);
            setIsAI(response.data.usingAI);
        } catch (error) {
            console.error('Error fetching fact:', error);
            setFact("Did you know? Handloom weaving is one of the oldest and most widespread industries in India, with roots tracing back to the Indus Valley Civilization.");
            setIsAI(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFact();
    }, []);

    return (
        <div className={`min-h-[80vh] ${isDark ? 'bg-background' : 'bg-earth-cream/30'} flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <img src="/pattern1.png" alt="" className="absolute top-10 left-10 w-24 h-24 opacity-10 animate-spin-slow" />
                <img src="/pattern3.png" alt="" className="absolute bottom-10 right-10 w-32 h-32 opacity-10 animate-float" />
            </div>

            <div className="max-w-3xl w-full z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-earth-terracotta/10 rounded-full mb-4">
                        <Sparkles className="h-8 w-8 text-earth-terracotta" />
                    </div>
                    <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-earth-brown'} mb-4`}>
                        Discover India
                    </h1>
                    <p className={`text-xl ${isDark ? 'text-white/70' : 'text-earth-brown/70'}`}>
                        Fascinating Insights & Fun Facts {isAI && <span className="text-earth-terracotta font-medium ml-1">Powered by AI</span>}
                    </p>
                </div>

                <Card className={`overflow-hidden shadow-xl ${isDark ? 'bg-black/40 border-earth-terracotta/30' : 'bg-white border-earth-beige'}`}>
                    <div className="h-2 w-full bg-gradient-to-r from-earth-beige via-earth-terracotta to-earth-brown"></div>
                    <CardContent className="p-8 md:p-12 flex flex-col items-center text-center">

                        <Lightbulb className={`h-12 w-12 mb-6 ${isDark ? 'text-earth-cream' : 'text-earth-terracotta'}`} />

                        {loading ? (
                            <div className="space-y-4 w-full max-w-lg mb-8">
                                <div className={`h-6 rounded animate-pulse ${isDark ? 'bg-white/10' : 'bg-earth-cream'}`}></div>
                                <div className={`h-6 rounded animate-pulse w-5/6 mx-auto ${isDark ? 'bg-white/10' : 'bg-earth-cream'}`}></div>
                                <div className={`h-6 rounded animate-pulse w-4/6 mx-auto ${isDark ? 'bg-white/10' : 'bg-earth-cream'}`}></div>
                            </div>
                        ) : (
                            <p className={`text-2xl md:text-3xl font-medium leading-relaxed mb-10 ${isDark ? 'text-white/90' : 'text-earth-brown'}`}>
                                "{fact.replace('Did you know? ', '').replace('Did you know?', '')}"
                            </p>
                        )}

                        <Button
                            onClick={fetchFact}
                            disabled={loading}
                            className={`text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all ${isDark ? 'bg-earth-terracotta text-white hover:bg-earth-terracotta/90' : 'bg-earth-brown text-white hover:bg-earth-brown/90'}`}
                        >
                            <RefreshCw className={`mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                            {loading ? 'Discovering...' : 'Show Me Another Fact'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FunFacts;
