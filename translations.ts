export const translations: { [key: string]: { [key: string]: string } } = {
  ar: {
    // App
    APP_TITLE: 'بوت الدردشة الذكي',

    // Models
    MODEL_BETA_NAME: 'بيتا (تجريبي)',
    MODEL_BETA_DESCRIPTION: 'إجابات معززة ببحث الإنترنت',
    MODEL_CHAT_NAME: 'دردشة',
    MODEL_CHAT_DESCRIPTION: 'محادثة عامة ومتتابعة',
    MODEL_IMAGE_NAME: 'إنشاء صور',
    MODEL_IMAGE_DESCRIPTION: 'تحويل أفكارك إلى صور',

    // Placeholders
    PLACEHOLDER_BETA: 'اسأل أي شيء... مثال: من فاز بكأس العالم 2022؟',
    PLACEHOLDER_CHAT: 'ابدأ محادثة...',
    PLACEHOLDER_IMAGE: 'صف صورة لإنشائها... مثال: قط رائد فضاء يركب حصانًا',

    // Error Messages
    ERROR_GENERAL: 'عذرًا، حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    ERROR_API_KEY: 'مفتاح API غير مهيأ. يرجى التأكد من تكوينه بشكل صحيح.',
    ERROR_IMAGE_GENERATION: 'فشل في إنشاء الصورة.',
    ERROR_CHAT_RESPONSE: 'فشل في الحصول على رد الدردشة.',
    ERROR_BETA_RESPONSE: 'فشل في إنشاء استجابة بيتا.',

    // Sidebar
    SIDEBAR_MODELS_HEADING: 'النماذج',
    SIDEBAR_SETTINGS_HEADING: 'الإعدادات',
    SIDEBAR_THEME: 'المظهر',
    SIDEBAR_THEME_LIGHT: 'فاتح',
    SIDEBAR_THEME_DARK: 'داكن',
    SIDEBAR_LANGUAGE: 'اللغة',
    SIDEBAR_CLEAR_CHAT: 'مسح المحادثة',
    SIDEBAR_CLEAR_CHAT_CONFIRM: 'هل أنت متأكد من أنك تريد مسح هذه المحادثة؟ لا يمكن التراجع عن هذا الإجراء.',
    SIDEBAR_RATE_APP: 'تقييم التطبيق',
    SIDEBAR_RATE_SUBMITTED: 'شكراً لتقييمك!',
    
    // Header
    HEADER_MENU_OPEN_LABEL: 'فتح القائمة',
    HEADER_MENU_CLOSE_LABEL: 'إغلاق القائمة',

    // Chat Window
    WELCOME_MESSAGE_TITLE: 'نموذج {modelName}',

    // Source List
    SOURCES_HEADING: 'المصادر:',
    
    // Gemini Service
    GEMINI_CHAT_SYSTEM_INSTRUCTION: 'أنت مساعد ودود ومفيد يتحدث باللغة العربية.',
    IMAGE_BOT_RESPONSE: 'هذه هي الصورة التي طلبتها بناءً على: "{userInput}"',
    CREATOR_RESPONSE: 'لقد تم تصميمي وتطويري بواسطة مروان جابر.',
  },
  en: {
    // App
    APP_TITLE: 'Smart Chatbot',

    // Models
    MODEL_BETA_NAME: 'Beta (Experimental)',
    MODEL_BETA_DESCRIPTION: 'Answers enhanced with web search',
    MODEL_CHAT_NAME: 'Chat',
    MODEL_CHAT_DESCRIPTION: 'General, follow-up conversation',
    MODEL_IMAGE_NAME: 'Image Generation',
    MODEL_IMAGE_DESCRIPTION: 'Turn your ideas into images',

    // Placeholders
    PLACEHOLDER_BETA: 'Ask anything... e.g., Who won the 2022 World Cup?',
    PLACEHOLDER_CHAT: 'Start a conversation...',
    PLACEHOLDER_IMAGE: 'Describe an image to create... e.g., An astronaut cat riding a horse',
    
    // Error Messages
    ERROR_GENERAL: 'Sorry, something went wrong. Please try again.',
    ERROR_API_KEY: 'API Key not configured. Please ensure it is set up correctly.',
    ERROR_IMAGE_GENERATION: 'Failed to generate image.',
    ERROR_CHAT_RESPONSE: 'Failed to get chat response.',
    ERROR_BETA_RESPONSE: 'Failed to generate beta response.',

    // Sidebar
    SIDEBAR_MODELS_HEADING: 'Models',
    SIDEBAR_SETTINGS_HEADING: 'Settings',
    SIDEBAR_THEME: 'Theme',
    SIDEBAR_THEME_LIGHT: 'Light',
    SIDEBAR_THEME_DARK: 'Dark',
    SIDEBAR_LANGUAGE: 'Language',
    SIDEBAR_CLEAR_CHAT: 'Clear Conversation',
    SIDEBAR_CLEAR_CHAT_CONFIRM: 'Are you sure you want to clear this conversation? This cannot be undone.',
    SIDEBAR_RATE_APP: 'Rate the App',
    SIDEBAR_RATE_SUBMITTED: 'Thanks for your feedback!',

    // Header
    HEADER_MENU_OPEN_LABEL: 'Open menu',
    HEADER_MENU_CLOSE_LABEL: 'Close menu',

    // Chat Window
    WELCOME_MESSAGE_TITLE: '{modelName} Model',

    // Source List
    SOURCES_HEADING: 'Sources:',

    // Gemini Service
    GEMINI_CHAT_SYSTEM_INSTRUCTION: 'You are a friendly and helpful assistant who speaks English.',
    IMAGE_BOT_RESPONSE: 'Here is the image you requested based on: "{userInput}"',
    CREATOR_RESPONSE: 'I was designed and developed by Marwan Jabr.',
  },
};
