import { getExperience } from '@/lib/data';
import ExperienceClient from './ExperienceClient';

export default async function AdminExperiencePage() {
  const experience = await getExperience();

  return (
    <ExperienceClient experience={experience} />
  );
}
