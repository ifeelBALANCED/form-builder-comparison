import './styles.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import FormBuilder from '../widgets/form-builder/FormBuilder';
import FormPreview from '../widgets/form-preview/FormPreview';
import SuccessPage from '../pages/SuccessPage';

import * as Toolbar from '@radix-ui/react-toolbar';
import {
  FileTextIcon as FormIcon,
  ArrowLeftIcon,
  DownloadIcon as SaveIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';

import { useMemo, useCallback } from 'react';

export function useFormRouter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isPreview = useMemo(() => pathname === '/preview', [pathname]);

  const goPreview = useCallback(() => {
    navigate('/preview');
  }, [navigate]);

  const goBuilder = useCallback(() => {
    navigate('/editor');
  }, [navigate]);

  const goSave = useCallback(() => {
    // TODO: ваша логіка збереження
    console.log('save form');
  }, []);

  return useMemo(
    () => ({ isPreview, goPreview, goBuilder, goSave }),
    [isPreview, goPreview, goBuilder, goSave],
  );
}

const Header = () => {
  const { isPreview, goPreview, goBuilder, goSave } = useFormRouter();

  return (
    <Toolbar.Root className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          <FormIcon className="w-6 h-6 text-primary" aria-hidden="true" />
          <h1 className="text-xl font-bold">Form Builder</h1>
        </div>

        <div className="flex items-center gap-3">
          {isPreview ? (
            <Toolbar.Button
              onClick={goBuilder}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <ArrowLeftIcon className="w-5 h-5" aria-hidden="true" />
              <span>Back to Editor</span>
            </Toolbar.Button>
          ) : (
            <>
              <Toolbar.Button
                onClick={goSave}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <SaveIcon className="w-5 h-5" aria-hidden="true" />
                <span>Save</span>
              </Toolbar.Button>
              <Toolbar.Button
                onClick={goPreview}
                className="inline-flex items-center gap-2 px-4 py-2 border border-primary rounded text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <EyeOpenIcon className="w-5 h-5" aria-hidden="true" />
                <span>Preview Form</span>
              </Toolbar.Button>
            </>
          )}
        </div>
      </div>
    </Toolbar.Root>
  );
};

export const App = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/editor" element={<FormBuilder />} />
          <Route path="/preview" element={<FormPreview />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
