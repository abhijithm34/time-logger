import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Time Logger": "Time Logger",
      "Add Activity": "Add Activity",
      "Activity": "Activity",
      "Minutes": "Minutes",
      "Add": "Add",
      "Filter by activity": "Filter by activity",
      "Entries for": "Entries for",
      "Total": "Total",
      "No entries found.": "No entries found.",
      "Summary by Activity": "Summary by Activity",
      "No summary for this date.": "No summary for this date.",
      "Summary List": "Summary List",
      "Entry added!": "Entry added!",
      "Entry deleted!": "Entry deleted!",
      "Failed to fetch logs": "Failed to fetch logs",
      "Failed to fetch summary": "Failed to fetch summary",
      "Failed to add entry": "Failed to add entry",
      "Failed to delete entry": "Failed to delete entry",
      "Loading...": "Loading...",
      "Language": "Language"
    }
  },
  es: {
    translation: {
      "Time Logger": "Registro de Tiempo",
      "Add Activity": "Agregar Actividad",
      "Activity": "Actividad",
      "Minutes": "Minutos",
      "Add": "Agregar",
      "Filter by activity": "Filtrar por actividad",
      "Entries for": "Entradas para",
      "Total": "Total",
      "No entries found.": "No se encontraron entradas.",
      "Summary by Activity": "Resumen por Actividad",
      "No summary for this date.": "No hay resumen para esta fecha.",
      "Summary List": "Lista de Resumen",
      "Entry added!": "¡Entrada agregada!",
      "Entry deleted!": "¡Entrada eliminada!",
      "Failed to fetch logs": "Error al obtener registros",
      "Failed to fetch summary": "Error al obtener resumen",
      "Failed to add entry": "Error al agregar entrada",
      "Failed to delete entry": "Error al eliminar entrada",
      "Loading...": "Cargando...",
      "Language": "Idioma"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 