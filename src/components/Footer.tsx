'use client';

const footerLinks = [
  {
    title: 'Edit PDF',
    links: ['Edit PDF', 'Sign PDF', 'Delete Pages', 'Merge PDF', 'Merge Images']
  },
  {
    title: 'Convert from PDF',
    links: ['Edit PDF', 'Sign PDF', 'Delete Pages', 'Merge PDF', 'Merge Images']
  },
  {
    title: 'Convert to PDF',
    links: ['Edit PDF', 'Sign PDF', 'Delete Pages', 'Merge PDF', 'Merge Images']
  },
  {
    title: 'Forms',
    links: ['Edit PDF', 'Sign PDF', 'Delete Pages', 'Merge PDF', 'Merge Images']
  }
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 px-4 pt-16 pb-6 text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-left mb-10">
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-3 text-gray-700">{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((link, j) => (
                  <li key={j} className="text-gray-600 hover:text-blue-600 cursor-pointer">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-t border-blue-100 mb-4" />

        <div className="text-center text-gray-500">
          <div className="space-x-4 mb-2">
            <a href="#" className="hover:underline">Disclaimer</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
          <div>&copy; 2025 PDFDEN All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}