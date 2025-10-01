
import { ModelType } from './types';

export const APP_TITLE = 'بوت الدردشة الذكي';

export const MODELS: { id: ModelType; name: string; description: string }[] = [
  {
    id: ModelType.BETA,
    name: 'بيتا (تجريبي)',
    description: 'إجابات معززة ببحث الإنترنت',
  },
  {
    id: ModelType.CHAT,
    name: 'دردشة',
    description: 'محادثة عامة ومتتابعة',
  },
  {
    id: ModelType.IMAGE,
    name: 'إنشاء صور',
    description: 'تحويل أفكارك إلى صور',
  },
];

export const PLACEHOLDERS: { [key in ModelType]: string } = {
  [ModelType.BETA]: 'اسأل أي شيء... مثال: من فاز بكأس العالم 2022؟',
  [ModelType.CHAT]: 'ابدأ محادثة...',
  [ModelType.IMAGE]: 'صف صورة لإنشائها... مثال: قط رائد فضاء يركب حصانًا',
};

export const ERROR_MESSAGES = {
  GENERAL: 'عذرًا، حدث خطأ ما. يرجى المحاولة مرة أخرى.',
  API_KEY: 'مفتاح API غير مهيأ. يرجى التأكد من تكوينه بشكل صحيح.'
};
