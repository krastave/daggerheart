import React, { useState } from 'react';
import { Character, CharacterStats, DiceRoll } from '../../types';
import { motion } from 'framer-motion';
import DiceRoller from '../ui/DiceRoller';
import { ChevronDown, ChevronUp, Shield, Heart, Zap, Brain, Eye, MessageCircle } from 'lucide-react';

interface CharacterSheetProps {
  character: Character;
  stats: CharacterStats;
}

interface StatBlockProps {
  name: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatBlock: React.FC<StatBlockProps> = ({ name, value, icon, color }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<DiceRoll | null>(null);
  
  const modifier = Math.floor((value - 10) / 2);
  const modifierText = modifier >= 0 ? `+${modifier}` : `${modifier}`;
  
  const handleRoll = () => {
    setIsRolling(true);
    
    // Simulate dice roll
    setTimeout(() => {
      const result = Math.floor(Math.random() * 20) + 1;
      setLastRoll({
        type: 'd20',
        result,
        modifier,
      });
      setIsRolling(false);
    }, 1000);
  };
  
  return (
    <motion.div 
      className={`character-sheet border-l-4 ${color} p-4 cursor-pointer`}
      whileHover={{ scale: 1.02 }}
      onClick={handleRoll}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className={`p-2 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
            {icon}
          </div>
          <div className="ml-3">
            <h4 className="font-display text-lg">{name}</h4>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{value}</span>
              <span className={`ml-2 text-sm ${modifier >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({modifierText})
              </span>
            </div>
          </div>
        </div>
        
        {isRolling ? (
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-primary-500"></div>
        ) : lastRoll ? (
          <div className="flex flex-col items-end">
            <div className="text-xs text-neutral-500">d20 roll</div>
            <div className="flex items-center">
              <span className="text-lg font-bold">{lastRoll.result}</span>
              <span className="mx-1 text-neutral-500">+</span>
              <span className={`${modifier >= 0 ? 'text-green-600' : 'text-red-600'}`}>{modifierText}</span>
              <span className="mx-1">=</span>
              <span className="text-lg font-bold">{lastRoll.result + modifier}</span>
            </div>
          </div>
        ) : (
          <div className="text-primary-500 text-sm">Click to roll</div>
        )}
      </div>
    </motion.div>
  );
};

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, stats }) => {
  const [expandedSections, setExpandedSections] = useState({
    stats: true,
    abilities: true,
    inventory: false,
    biography: false,
  });
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };
  
  return (
    <div className="character-sheet max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-1/3">
          <div className="character-sheet h-full">
            <div className="relative pb-[100%] mb-4 overflow-hidden rounded-lg">
              <img 
                src={character.imageUrl || 'https://images.pexels.com/photos/6675060/pexels-photo-6675060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                alt={character.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-3xl font-display font-bold text-primary-600 mb-2">{character.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                {character.heritage}
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">
                {character.calling}
              </span>
              <span className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm">
                Level {character.level}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg mb-4">
              <div className="text-center">
                <div className="text-xs text-neutral-500 uppercase">XP</div>
                <div className="font-bold">{character.experience}</div>
              </div>
              <div className="h-10 border-l border-primary-200"></div>
              <div className="text-center">
                <div className="text-xs text-neutral-500 uppercase">Next Level</div>
                <div className="font-bold">{character.level * 1000}</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-display mb-2">Quick Roll</h3>
              <DiceRoller />
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3 space-y-6">
          {/* Stats Section */}
          <div className="character-sheet">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('stats')}
            >
              <h3 className="text-xl font-display font-bold">Attributes</h3>
              {expandedSections.stats ? (
                <ChevronUp className="h-5 w-5 text-primary-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary-500" />
              )}
            </div>
            
            {expandedSections.stats && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatBlock 
                  name="Strength" 
                  value={stats.strength} 
                  icon={<Shield className="h-5 w-5 text-primary-600" />}
                  color="border-primary-500"
                />
                <StatBlock 
                  name="Dexterity" 
                  value={stats.dexterity} 
                  icon={<Zap className="h-5 w-5 text-accent-600" />}
                  color="border-accent-500"
                />
                <StatBlock 
                  name="Constitution" 
                  value={stats.constitution} 
                  icon={<Heart className="h-5 w-5 text-red-600" />}
                  color="border-red-500"
                />
                <StatBlock 
                  name="Intelligence" 
                  value={stats.intelligence} 
                  icon={<Brain className="h-5 w-5 text-blue-600" />}
                  color="border-blue-500"
                />
                <StatBlock 
                  name="Wisdom" 
                  value={stats.wisdom} 
                  icon={<Eye className="h-5 w-5 text-green-600" />}
                  color="border-green-500"
                />
                <StatBlock 
                  name="Charisma" 
                  value={stats.charisma} 
                  icon={<MessageCircle className="h-5 w-5 text-secondary-600" />}
                  color="border-secondary-500"
                />
              </div>
            )}
          </div>
          
          {/* Abilities Section */}
          <div className="character-sheet">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('abilities')}
            >
              <h3 className="text-xl font-display font-bold">Abilities & Skills</h3>
              {expandedSections.abilities ? (
                <ChevronUp className="h-5 w-5 text-primary-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary-500" />
              )}
            </div>
            
            {expandedSections.abilities && (
              <div className="mt-4">
                <p className="text-neutral-500 italic text-center py-8">
                  Character abilities and skills will be displayed here.
                </p>
              </div>
            )}
          </div>
          
          {/* Inventory Section */}
          <div className="character-sheet">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('inventory')}
            >
              <h3 className="text-xl font-display font-bold">Inventory</h3>
              {expandedSections.inventory ? (
                <ChevronUp className="h-5 w-5 text-primary-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary-500" />
              )}
            </div>
            
            {expandedSections.inventory && (
              <div className="mt-4">
                <p className="text-neutral-500 italic text-center py-8">
                  Character inventory will be displayed here.
                </p>
              </div>
            )}
          </div>
          
          {/* Biography Section */}
          <div className="character-sheet">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('biography')}
            >
              <h3 className="text-xl font-display font-bold">Biography</h3>
              {expandedSections.biography ? (
                <ChevronUp className="h-5 w-5 text-primary-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary-500" />
              )}
            </div>
            
            {expandedSections.biography && (
              <div className="mt-4">
                <p className="text-neutral-700 leading-relaxed">
                  {character.biography || "No biography available for this character."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;