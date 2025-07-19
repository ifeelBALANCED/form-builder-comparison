import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/' }),
  };
});

// Mock jotai
vi.mock('jotai', () => ({
  useAtom: () => [vi.fn(), vi.fn()],
}));

// Mock radix-ui components
vi.mock('@radix-ui/react-toolbar', () => ({
  Root: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock('@radix-ui/react-icons', () => ({
  ArrowLeftIcon: () => <span>ArrowLeft</span>,
  DownloadIcon: () => <span>Save</span>,
  EyeOpenIcon: () => <span>Eye</span>,
  FileTextIcon: () => <span>Form</span>,
}));

// Mock browser APIs
Object.defineProperty(window, 'URL', {
  value: {
    createObjectURL: vi.fn(() => 'mock-url'),
    revokeObjectURL: vi.fn(),
  },
  writable: true,
});

Object.defineProperty(document, 'createElement', {
  value: vi.fn(() => ({
    href: '',
    download: '',
    click: vi.fn(),
  })),
  writable: true,
}); 