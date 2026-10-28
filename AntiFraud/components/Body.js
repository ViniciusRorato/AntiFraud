import ThreatAnalysis from './home/ThreatAnalysis';
import HowItWorks from './home/HowItWorks';
import OdsSummary from './home/OdsSummary';
import Plans from './home/Plans';
import ReportScam from './home/ReportScam';

export default function Body() {
  return (
    <main>
      <ThreatAnalysis />
      <HowItWorks />
      <OdsSummary />
      <Plans />
      <ReportScam />
    </main>
  );
}
