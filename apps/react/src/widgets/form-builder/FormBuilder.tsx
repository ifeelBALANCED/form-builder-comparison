import { useAtom } from 'jotai';
import {
  builderDescriptionAtom,
  builderTitleAtom,
  FieldList,
  Toolbox,
} from '@/features/form-builder';

export const FormBuilder = () => {
  const [builderTitle, setBuilderTitle] = useAtom(builderTitleAtom);
  const [builderDescription, setBuilderDescription] = useAtom(
    builderDescriptionAtom,
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      <aside aria-label="Add Form Elements">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Add Form Elements</h2>
          <Toolbox />
        </div>
      </aside>

      <section className="col-span-2">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-purple-50 p-6">
            <input
              value={builderTitle}
              onChange={(e) => setBuilderTitle(e.target.value)}
              placeholder="Untitled Form"
              className="w-full bg-transparent text-xl font-bold focus:outline-none focus:placeholder-gray-400"
            />
            <input
              value={builderDescription}
              onChange={(e) => setBuilderDescription(e.target.value)}
              placeholder="Form description"
              className="w-full mt-1 bg-transparent text-gray-600 focus:outline-none focus:placeholder-gray-400"
            />
          </div>

          <div className="p-6 min-h-[200px]">
            <FieldList />
          </div>
        </div>
      </section>
    </div>
  );
};
