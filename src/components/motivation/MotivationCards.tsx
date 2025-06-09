
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Edit2, Save, X, RefreshCw } from 'lucide-react';

interface MotivationCard {
  id: string;
  title: string;
  content: string;
  category: 'quote' | 'personal' | 'goal';
  isPinned: boolean;
}

export const MotivationCards = () => {
  const [cards, setCards] = useState<MotivationCard[]>([
    {
      id: '1',
      title: 'Daily Inspiration',
      content: 'The way to get started is to quit talking and begin doing. - Walt Disney',
      category: 'quote',
      isPinned: false,
    },
    {
      id: '2',
      title: 'Personal Reminder',
      content: 'I am working towards my Computer Science degree to build innovative software that helps people.',
      category: 'personal',
      isPinned: true,
    },
  ]);

  const [currentCard, setCurrentCard] = useState<MotivationCard | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn't just find you. You have to go out and get it.",
  ];

  const getRandomQuote = () => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    const newCard: MotivationCard = {
      id: Date.now().toString(),
      title: 'Daily Inspiration',
      content: randomQuote,
      category: 'quote',
      isPinned: false,
    };
    
    // Replace existing quote cards with new one
    setCards(prev => [
      ...prev.filter(card => card.category !== 'quote'),
      newCard
    ]);
    setCurrentCard(newCard);
  };

  const togglePin = (cardId: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isPinned: !card.isPinned } : card
    ));
  };

  const startEdit = (card: MotivationCard) => {
    setIsEditing(true);
    setEditContent(card.content);
    setCurrentCard(card);
  };

  const saveEdit = () => {
    if (currentCard) {
      setCards(prev => prev.map(card => 
        card.id === currentCard.id ? { ...card, content: editContent } : card
      ));
      setCurrentCard({ ...currentCard, content: editContent });
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditContent('');
  };

  const addPersonalCard = () => {
    const newCard: MotivationCard = {
      id: Date.now().toString(),
      title: 'Personal Motivation',
      content: 'Add your personal motivation here...',
      category: 'personal',
      isPinned: false,
    };
    setCards(prev => [...prev, newCard]);
    startEdit(newCard);
  };

  useEffect(() => {
    // Set initial current card to pinned card or first card
    const pinnedCard = cards.find(card => card.isPinned);
    setCurrentCard(pinnedCard || cards[0] || null);
  }, []);

  useEffect(() => {
    // Rotate through unpinned cards every 30 seconds
    if (!currentCard?.isPinned) {
      const interval = setInterval(() => {
        const unpinnedCards = cards.filter(card => !card.isPinned);
        if (unpinnedCards.length > 1) {
          const currentIndex = unpinnedCards.findIndex(card => card.id === currentCard?.id);
          const nextIndex = (currentIndex + 1) % unpinnedCards.length;
          setCurrentCard(unpinnedCards[nextIndex]);
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [currentCard, cards]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Motivation Hub
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Stay inspired with personalized motivation cards
        </p>
      </div>

      {/* Main Motivation Card Display */}
      {currentCard && (
        <Card className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200/20 text-center">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              {currentCard.title}
            </h3>
            {currentCard.isPinned && (
              <Badge className="ml-2 bg-yellow-100 text-yellow-800">Pinned</Badge>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[100px] text-center"
                placeholder="Enter your motivation..."
              />
              <div className="flex justify-center gap-2">
                <Button onClick={saveEdit} size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={cancelEdit} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                {currentCard.content}
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => togglePin(currentCard.id)}
                  variant="outline"
                  size="sm"
                >
                  {currentCard.isPinned ? 'Unpin' : 'Pin This'}
                </Button>
                <Button
                  onClick={() => startEdit(currentCard)}
                  variant="outline"
                  size="sm"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                {currentCard.category === 'quote' && (
                  <Button onClick={getRandomQuote} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    New Quote
                  </Button>
                )}
              </div>
            </>
          )}
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button onClick={getRandomQuote} className="bg-gradient-to-r from-blue-500 to-purple-600">
          <RefreshCw className="w-4 h-4 mr-2" />
          Get Random Quote
        </Button>
        <Button onClick={addPersonalCard} variant="outline">
          <Edit2 className="w-4 h-4 mr-2" />
          Add Personal Card
        </Button>
      </div>

      {/* All Cards Management */}
      <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
          Manage Your Cards
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                currentCard?.id === card.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              onClick={() => setCurrentCard(card)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-slate-800 dark:text-slate-100">
                  {card.title}
                </h4>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {card.category}
                  </Badge>
                  {card.isPinned && (
                    <Badge className="text-xs bg-yellow-100 text-yellow-800">
                      📌
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {card.content}
              </p>
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(card.id);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  {card.isPinned ? 'Unpin' : 'Pin'}
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(card);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
