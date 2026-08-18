import ProjectEditor from '../components/ProjectEditor';

export const metadata = {
  title: 'Add New Project',
};

export default function NewProjectPage() {
  return (
    <div className="p-6">
      <ProjectEditor />
    </div>
  );
}
