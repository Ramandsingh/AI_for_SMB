import { createContext, useContext, useState, lazy, Suspense } from 'react';
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
import LessonsLearned from './pages/LessonsLearned';
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
import AILabsOpenAI         from './pages/AILabsOpenAI';
import AILabsAnthropic      from './pages/AILabsAnthropic';
import AILabsGoogle         from './pages/AILabsGoogle';
import AILabsChinese        from './pages/AILabsChinese';
import AIConceptsLLM        from './pages/AIConceptsLLM';
import AIConceptsRAG        from './pages/AIConceptsRAG';
import AIConceptsAgents     from './pages/AIConceptsAgents';
import LearnHome            from './pages/LearnHome';
import LearnQ1              from './pages/LearnQ1';
import LearnQ2              from './pages/LearnQ2';
import LearnQ3              from './pages/LearnQ3';
import LearnQ4              from './pages/LearnQ4';
import LearnPythonSyntax    from './pages/learn/LearnPythonSyntax';
import BizHome              from './pages/biz/BizHome';
import BizQ1                from './pages/biz/BizQ1';
import BizQ2                from './pages/biz/BizQ2';
import BizQ3                from './pages/biz/BizQ3';
import BizQ4                from './pages/biz/BizQ4';
import BizIndustries        from './pages/biz/BizIndustries';
import BizUseCases          from './pages/biz/BizUseCases';
import MaturityCanvas       from './pages/MaturityCanvas';
import Planning             from './pages/Planning';
import LabHome              from './pages/lab/LabHome';
import LabUppy              from './pages/lab/LabUppy';
import LabGraph             from './pages/lab/LabGraph';
import LabChat              from './pages/lab/LabChat';
import LabArch              from './pages/lab/LabArch';
import LabTimeline          from './pages/lab/LabTimeline';
import LabCharts            from './pages/lab/LabCharts';
import LabCalendar          from './pages/lab/LabCalendar';
import LabDatabase          from './pages/lab/LabDatabase';
import LabCytoscape         from './pages/lab/LabCytoscape';
import LabFlowcharts        from './pages/lab/LabFlowcharts';
import LabPDF               from './pages/lab/LabPDF';
const LabExcalidraw = lazy(() => import('./pages/lab/LabExcalidraw'));

export const SectionsContext = createContext({ sections: [], setSections: () => {} });
export const useSections = () => useContext(SectionsContext);

export default function App() {
  const [sections, setSections] = useState([]);

  return (
    <CompanyProvider>
      <SectionsContext.Provider value={{ sections, setSections }}>
        <Layout>
          <Routes>
            <Route path="/"          element={<Landing />} />
            <Route path="/planning"  element={<Planning />} />
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
            <Route path="/p35"   element={<AILabsOpenAI />} />
            <Route path="/p36"   element={<AILabsAnthropic />} />
            <Route path="/p37"   element={<AILabsGoogle />} />
            <Route path="/p38"   element={<AILabsChinese />} />
            <Route path="/p39"   element={<AIConceptsLLM />} />
            <Route path="/p40"   element={<AIConceptsRAG />} />
            <Route path="/p41"   element={<AIConceptsAgents />} />
            <Route path="/learn"    element={<LearnHome />} />
            <Route path="/learn/q1" element={<LearnQ1 />} />
            <Route path="/learn/q2" element={<LearnQ2 />} />
            <Route path="/learn/q3" element={<LearnQ3 />} />
            <Route path="/learn/q4" element={<LearnQ4 />} />
            <Route path="/learn/q1/python-syntax" element={<LearnPythonSyntax />} />
            <Route path="/p34"         element={<MaturityCanvas />} />
            <Route path="/admin"         element={<Admin />} />
            <Route path="/admin/lessons" element={<LessonsLearned />} />
            <Route path="/lab"         element={<LabHome />} />
            <Route path="/lab/upload"  element={<LabUppy />} />
            <Route path="/lab/graph"   element={<LabGraph />} />
            <Route path="/lab/chat"    element={<LabChat />} />
            <Route path="/lab/arch"    element={<LabArch />} />
            <Route path="/lab/timeline" element={<LabTimeline />} />
            <Route path="/lab/charts"  element={<LabCharts />} />
            <Route path="/lab/calendar"  element={<LabCalendar />} />
            <Route path="/lab/database"   element={<LabDatabase />} />
            <Route path="/lab/cytoscape"  element={<LabCytoscape />} />
            <Route path="/lab/flowcharts" element={<LabFlowcharts />} />
            <Route path="/lab/pdf"        element={<LabPDF />} />
            <Route path="/lab/excalidraw" element={<Suspense fallback={null}><LabExcalidraw /></Suspense>} />
            <Route path="/biz"            element={<BizHome />} />
            <Route path="/biz/q1"         element={<BizQ1 />} />
            <Route path="/biz/q2"         element={<BizQ2 />} />
            <Route path="/biz/q3"         element={<BizQ3 />} />
            <Route path="/biz/q4"         element={<BizQ4 />} />
            <Route path="/biz/industries" element={<BizIndustries />} />
            <Route path="/biz/usecases"   element={<BizUseCases />} />
          </Routes>
        </Layout>
      </SectionsContext.Provider>
    </CompanyProvider>
  );
}
