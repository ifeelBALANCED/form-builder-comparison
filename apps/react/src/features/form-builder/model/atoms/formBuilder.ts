import { Field } from '@/shared/types';
import { atom } from 'jotai';

export const builderTitleAtom = atom('');
export const builderDescriptionAtom = atom('');
export const formFieldsAtom = atom<Map<string, Field>>(new Map());
