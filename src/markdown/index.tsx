import { Element } from './Element';
import { Button } from './Button';
import { withMarkdown } from './plugin';

export const markdownElement = {
  name: 'markdown',
  Button,
  Element,
  plugins: [
    withMarkdown
  ]
};