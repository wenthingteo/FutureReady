// src/components/adsComponent/ReviewLaunch.jsx
import { AlertTriangle } from "lucide-react";

export default function ReviewLaunch({ campaignData, setCampaignData  }){
  return (
    <div className="space-y-6">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900">Review & Launch</h3>

      {/* AI Warning */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <span className="font-medium text-orange-800">AI Warning</span>
        </div>
        <p className="text-orange-700">
          Your targeting may be too broad. Consider narrowing the age range for
          better performance.
        </p>
      </div>

      {/* Campaign Summary */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Campaign Summary</h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Objective:</span>{" "}
            {campaignData?.objective || "Not selected"}
          </div>
          <div>
            <span className="font-medium">Platforms:</span>{" "}
            {campaignData?.platforms?.length
              ? campaignData.platforms.join(", ")
              : "None selected"}
          </div>
          <div>
            <span className="font-medium">Budget:</span>{" "}
            {campaignData?.budget
              ? `$${campaignData.budget}/day`
              : "No budget set"}
          </div>
          <div>
            <span className="font-medium">Format:</span>{" "}
            {campaignData?.adFormat || "Not chosen"}
          </div>
        </div>
      </div>
    </div>
  );
};
