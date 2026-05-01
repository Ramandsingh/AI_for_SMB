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
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </SectionsContext.Provider>
    </CompanyProvider>
  );
}
