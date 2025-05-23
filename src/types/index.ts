// User related types
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Character related types
export interface Character {
  id: number;
  userId: number;
  name: string;
  heritage: string;
  calling: string;
  level: number;
  experience: number;
  biography: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CharacterStats {
  characterId: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface CharacterSkill {
  id: number;
  characterId: number;
  name: string;
  description: string;
  modifier: string;
  isProficient: boolean;
}

export interface Ability {
  id: number;
  characterId: number;
  name: string;
  description: string;
  source: string;
  usageType: 'passive' | 'active';
  usesPerDay?: number;
}

// Inventory related types
export interface InventoryItem {
  id: number;
  characterId: number;
  name: string;
  description: string;
  quantity: number;
  weight: number;
  value: number;
  category: 'weapon' | 'armor' | 'equipment' | 'consumable' | 'treasure';
  isEquipped: boolean;
}

// Dice related types
export interface DiceRoll {
  type: 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';
  result: number;
  modifier?: number;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}