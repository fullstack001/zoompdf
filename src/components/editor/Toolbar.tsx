"use client";
import {
  LayoutGrid,
  Move,
  Undo2,
  Redo2,
  Type,
  TextCursor,
  Eraser,
  Highlighter,
  Pencil,
  Image,
  Circle,
  X,
  Check,
  PenLine,
  MessageSquare,
  Link,
  BookOpen,
  Layout,
  FileCog,
  // MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

const leftTools = [
  { label: "Thumbnails", icon: LayoutGrid, active: true },
  { label: "Move", icon: Move },
  { label: "Undo", icon: Undo2, disabled: true },
  { label: "Redo", icon: Redo2, disabled: true },
];

const centerTools = [
  { label: "Add Text", icon: Type },
  { label: "Edit Text", icon: TextCursor },
  { label: "Eraser", icon: Eraser },
  { label: "Highlight", icon: Highlighter },
  { label: "Pencil", icon: Pencil },
  { label: "Image", icon: Image },
  { label: "Ellipse", icon: Circle },
  { label: "Cross", icon: X },
  { label: "Check", icon: Check },
  { label: "Sign", icon: PenLine },
  { label: "Annotations", icon: MessageSquare },
  { label: "Links", icon: Link },
];

const moreTools = [
  { label: "OCR" },
  { label: "Page Number" },
  { label: "Crop" },
  { label: "Watermark" },
];

const rightTools = [
  { label: "Page layout", icon: Layout },
  { label: "Manage Page", icon: FileCog },
];

export default function Toolbar() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bg-white border-b px-6 py-2 flex items-center justify-between text-sm">
      {/* Left Group */}
      <div className="flex gap-2 items-center">
        {leftTools.map(({ label, icon: Icon, active, disabled }, i) => (
          <ToolButton
            key={i}
            label={label}
            Icon={Icon}
            active={active}
            disabled={disabled}
          />
        ))}
      </div>

      {/* Center Group */}
      <div className="flex gap-3 items-center">
        {centerTools.map(({ label, icon: Icon }, i) => (
          <ToolButton key={i} label={label} Icon={Icon} />
        ))}

        {/* More Tools Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded "
          >
            <div className="flex items-center justify-center ">
              <BookOpen size={16} />
            </div>
            More tools ▾
          </button>
          {showMore && (
            <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded text-sm w-40 z-10">
              {moreTools.map((tool, i) => (
                <div
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {tool.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Group */}
      <div className="flex gap-3 items-center">
        {rightTools.map(({ label, icon: Icon }, i) => (
          <ToolButton key={i} label={label} Icon={Icon} />
        ))}
      </div>
    </div>
  );
}

function ToolButton({
  label,
  Icon,
  active = false,
  disabled = false,
}: {
  label: string;
  Icon: React.ElementType; // Replace `any` with `React.ElementType`
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={` px-2 py-1 rounded text-xs whitespace-nowrap
        ${active ? "bg-red-100 text-red-600 font-semibold" : "text-gray-700"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:text-blue-600"}`}
    >
      <div className="flex items-center justify-center ">
        <Icon size={16} />
      </div>
      {label}
    </button>
  );
}
