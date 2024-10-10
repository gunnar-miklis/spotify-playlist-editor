import type { ElementType, ReactNode } from 'react';

import type { DynamicHeadingType } from '@/src/types';

type Props = Pick<DynamicHeadingType, 'level'> & { children: ReactNode };

export default function DynamicHeading({ children, level }: Props) {
  const Heading = createHeadingElement(level);
  return <Heading className={`h${level}`}>{children}</Heading>;
}

function createHeadingElement(level: number) {
  if (level > 0 && level <= 6) {
    return `h${level}` as ElementType;
  } else {
    throw new Error('Heading Level must be between 1-6');
  }
}
