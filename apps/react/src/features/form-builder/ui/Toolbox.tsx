import { Icon } from '@iconify/react';
import { useSetAtom } from 'jotai';
import { addFieldAtom } from '../model';

const FIELD_VARIANTS = [
  { type: 'text', icon: 'mdi:format-letter-case-upper', label: 'Text' },
  { type: 'textarea', icon: 'mdi:format-paragraph', label: 'Paragraph' },
  { type: 'select', icon: 'mdi:format-list-bulleted', label: 'Select' },
  { type: 'checkbox', icon: 'mdi:checkbox-marked-outline', label: 'Checkbox' },
] as const;

export const Toolbox = () => {
  const addField = useSetAtom(addFieldAtom);

  return (
    <div className="grid grid-cols-2 gap-4">
      {FIELD_VARIANTS.map((v) => (
        <button
          key={v.type}
          className="flex flex-col items-center justify-center gap-1 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          type="button"
          onClick={() => addField(v.type)}
        >
          <Icon icon={v.icon} className="w-6 h-6 text-gray-600" />
          <span className="text-sm text-gray-800">{v.label}</span>
        </button>
      ))}
    </div>
  );
};
