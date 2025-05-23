import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dice } from 'lucide-react';
import { DiceRoll } from '../../types';

interface DiceRollerProps {
  onRollComplete?: (roll: DiceRoll) => void;
  defaultDice?: 'd20';
  modifier?: number;
}

const DiceRoller: React.FC<DiceRollerProps> = ({
  onRollComplete,
  defaultDice = 'd20',
  modifier = 0,
}) => {
  const [selectedDice, setSelectedDice] = useState<DiceRoll['type']>(defaultDice);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [showDiceSelector, setShowDiceSelector] = useState(false);

  const diceTypes: DiceRoll['type'][] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
  
  const getDiceMax = (dice: DiceRoll['type']): number => {
    return parseInt(dice.substring(1), 10);
  };

  const rollDice = () => {
    setIsRolling(true);
    setResult(null);
    
    // Simulate rolling animation
    const animationDuration = 1000;
    const rollInterval = 50;
    const iterations = animationDuration / rollInterval;
    let count = 0;
    
    const max = getDiceMax(selectedDice);
    
    const interval = setInterval(() => {
      const randomRoll = Math.floor(Math.random() * max) + 1;
      setResult(randomRoll);
      
      count++;
      if (count >= iterations) {
        clearInterval(interval);
        setIsRolling(false);
        
        // Final result
        const finalResult = Math.floor(Math.random() * max) + 1;
        setResult(finalResult);
        
        // Notify parent component
        if (onRollComplete) {
          onRollComplete({
            type: selectedDice,
            result: finalResult,
            modifier,
          });
        }
      }
    }, rollInterval);
  };

  return (
    <div className="inline-block relative">
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.button
          className="flex items-center justify-center p-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onClick={() => setShowDiceSelector(!showDiceSelector)}
          whileTap={{ scale: 0.95 }}
        >
          <Dice className="h-5 w-5" />
          <span className="ml-1">{selectedDice}</span>
        </motion.button>
        
        <motion.button
          className={`px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 ${
            isRolling ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          onClick={rollDice}
          disabled={isRolling}
          whileTap={{ scale: 0.95 }}
        >
          {isRolling ? 'Rolling...' : 'Roll'}
        </motion.button>
        
        {(result !== null || modifier !== 0) && (
          <div className="flex items-center space-x-1 min-w-[60px]">
            <motion.span
              key={result}
              className="font-bold text-lg"
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {result}
            </motion.span>
            
            {modifier !== 0 && (
              <>
                <span className="text-neutral-500">{modifier > 0 ? '+' : ''}{modifier}</span>
                <span className="font-bold">=</span>
                <span className="font-bold text-lg">
                  {result !== null ? result + modifier : ''}
                </span>
              </>
            )}
          </div>
        )}
      </motion.div>
      
      <AnimatePresence>
        {showDiceSelector && (
          <motion.div
            className="absolute top-full left-0 mt-2 p-2 bg-white rounded-md shadow-lg z-10 flex flex-wrap gap-2 w-[220px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {diceTypes.map((dice) => (
              <button
                key={dice}
                className={`dice ${
                  selectedDice === dice ? 'bg-primary-600 ring-2 ring-primary-300' : ''
                }`}
                onClick={() => {
                  setSelectedDice(dice);
                  setShowDiceSelector(false);
                  setResult(null);
                }}
              >
                {dice}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiceRoller;