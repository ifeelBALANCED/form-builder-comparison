import { useLocation, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const SuccessPage = () => {
  const location = useLocation();
  const queryParams = Object.fromEntries(new URLSearchParams(location.search));

  return (
    <div className="flex flex-col items-center py-20 text-center">
      <Icon
        icon="mdi:check-circle-outline"
        className="w-16 h-16 text-green-500 mb-4"
        aria-hidden="true"
      />
      <h2 className="text-2xl font-bold mb-2">Form submitted successfully!</h2>
      <p className="text-gray-600 mb-6">Thank you for your submission.</p>

      <pre className="bg-gray-100 text-sm p-4 rounded w-full max-w-md text-left overflow-auto">
        {JSON.stringify(queryParams, null, 2)}
      </pre>

      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 border border-purple-400 text-purple-600 rounded hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-200"
        >
          <Icon icon="mdi:arrow-left" className="w-5 h-5" />
          Back to Form Builder
        </Link>
      </div>
    </div>
  );
};
