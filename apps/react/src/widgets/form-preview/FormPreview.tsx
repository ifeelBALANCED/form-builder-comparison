import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Icon } from '@iconify/react';
import {
  builderDescriptionAtom,
  builderTitleAtom,
  formFieldsAtom,
} from '@/features/form-builder';

export const FormPreview = () => {
  const navigate = useNavigate();

  const formFieldsMap = useAtomValue(formFieldsAtom);
  const builderTitle = useAtomValue(builderTitleAtom);
  const builderDescription = useAtomValue(builderDescriptionAtom);

  const fieldsArray = Array.from(formFieldsMap.values());
  const [data, setData] = useState<Record<string, string | string[]>>({});

  useEffect(() => {
    const newData = { ...data };
    let hasChanges = false;

    fieldsArray.forEach((f) => {
      if (!(f.id in newData)) {
        newData[f.id] = f.type === 'checkbox' ? [] : '';
        hasChanges = true;
      }
    });

    Object.keys(newData).forEach((k) => {
      if (!fieldsArray.some((f) => f.id === k)) {
        delete newData[k];
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setData(newData);
    }
  }, [fieldsArray, data]);

  const isFormValid = fieldsArray.every((f) => {
    if (!f.required) return true;
    const val = data[f.id];
    return f.type === 'checkbox'
      ? (val as string[]).length > 0
      : !!(val as string)?.trim();
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    navigate({
      pathname: '/success',
      search: new URLSearchParams(data as Record<string, string>).toString(),
    });
  };

  const onCheckboxChange = (
    fieldId: string,
    label: string,
    checked: boolean,
  ) => {
    setData((prev) => {
      const arr = [...((prev[fieldId] as string[]) || [])];
      const idx = arr.indexOf(label);
      if (checked && idx === -1) arr.push(label);
      if (!checked && idx > -1) arr.splice(idx, 1);
      return { ...prev, [fieldId]: arr };
    });
  };

  const handleTextChange = (fieldId: string, value: string) => {
    setData((prev) => ({ ...prev, [fieldId]: value }));
  };

  if (!fieldsArray.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <Icon icon="mdi:alert-circle-outline" className="w-12 h-12 mb-4" />
        <p>No form fields available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="px-6 py-4 bg-gray-50 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">
          {builderTitle || 'Untitled Form'}
        </h1>
        {builderDescription && (
          <p className="mt-2 text-gray-600">{builderDescription}</p>
        )}
      </header>

      <form className="space-y-6" onSubmit={onSubmit}>
        {fieldsArray.map((field) => (
          <div key={field.id} className="mb-6">
            <label htmlFor={field.id} className="block mb-2 font-medium">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === 'text' && (
              <input
                id={field.id}
                value={(data[field.id] as string) || ''}
                onChange={(e) => handleTextChange(field.id, e.target.value)}
                type="text"
                placeholder={field.placeholder}
                aria-invalid={
                  field.required && !(data[field.id] as string)?.trim()
                }
                className="w-full border rounded px-3 py-2 focus:ring-primary"
              />
            )}

            {field.type === 'textarea' && (
              <textarea
                id={field.id}
                value={(data[field.id] as string) || ''}
                onChange={(e) => handleTextChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                aria-invalid={
                  field.required && !(data[field.id] as string)?.trim()
                }
                className="w-full border rounded px-3 py-2 focus:ring-primary"
              />
            )}

            {field.type === 'select' && (
              <select
                id={field.id}
                value={(data[field.id] as string) || ''}
                onChange={(e) => handleTextChange(field.id, e.target.value)}
                aria-invalid={field.required && !(data[field.id] as string)}
                className="w-full border rounded px-3 py-2 focus:ring-primary"
              >
                <option disabled value="">
                  Select an option
                </option>
                {field.options?.map((opt) => (
                  <option key={opt.id} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'checkbox' && (
              <div className="flex flex-wrap gap-4">
                {field.options?.map((opt) => {
                  const isChecked = (
                    (data[field.id] as string[]) || []
                  ).includes(opt.label);
                  return (
                    <div key={opt.id} className="flex items-center">
                      <Checkbox.Root
                        id={`${field.id}-${opt.id}`}
                        value={opt.label}
                        checked={isChecked}
                        className="w-4 h-4 border rounded focus:ring-primary"
                        onCheckedChange={(checked) =>
                          onCheckboxChange(field.id, opt.label, !!checked)
                        }
                      >
                        <Checkbox.Indicator>
                          <CheckIcon className="w-3 h-3 text-primary" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label
                        htmlFor={`${field.id}-${opt.id}`}
                        className="ml-2 text-sm"
                      >
                        {opt.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={!isFormValid}
          className="mt-6 px-6 py-3 border rounded-full text-primary border-primary hover:bg-primary/10 disabled:opacity-50"
        >
          <Icon icon="mdi:check" className="w-5 h-5 inline-block mr-2" />
          Submit
        </button>
      </form>
    </div>
  );
};
