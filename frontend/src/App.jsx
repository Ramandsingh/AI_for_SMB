import { createContext, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CompanyProvider } from './context/CompanyContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import UnderstandingAI from './pages/UnderstandingAI';
import MaturityJourney from './pages/MaturityJourney';
import RoleImpactMap from './pages/RoleImpactMap';
import Assessment from './pages/Assessment';
import Roadmap from './pages/Roadmap';
import ROICalculator from './pages/ROICalculator';
import Technology from './pages/Technology';
import SalesNarrative from './pages/SalesNarrative';
import LearningApproach from './pages/LearningApproach';
import IndividualAdoption from './pages/IndividualAdoption';
import OrgContributions from './pages/OrgContributions';
import Admin from './pages/Admin';
import EnterpriseWhatAI    from './pages/EnterpriseWhatAI';
import EnterpriseValue      from './pages/EnterpriseValue';
import EnterpriseHowAdopt   from './pages/EnterpriseHowAdopt';
import EnterpriseWhen       from './pages/EnterpriseWhen';
import EnterpriseMeasure    from './pages/EnterpriseMeasure';
import TechWhatIsAI         from './pages/TechWhatIsAI';
import TechCategories       from './pages/TechCategories';
import TechHowWork          from './pages/TechHowWork';
import TechDeployment       from './pages/TechDeployment';
import TechIntegrations     from './pages/TechIntegrations';
import TechGlossary         from './pages/TechGlossary';
import EntDevDataInfra      from './pages/EntDevDataInfra';
import EntDevAIFactory      from './pages/EntDevAIFactory';
import EntDevFoundationRAG  from './pages/EntDevFoundationRAG';
import EntDevAIPlatforms    from './pages/EntDevAIPlatforms';
import EntDevGovernance     from './pages/EntDevGovernance';
import EntDevTeam           from './pages/EntDevTeam';
import ConsultBCG           from './pages/ConsultBCG';
import ConsultMcKinsey      from './pages/ConsultMcKinsey';
import ConsultBain          from './pages/ConsultBain';
import ConsultDeloitte      from './pages/ConsultDeloitte';
import AIFitPlanner         from './pages/AIFitPlanner';
import MaturityCanvas       from './pages/MaturityCanvas';
import LabHome              from './pages/lab/LabHome';
import LabUppy              from './pages/lab/LabUppy';
import LabGraph             from './pages/lab/LabGraph';
import LabChat              from './pages/lab/LabChat';
import LabArch              from './pages/lab/LabArch';
import LabTimeline          from './pages/lab/LabTimeline';
import LabCharts            from './pages/lab/LabCharts';
import LabCalendar          from './pages/lab/LabCalendar';

export const SectionsContext = createContext({ sections: [], setSections: () => {} });
export const useSections = () => useContext(SectionsContext);

export default function App() {
  const [sections, setSections] = useState([]);

  return (
    <CompanyProvider>
      <SectionsContext.Provider value={{ sections, setSections }}>
        <Layout>
          <Routes>
            <Route path="/"      element={<Landing />} />
            <Route path="/p1"    element={<UnderstandingAI />} />
            <Route path="/p2"    element={<MaturityJourney />} />
            <Route path="/p3"    element={<RoleImpactMap />} />
            <Route path="/p4"    element={<Assessment />} />
            <Route path="/p5"    element={<Roadmap />} />
            <Route path="/p6"    element={<ROICalculator />} />
            <Route path="/p7"    element={<Technology />} />
            <Route path="/p8"    element={<SalesNarrative />} />
            <Route path="/p9"    element={<LearningApproach />} />
            <Route path="/p10"   element={<IndividualAdoption />} />
            <Route path="/p11"   element={<OrgContributions />} />
            <Route path="/p12"   element={<EnterpriseWhatAI />} />
            <Route path="/p13"   element={<EnterpriseValue />} />
            <Route path="/p14"   element={<EnterpriseHowAdopt />} />
            <Route path="/p15"   element={<EnterpriseWhen />} />
            <Route path="/p16"   element={<EnterpriseMeasure />} />
            <Route path="/p17"   element={<TechWhatIsAI />} />
            <Route path="/p18"   element={<TechCategories />} />
            <Route path="/p19"   element={<TechHowWork />} />
            <Route path="/p20"   element={<TechDeployment />} />
            <Route path="/p21"   element={<TechIntegrations />} />
            <Route path="/p22"   element={<TechGlossary />} />
            <Route path="/p23"   element={<EntDevDataInfra />} />
            <Route path="/p24"   element={<EntDevAIFactory />} />
            <Route path="/p25"   element={<EntDevFoundationRAG />} />
            <Route path="/p26"   element={<EntDevAIPlatforms />} />
            <Route path="/p27"   element={<EntDevGovernance />} />
            <Route path="/p28"   element={<EntDevTeam />} />
            <Route path="/p29"   element={<ConsultBCG />} />
            <Route path="/p30"   element={<ConsultMcKinsey />} />
            <Route path="/p31"   element={<ConsultBain />} />
            <Route path="/p32"   element={<ConsultDeloitte />} />
            <Route path="/p33"   element={<AIFitPlanner />} />
            <Route path="/p34"         element={<MaturityCanvas />} />
            <Route path="/admin"       element={<Admin />} />
            <Route path="/lab"         element={<LabHome />} />
            <Route path="/lab/upload"  element={<LabUppy />} />
            <Route path="/lab/graph"   element={<LabGraph />} />
            <Route path="/lab/chat"    element={<LabChat />} />
            <Route path="/lab/arch"    element={<LabArch />} />
            <Route path="/lab/timeline" element={<LabTimeline />} />
            <Route path="/lab/charts"  element={<LabCharts />} />
            <Route path="/lab/calendar" element={<LabCalendar />} />
          </Routes>
        </Layout>
      </SectionsContext.Provider>
    </CompanyProvider>
  );
}
