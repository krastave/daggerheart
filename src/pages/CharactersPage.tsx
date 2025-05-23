import React from 'react';
import Layout from '../components/layout/Layout';
import CharacterList from '../components/character/CharacterList';

const CharactersPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CharacterList />
      </div>
    </Layout>
  );
};

export default CharactersPage;