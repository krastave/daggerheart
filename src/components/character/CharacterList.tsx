import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCharacterStore } from '../../store/characterStore';
import CharacterCard from './CharacterCard';
import Button from '../ui/Button';
import { Plus, RefreshCw } from 'lucide-react';

const CharacterList: React.FC = () => {
  const { characters, isLoading, error, fetchUserCharacters } = useCharacterStore();

  useEffect(() => {
    fetchUserCharacters();
  }, [fetchUserCharacters]);

  if (isLoading && characters.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
        <p className="font-medium">Error loading characters</p>
        <p className="text-sm">{error}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2"
          onClick={() => fetchUserCharacters()}
          icon={<RefreshCw className="h-4 w-4" />}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-bold text-primary-700">Your Characters</h2>
        <Link to="/characters/new">
          <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
            Create New Character
          </Button>
        </Link>
      </div>

      {characters.length === 0 ? (
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-medium text-neutral-700 mb-2">No Characters Found</h3>
          <p className="text-neutral-600 mb-6">
            You haven't created any characters yet. Start your adventure by creating your first character!
          </p>
          <Link to="/characters/new">
            <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
              Create Your First Character
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterList;