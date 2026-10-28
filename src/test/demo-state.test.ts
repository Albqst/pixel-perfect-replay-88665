import { describe, expect, it } from 'vitest';
import { characters, themes, demoReply, toggleDemoTask } from '@/lib/demo-state';

describe('public demo behavior', () => {
  it('includes all ten supplied companions on the first stage', () => {
    expect(characters.slice(0, 10).map(character => character.name)).toEqual(['Вспышка', 'Глубина', 'Кубик', 'Лея', 'Проводник', 'Пуша', 'Скай', 'Спокойствие', 'Страж', 'Тихон']);
    expect(new Set(characters.slice(0, 10).map(character => character.image)).size).toBe(10);
  });
  it('offers all five requested themes', () => {
    expect(themes.map(t => t.id)).toEqual(['light', 'blue', 'lavender', 'mint', 'dark']);
  });
  it('provides a contextual scripted planning reply without an API', () => {
    expect(demoReply('Хочу разобрать планы', null)).toContain('10 минут');
    expect(demoReply('Моя мысль', 'thought')).not.toEqual(demoReply('Моя мысль', 'plans'));
  });
  it('toggles only the selected plan without deleting tasks', () => {
    const tasks = [{ id: 1, title: 'Прогулка', due: 'Сегодня', done: false }, { id: 2, title: 'Чтение', due: 'Завтра', done: false }];
    const result = toggleDemoTask(tasks, 1);
    expect(result).toEqual([{ ...tasks[0], done: true }, tasks[1]]);
    expect(toggleDemoTask(result, 1)).toEqual(tasks);
  });
});