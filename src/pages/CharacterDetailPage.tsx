import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCharacterStore } from '../store/characterStore';
import Layout from '../components/layout/Layout';
import CharacterSheet from '../components/character/CharacterSheet';
import Button from '../components/ui/Button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentCharacter, isLoading, error, fetchCharacterById } = useCharacterStore();
  
  useEffect(() => {
    if (id) {
      fetchCharacterById(parseInt(id, 10));
    }
  }, [id, fetchCharacterById]);
  
  // Mock character stats for demo (would come from API in real app)
  const mockStats = {
    characterId: parseInt(id || '0', 10),
    strength: 14,
    dexterity: 16,
    constitution: 12,
    intelligence: 10,
    wisdom: 13,
    charisma: 15,
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading character data...</p>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <h3 className="text-red-800 font-medium">Error loading character</h3>
            <p className="text-red-700">{error}</p>
            <Link to="/characters">
              <Button variant="outline" className="mt-4" icon={<ArrowLeft className="h-4 w-4" />}>
                Back to Characters
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!currentCharacter) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h3 className="text-yellow-800 font-medium">Character not found</h3>
            <p className="text-yellow-700">The character you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link to="/characters">
              <Button variant="outline" className="mt-4" icon={<ArrowLeft className="h-4 w-4" />}>
                Back to Characters
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/characters">
            <Button variant="outline" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>
              Back to Characters
            </Button>
          </Link>
          
          <div className="flex space-x-2">
            <Link to={`/characters/${id}/edit`}>
              <Button variant="primary" size="sm" icon={<Edit className="h-4 w-4" />}>
                Edit Character
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-red-500 text-red-500 hover:bg-red-50"
              icon={<Trash2 className="h-4 w-4" />}
            >
              Delete
            </Button>
          </div>
        </div>
        
        <CharacterSheet character={currentCharacter} stats={mockStats} />
      </div>
    </Layout>
  );
};

export default CharacterDetailPage;