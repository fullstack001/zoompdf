export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-sm text-gray-300">
      © {currentYear} PDFezy All rights reserved.
    </div>
  );
}
