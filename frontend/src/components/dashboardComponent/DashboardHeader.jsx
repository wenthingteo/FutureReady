"use client";

import { Download, RefreshCcw, ChevronDown } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const DashboardHeader = () => {
  // Refresh button function
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDownload = async () => {
    console.log("[v0] Starting PDF download...");
    const dashboard = document.getElementById("dashboard");
    if (!dashboard) {
      console.log("[v0] Dashboard element not found");
      return;
    }

    try {
      // Wait for any pending renders
      await new Promise((resolve) => setTimeout(resolve, 500));

      const options = {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
        filter: (node) => {
          // Filter out script tags and other non-visual elements
          return node.tagName !== "SCRIPT";
        },
      };

      console.log("[v0] Generating PDF...");
      const dataUrl = await toPng(dashboard, options);

      // Create PDF with proper sizing
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Get image dimensions
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const imgAspectRatio = img.width / img.height;
      const pageAspectRatio = pageWidth / pageHeight;

      let finalWidth, finalHeight, xOffset, yOffset;

      if (imgAspectRatio > pageAspectRatio) {
        // Image is wider than page ratio
        finalWidth = pageWidth - 20; // 10mm margin on each side
        finalHeight = finalWidth / imgAspectRatio;
        xOffset = 10;
        yOffset = (pageHeight - finalHeight) / 2;
      } else {
        // Image is taller than page ratio
        finalHeight = pageHeight - 20; // 10mm margin on top/bottom
        finalWidth = finalHeight * imgAspectRatio;
        xOffset = (pageWidth - finalWidth) / 2;
        yOffset = 10;
      }

      pdf.addImage(dataUrl, "JPEG", xOffset, yOffset, finalWidth, finalHeight, undefined, "FAST");
      pdf.save(`dashboard-${new Date().toISOString().split("T")[0]}.pdf`);
      console.log("[v0] PDF downloaded successfully");
    } catch (error) {
      console.error("[v0] Download failed:", error);
      alert("Download failed. Please try again or refresh the page.");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-[#475ECD]">Dashboard</h1>

      <div className="flex items-center gap-3">
        <div className="relative">
          <select className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option>Social Media</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>Twitter</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option>January 2025</option>
            <option>February 2025</option>
            <option>March 2025</option>
            <option>April 2025</option>
            <option>May 2025</option>
            <option>June 2025</option>
            <option>July 2025</option>
            <option>August 2025</option>
            <option>September 2025</option>
            <option>October 2025</option>
            <option>November 2025</option>
            <option>December 2025</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <button
          onClick={handleDownload}
          className="p-2 bg-[#475ECD] text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <Download className="w-5 h-5" />
        </button>

        <button
          onClick={handleRefresh}
          className="p-2 bg-[#475ECD] text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>

        <span className="text-sm text-gray-500"> Updated 5 minutes ago</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
