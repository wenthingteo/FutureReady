import React from "react";
import { Upload } from "lucide-react";

export default function UploadStep({ campaignData, setCampaignData }) {
  return (
    <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Creative Upload</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Upload your creative assets</p>
            <button className="bg-[#475ECD] text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Choose Files
            </button>
          </div>
        </div>
  );
}
