
// export default Dashboard
import DashboardHeader from "../components/dashboardComponent/DashboardHeader";
import MetricCards from "../components/dashboardComponent/MetricCards";
import ChartsSection from "../components/dashboardComponent/ChartsSection";
import AIInsights from "../components/dashboardComponent/AIInsights";
import ROIForecasting from "../components/dashboardComponent/ROIForecasting";
import AIContentSection from "../components/dashboardComponent/AIContentSection";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />

      {/* Only the main content is wrapped for screenshot */}
      <div id="dashboard">
        <MetricCards />
        <ChartsSection />
        <AIInsights />
        <ROIForecasting />
        <AIContentSection />
      </div>
    </div>
  );
};

export default Dashboard;


