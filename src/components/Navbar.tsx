'use client';
import { useState } from 'react';
import { ChevronDownIcon, LockIcon, MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleDropdown = (label: string) => setOpenDropdown(openDropdown === label ? null : label);

  return (
    
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/images/logo.png" alt="ZoomPDF" width={120} height={60} />         
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Dropdown label="PDF CONVERTER">
            <MenuCategory title="Convert from PDF" items={[
              'PDF to Word', 'PDF to PPTX', 'PDF to Excel', 'PDF to JPG', 'PDF to PNG']}
            />
            <MenuCategory title="Convert to PDF" items={[
              'Word to PDF', 'PPTX to PDF', 'Excel to PDF', 'JPG to PDF', 'PNG to PDF']}
            />
          </Dropdown>

          <Dropdown label="PDF EDITOR">
            <MenuCategory title="Editing Tools" items={['Edit PDF', 'Merge PDF', 'Split PDF', 'Compress PDF']} />
          </Dropdown>

          <Dropdown label="FORMS">
            <MenuCategory title="Form Tools" items={['Sign PDF', 'Fill PDF', 'Create Form']} />
          </Dropdown>
        </nav>

        {/* Desktop Log in */}
        <Link
          href="#"
          className="hidden md:flex text-blue-600 border border-blue-600 px-4 py-1.5 rounded-full text-sm items-center gap-2"
        >
          <LockIcon size={14} /> Log in
        </Link>

        {/* Mobile Toggle */}
        <button onClick={toggleMobile} className="md:hidden">
          {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-inner">
          <MobileMenuItem
            label="PDF EDITOR"
            items={['Edit PDF', 'Sign PDF', 'Add watermark', 'Rotate PDF', 'Merge PDF', 'Split PDF', 'Delete pages', 'Compress PDF', 'Crop PDF']}
            open={openDropdown === 'PDF EDITOR'}
            onToggle={() => toggleDropdown('PDF EDITOR')}
          />
          <MobileMenuItem
            label="PDF CONVERTER"
            items={['PDF to Word', 'Word to PDF']}
            open={openDropdown === 'PDF CONVERTER'}
            onToggle={() => toggleDropdown('PDF CONVERTER')}
          />
          <MobileMenuItem
            label="FORMS"
            items={['Sign PDF', 'Fill Form']}
            open={openDropdown === 'FORMS'}
            onToggle={() => toggleDropdown('FORMS')}
          />
          <hr className="my-4" />
          <Link href="#" className="block w-full text-center border border-blue-600 text-blue-600 py-2 rounded">LOG IN</Link>
        </div>
      )}
    </header>
  );
}

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 hover:text-blue-600">
        {label} <ChevronDownIcon size={14} />
      </button>
      {open && (
        <div className="absolute top-full mt-2 w-72 bg-white shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4">
          {children}
        </div>
      )}
    </div>
  );
}

function MenuCategory({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-semibold mb-2 text-gray-700">{title}</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function MobileMenuItem({ label, items, open, onToggle }: { label: string, items: string[], open: boolean, onToggle: () => void }) {
  return (
    <div className="mb-3">
      <button onClick={onToggle} className="flex justify-between items-center w-full text-left text-sm font-semibold text-gray-800">
        {label} <ChevronDownIcon className={`transform transition-transform ${open ? 'rotate-180' : ''}`} size={16} />
      </button>
      {open && (
        <ul className="mt-2 pl-4 space-y-1">
          {items.map((item) => (
            <li key={item} className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}