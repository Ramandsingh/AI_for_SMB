import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { useSections } from '../App';

export default function Layout({ children }) {
  const { sections } = useSections();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left sidebar — page navigation */}
      <LeftSidebar />

      {/* Main content area */}
      <main className="flex-1 ml-64 mr-60 min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-10">
          {children}
        </div>
      </main>

      {/* Right sidebar — section TOC */}
      <RightSidebar sections={sections} />
    </div>
  );
}
