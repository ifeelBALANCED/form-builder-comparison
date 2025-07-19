import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai/index';
import {
  builderDescriptionAtom,
  builderTitleAtom,
  formFieldsAtom,
} from '@/features/form-builder';
import { useCallback, useMemo } from 'react';

export function useFormRouter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [builderTitle] = useAtom(builderTitleAtom);
  const [builderDescription] = useAtom(builderDescriptionAtom);
  const [fields] = useAtom(formFieldsAtom);

  const isPreview = useMemo(() => pathname === '/preview', [pathname]);

  const goPreview = useCallback(() => {
    navigate('/preview');
  }, [navigate]);

  const goBuilder = useCallback(() => {
    navigate('/editor');
  }, [navigate]);

  const goSave = useCallback(() => {
    const schema = {
      title: builderTitle,
      description: builderDescription,
      fields,
    };

    const blob = new Blob([JSON.stringify(schema)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${builderTitle}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [builderDescription, builderTitle, fields]);

  return useMemo(
    () => ({ isPreview, goPreview, goBuilder, goSave }),
    [isPreview, goPreview, goBuilder, goSave],
  );
}
