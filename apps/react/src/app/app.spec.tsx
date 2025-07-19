import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Application } from './app';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Application', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Application />);
    // Basic smoke test - if it renders without error, we're good
    expect(document.body).toBeInTheDocument();
  });

  it('contains form builder title', () => {
    renderWithRouter(<Application />);
    expect(screen.getByText('Form Builder')).toBeInTheDocument();
  });

  it('has proper container structure', () => {
    renderWithRouter(<Application />);
    const container = screen.getByText('Form Builder').closest('.container');
    expect(container).toHaveClass('container', 'mx-auto', 'py-8', 'px-4');
  });
});
