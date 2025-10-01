
import type { Chat } from '@google/genai';

export enum ModelType {
  BETA = 'BETA',
  IMAGE = 'IMAGE',
  CHAT = 'CHAT',
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'bot' | 'error';
  content: string;
  sources?: GroundingSource[];
  image?: string;
}

export interface ChatSession {
  [ModelType.CHAT]?: Chat;
}
