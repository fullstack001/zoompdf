'use client';
import Topbar from '@/components/editor/Topbar';
import Toolbar from '@/components/editor/Toolbar';
import Sidebar from '@/components/editor/Sidebar';
import PDFViewer from '@/components/editor/PDFViewer';
import Footer from '@/components/Footer';

export default function EditorPage() {
  return (
    <div className=" flex flex-col">
      <Topbar />
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar /> */}
        <PDFViewer />        
      </div>
      <Footer />
    </div>
  );
}