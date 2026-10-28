import girl from '@/assets/girl.png.asset.json';
import guy from '@/assets/guy.png.asset.json';
import room from '@/assets/room.png.asset.json';
import flash from '@/assets/character-flash.jpg.asset.json';
import depth from '@/assets/character-depth.jpg.asset.json';
import cube from '@/assets/character-cube.jpg.asset.json';
import leya from '@/assets/character-leya.jpg.asset.json';
import guide from '@/assets/character-guide.jpg.asset.json';
import pusha from '@/assets/character-pusha.jpg.asset.json';
import sky from '@/assets/character-sky.jpg.asset.json';
import calm from '@/assets/character-calm.jpg.asset.json';
import guardian from '@/assets/character-guardian.jpg.asset.json';
import tikhon from '@/assets/character-tikhon.jpg.asset.json';

export const characters = [
  { name: 'Вспышка', image: flash.url, trait: 'Вдохновение · Позитив · Креативность', description: 'Вдохновляет видеть красоту в мелочах и замечать хорошее.', uploaded: true },
  { name: 'Глубина', image: depth.url, trait: 'Спокойствие · Рефлексия · Эмоциональный баланс', description: 'Помогает замедлиться, успокоить мысли и найти баланс.', uploaded: true },
  { name: 'Кубик', image: cube.url, trait: 'Энергия · Действие · Развитие', description: 'Вдохновляет действовать и делать маленькие шаги к большим целям.', uploaded: true },
  { name: 'Лея', image: leya.url, trait: 'Самопознание · Эмпатия · Гармония', description: 'Помогает лучше понимать себя и свои эмоции.', uploaded: true },
  { name: 'Проводник', image: guide.url, trait: 'Цели · Планирование · Действие', description: 'Помогает ставить цели, планировать и двигаться к результату.', uploaded: true },
  { name: 'Пуша', image: pusha.url, trait: 'Доброта · Оптимизм · Вдохновение', description: 'Дарит тепло и помогает замечать хорошее в мелочах.', uploaded: true },
  { name: 'Скай', image: sky.url, trait: 'Поддержка · Уверенность · Баланс', description: 'Поддерживает в сложные моменты и напоминает о важном.', uploaded: true },
  { name: 'Спокойствие', image: calm.url, trait: 'Расслабление · Восстановление · Дыхание', description: 'Помогает справляться со стрессом и восстанавливать ресурсы.', uploaded: true },
  { name: 'Страж', image: guardian.url, trait: 'Уверенность · Поддержка · Границы', description: 'Поддерживает в трудные моменты и помогает соблюдать границы.', uploaded: true },
  { name: 'Тихон', image: tikhon.url, trait: 'Спокойствие · Фокус · Устойчивость', description: 'Помогает сохранять спокойствие и не терять фокус.', uploaded: true },
  { name: 'Мира', image: girl.url, trait: 'Тепло и внимание', description: 'Поможет услышать себя и найти спокойствие в потоке мыслей.' },
  { name: 'Лев', image: guy.url, trait: 'Ясность и поддержка', description: 'Разложит большое на маленькие шаги. Без спешки и давления.' },
  { name: 'Ася', image: room.url, trait: 'Любопытство и вдохновение', description: 'Заметит новые возможности в твоих идеях и повседневных открытиях.' },
];
export const themes = [
  { id: 'light', name: 'Светлая', description: 'Лёгкость чистого листа' },
  { id: 'blue', name: 'Голубая', description: 'Немного больше воздуха' },
  { id: 'lavender', name: 'Лавандовая', description: 'Тихое время для себя' },
  { id: 'mint', name: 'Мятная', description: 'Свежий взгляд на привычное' },
  { id: 'dark', name: 'Тёмная', description: 'Спокойствие вечерних часов' },
] as const;
export type DemoTheme = typeof themes[number]['id'];
export type DemoTab = 'chat' | 'notes' | 'plans' | 'profile';
export type DemoMessage = { id: number; role: 'user' | 'assistant'; text: string };
export type DemoNote = { id: number; title: string; text: string; date: string };
export type DemoTask = { id: number; title: string; due: string; done: boolean };
export type Scenario = 'thought' | 'plans' | 'self' | null;
export function demoReply(text: string, scenario: Scenario): string {
  if (scenario === 'thought') return 'Эта мысль заслуживает места. Можно сохранить её в заметках и вернуться к ней, когда захочется. Что в ней для тебя самое важное?';
  if (scenario === 'plans' || /план|задач|успеть|работ|цел/i.test(text)) return 'Давай начнём с одного небольшого шага. Что можно сделать за 10 минут? Добавь этот шаг в «Планы» — не обязательно решать всё сразу.';
  if (scenario === 'self' || /устал|тревог|груст|чувств|пережив/i.test(text)) return 'Спасибо, что делишься. Можно немного замедлиться и назвать то, что чувствуешь. Что сейчас больше всего нуждается в твоём внимании?';
  return 'Я слышу тебя. Попробуй выделить одну мысль, к которой хочется вернуться. Что в сказанном сейчас кажется тебе самым важным?';
}
export function toggleDemoTask(tasks: DemoTask[], id: number) {
  return tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);
}