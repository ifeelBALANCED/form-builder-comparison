import { Routes, Route } from 'react-router-dom';
import { FormBuilder } from '@/widgets/form-builder';
import { FormPreview } from '@/widgets/form-preview';
import { SuccessPage } from '@/pages';
import { Header } from '@/widgets/header';
import './styles.css';

export const Application = () => {
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
