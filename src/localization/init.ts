import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/localization/locales/en.json';
import ru from '@/localization/locales/ru.json';

const STORAGE_KEY = 'app.lang';

export async function initI18n() {
	const savedLang = await AsyncStorage.getItem(STORAGE_KEY);
	const systemLang = Localization.getLocales()?.[0]?.languageCode ?? 'en';
	const initial = (savedLang || systemLang || 'en')
		.toLowerCase()
		.startsWith('ru')
		? 'ru'
		: 'en';

	if (!i18n.isInitialized) {
		await i18n.use(initReactI18next).init({
			compatibilityJSON: 'v4',
			resources: {
				en: { common: en },
				ru: { common: ru },
			},
			lng: initial,
			fallbackLng: 'en',
			ns: ['common'],
			defaultNS: 'common',
			interpolation: { escapeValue: false },
		});
	} else {
		i18n.changeLanguage(initial);
	}
}

export async function setLanguage(lang: 'en' | 'ru') {
	await i18n.changeLanguage(lang);
	await AsyncStorage.setItem(STORAGE_KEY, lang);
}

export default i18n;
