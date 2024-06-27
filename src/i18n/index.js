import { createI18n } from "vue-i18n";

// Импортируем переводы
import en from "./locales/en.json";
import ru from "./locales/ru.json";

const messages = {
  en,
  ru,
};

export const i18n = createI18n({
  locale: "en", // Язык по умолчанию
  fallbackLocale: "en", // Язык, который будет использован, если текущий перевод отсутствует
  messages,
});
