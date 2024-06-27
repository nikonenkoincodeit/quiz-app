import { createI18n } from "vue-i18n";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import cs from "./locales/cs.json";
import de from "./locales/de.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import it from "./locales/it.json";
import nl from "./locales/nl.json";
import pl from "./locales/pl.json";
import uk from "./locales/uk.json";

const messages = {
  en,
  ru,
  cs,
  de,
  es,
  fr,
  it,
  nl,
  pl,
  uk,
};

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});
