import { createFileRoute } from '@tanstack/react-router';
import { DemoWorkspace } from '@/components/demo/demo-workspace';

export const Route = createFileRoute('/demo')({
  head: () => ({ meta: [
    { title: 'Рядом — интерактивная демоверсия приложения' },
    { name: 'description', content: 'Выбери спутника и тему, попробуй демонстрационный чат, заметки и личные планы в приложении Рядом.' },
    { property: 'og:title', content: 'Познакомься с Рядом — демоверсия приложения' },
    { property: 'og:description', content: 'Интерактивное знакомство с персональным AI-компаньоном: чат, заметки, планы и пять тем оформления.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: DemoWorkspace,
});