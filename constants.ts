import { ModelType } from './types';

export const MODELS: { id: ModelType; nameKey: string; descriptionKey: string; placeholderKey: string }[] = [
  {
    id: ModelType.BETA,
    nameKey: 'MODEL_BETA_NAME',
    descriptionKey: 'MODEL_BETA_DESCRIPTION',
    placeholderKey: 'PLACEHOLDER_BETA'
  },
  {
    id: ModelType.CHAT,
    nameKey: 'MODEL_CHAT_NAME',
    descriptionKey: 'MODEL_CHAT_DESCRIPTION',
    placeholderKey: 'PLACEHOLDER_CHAT'
  },
  {
    id: ModelType.IMAGE,
    nameKey: 'MODEL_IMAGE_NAME',
    descriptionKey: 'MODEL_IMAGE_DESCRIPTION',
    placeholderKey: 'PLACEHOLDER_IMAGE'
  },
];
