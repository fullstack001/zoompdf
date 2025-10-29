import React from "react";
import { ArrowRightSquare, SquarePen, SlidersHorizontal } from "lucide-react";
import { Dropdown } from "./Dropdown";
import { MenuCategory } from "./MenuCategory";
import type { NavbarProps } from "./types";

/**
 * Desktop navigation component with dropdown menus
 */
export const DesktopNavigation: React.FC<NavbarProps> = ({ t, navigate }) => {
  return (
    <nav className="hidden xl:flex gap-6 text-sm font-medium">
      <Dropdown
        label={t("navigation.pdfConverter")}
        icon={<ArrowRightSquare size={24} className="mr-2" />}
      >
        <MenuCategory
          title={t("navbar.convertFromPdf")}
          items={[
            { label: t("tools.pdfToWord"), route: "/pdf-to-word" },
            { label: t("tools.pdfToPptx"), route: "/pdf-to-pptx" },
            { label: t("tools.pdfToExcel"), route: "/pdf-to-excel" },
            { label: t("tools.pdfToJpg"), route: "/pdf-to-jpg" },
            { label: t("tools.pdfToPng"), route: "/pdf-to-png" },
          ]}
          onNavigate={navigate}
        />
        <MenuCategory
          title={t("navbar.convertToPdf")}
          items={[
            { label: t("tools.wordToPdf"), route: "/word-to-pdf" },
            { label: t("tools.pptxToPdf"), route: "/pptx-to-pdf" },
            { label: t("tools.excelToPdf"), route: "/excel-to-pdf" },
            { label: t("tools.jpgToPdf"), route: "/jpg-to-pdf" },
            { label: t("tools.pngToPdf"), route: "/png-to-pdf" },
          ]}
          onNavigate={navigate}
        />
      </Dropdown>

      <Dropdown
        label={t("navigation.pdfEditor")}
        icon={<SquarePen size={24} className="mr-2" />}
      >
        <MenuCategory
          title={t("navbar.editingTools")}
          items={[
            { label: t("tools.editPdf"), route: "/edit-pdf" },
            { label: t("tools.mergePdf"), route: "/merge-pdf" },
            { label: t("tools.splitPdf"), route: "/split-pdf" },
            { label: t("tools.compressPdf"), route: "/compress-pdf" },
          ]}
          onNavigate={navigate}
        />
      </Dropdown>
    </nav>
  );
};
