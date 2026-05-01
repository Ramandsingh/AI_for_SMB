import { createContext, useContext, useState, useEffect } from 'react';

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [activeCompany, setActiveCompany] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('activeCompany');
    if (saved) {
      try { setActiveCompany(JSON.parse(saved)); } catch {}
    }
  }, []);

  function selectCompany(company) {
    setActiveCompany(company);
    if (company) {
      localStorage.setItem('activeCompany', JSON.stringify(company));
    } else {
      localStorage.removeItem('activeCompany');
    }
  }

  return (
    <CompanyContext.Provider value={{ activeCompany, selectCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  return useContext(CompanyContext);
}
