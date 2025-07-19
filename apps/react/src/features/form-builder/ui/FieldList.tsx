import { useAtom, useSetAtom } from 'jotai';
import {
  clearAllFieldsAtom,
  updateFieldAtom,
  removeFieldAtom,
  moveFieldAtom,
  duplicateFieldAtom,
  formFieldsAtom,
} from '../model';
import * as Checkbox from '@radix-ui/react-checkbox';
import {
  CheckIcon,
  TrashIcon,
  PlusIcon,
  Cross2Icon,
  ChevronUpIcon,
  ChevronDownIcon,
  CopyIcon,
  TrashIcon as DeleteIcon,
} from '@radix-ui/react-icons';
import type { Field } from '@/shared/types';
import { uniqueId } from '@/shared/lib/unique-id';

export const FieldList = () => {
  const [formFields] = useAtom(formFieldsAtom);
  const updateField = useSetAtom(updateFieldAtom);
  const clearAll = useSetAtom(clearAllFieldsAtom);
  const removeField = useSetAtom(removeFieldAtom);
  const moveField = useSetAtom(moveFieldAtom);
  const duplicateField = useSetAtom(duplicateFieldAtom);

  const fieldsArray = Array.from(formFields.values());

  const onUpdate = (field: Field) => {
    updateField({ ...field });
  };

  const addOpt = (field: Field) => {
    if (field.options) {
      field.options.push({ id: uniqueId(), label: 'New Option' });
      onUpdate(field);
    }
  };

  const removeOption = (field: Field, optId: string) => {
    if (field.options) {
      field.options = field.options.filter((o) => o.id !== optId);
      onUpdate(field);
    }
  };

  if (!fieldsArray.length) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No form fields added yet. Use the panel on the left to add form
        elements.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 border border-red-400 text-red-600 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
          onClick={clearAll}
        >
          <DeleteIcon className="w-5 h-5" />
          Clear All Fields
        </button>
      </div>

      {fieldsArray.map((field, idx) => (
        <div
          key={field.id}
          className="bg-white border border-gray-100 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-4 space-x-2">
            <input
              value={field.label}
              type="text"
              placeholder="Field label"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-primary"
              onChange={(e) => {
                field.label = e.target.value;
                onUpdate(field);
              }}
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={idx === 0}
                className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                onClick={() =>
                  moveField({
                    fromId: field.id,
                    toId: fieldsArray[idx - 1]?.id,
                  })
                }
              >
                <ChevronUpIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                disabled={idx === fieldsArray.length - 1}
                className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                onClick={() =>
                  moveField({
                    fromId: field.id,
                    toId: fieldsArray[idx + 1]?.id,
                  })
                }
              >
                <ChevronDownIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => duplicateField(field.id)}
              >
                <CopyIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                onClick={() => removeField(field.id)}
              >
                <TrashIcon className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>

          {(field.type === 'text' || field.type === 'textarea') && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Placeholder
              </label>
              {field.type === 'text' ? (
                <input
                  value={field.placeholder || ''}
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-primary"
                  onChange={(e) => {
                    field.placeholder = e.target.value;
                    onUpdate(field);
                  }}
                />
              ) : (
                <textarea
                  value={field.placeholder || ''}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-primary"
                  onChange={(e) => {
                    field.placeholder = e.target.value;
                    onUpdate(field);
                  }}
                />
              )}
            </div>
          )}

          {(field.type === 'select' || field.type === 'checkbox') && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Options</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {field.options?.map((opt) => (
                  <div key={opt.id} className="flex items-center">
                    <input
                      value={opt.label}
                      type="text"
                      className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-primary mr-2"
                      onChange={(e) => {
                        opt.label = e.target.value;
                        onUpdate(field);
                      }}
                    />
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                      onClick={() => removeOption(field, opt.id)}
                    >
                      <Cross2Icon className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => addOpt(field)}
              >
                <PlusIcon className="w-4 h-4" />
                Add Option
              </button>
            </div>
          )}

          <div className="mt-4 flex items-center">
            <Checkbox.Root
              id={`required-${field.id}`}
              checked={field.required}
              className="w-4 h-4 border border-gray-300 rounded focus:ring-1 focus:ring-primary"
              onCheckedChange={(checked) => {
                field.required = !!checked;
                onUpdate(field);
              }}
            >
              <Checkbox.Indicator>
                <CheckIcon className="w-3 h-3 text-primary" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              htmlFor={`required-${field.id}`}
              className="ml-2 text-sm select-none"
            >
              Required field
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
