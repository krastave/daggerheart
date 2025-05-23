import React from 'react';
import { Link } from 'react-router-dom';
import { Character } from '../../types';
import Card from '../ui/Card';
import { Shield, Scroll, User } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  // Default image if none is provided
  const characterImage = character.imageUrl || 'https://images.pexels.com/photos/6675060/pexels-photo-6675060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <Card hover className="overflow-hidden">
      <Link to={`/characters/${character.id}`}>
        <div className="relative">
          <div className="h-40 overflow-hidden">
            <img 
              src={characterImage} 
              alt={character.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded text-xs font-bold">
            Level {character.level}
          </div>
        </div>
        
        <div className="pt-4">
          <h3 className="text-xl font-display font-bold text-primary-600 mb-1">
            {character.name}
          </h3>
          
          <div className="flex items-center text-sm text-neutral-600 mb-3">
            <span className="flex items-center mr-3">
              <User className="h-4 w-4 mr-1 text-accent-500" />
              {character.heritage}
            </span>
            <span className="flex items-center">
              <Scroll className="h-4 w-4 mr-1 text-secondary-500" />
              {character.calling}
            </span>
          </div>
          
          <div className="text-sm text-neutral-700 line-clamp-2 mb-3">
            {character.biography || "No biography available."}
          </div>
          
          <div className="flex justify-between items-center text-xs text-neutral-500 border-t border-neutral-200 mt-2 pt-2">
            <span>Created: {new Date(character.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              XP: {character.experience}
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default CharacterCard;