import { create } from 'zustand';
import { Character, ApiResponse } from '../types';
import { useAuthStore } from './authStore';

const API_URL = '/api';

interface CharacterState {
  characters: Character[];
  currentCharacter: Character | null;
  isLoading: boolean;
  error: string | null;
}

interface CharacterStore extends CharacterState {
  fetchUserCharacters: () => Promise<void>;
  fetchCharacterById: (id: number) => Promise<void>;
  createCharacter: (characterData: Partial<Character>) => Promise<void>;
  updateCharacter: (id: number, characterData: Partial<Character>) => Promise<void>;
  deleteCharacter: (id: number) => Promise<void>;
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  characters: [],
  currentCharacter: null,
  isLoading: false,
  error: null,

  fetchUserCharacters: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/characters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: ApiResponse<Character[]> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch characters');
      }

      set({
        characters: data.data || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },

  fetchCharacterById: async (id: number) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/characters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: ApiResponse<Character> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch character');
      }

      set({
        currentCharacter: data.data || null,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },

  createCharacter: async (characterData: Partial<Character>) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/characters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(characterData),
      });

      const data: ApiResponse<Character> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create character');
      }

      set((state) => ({
        characters: [data.data as Character, ...state.characters],
        currentCharacter: data.data as Character,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },

  updateCharacter: async (id: number, characterData: Partial<Character>) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/characters/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(characterData),
      });

      const data: ApiResponse<Character> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update character');
      }

      set((state) => ({
        characters: state.characters.map((char) =>
          char.id === id ? { ...char, ...data.data } : char
        ),
        currentCharacter: data.data as Character,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },

  deleteCharacter: async (id: number) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/characters/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: ApiResponse<null> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete character');
      }

      set((state) => ({
        characters: state.characters.filter((char) => char.id !== id),
        currentCharacter: state.currentCharacter?.id === id ? null : state.currentCharacter,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
}));