
import { Download, RefreshCcw } from "lucide-react";
import html2canvas from "html2canvas";

const DashboardHeader = () => {
  // Refresh button function
  const handleRefresh = () => {
    window.location.reload();
  };

  // Download button function (screenshot of dashboard)
  const handleDownload = () => {
    const dashboard = document.getElementById("dashboard"); // wrap your dashboard content with this ID
    if (!dashboard) return;

    html2canvas(dashboard).then((canvas) => {
      const link = document.createElement("a");
      link.download = "dashboard.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-[#3264DF]">Dashboard</h1>

      <div className="flex items-center gap-3">
        {/* Dropdown with logo */}
        <select className="border rounded-lg px-3 py-2">
          <option>Facebook</option>
          <option>Instagram</option>
          <option>Twitter</option>
        </select>

        <select className="border rounded-lg px-3 py-2">
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>

        {/* Buttons with primary color */}
        <button
          onClick={handleDownload}
          className="p-2 bg-[#3264DF] text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-5 h-5" />
        </button>

        <button
          onClick={handleRefresh}
          className="p-2 bg-[#3264DF] text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>

        <span className="text-sm text-gray-500">Updated 5 minutes ago</span>
      </div>
    </div>
  );
};

export default DashboardHeader;

