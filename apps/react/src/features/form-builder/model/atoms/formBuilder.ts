import { atom } from 'jotai';
import type { Field } from '../../../../shared/types';

export const builderTitleAtom = atom('');
export const builderDescriptionAtom = atom('');
export const formFieldsAtom = atom<Map<string, Field>>(new Map());
