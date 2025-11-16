import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Experience from "./pages/Experience.jsx";
import ExperienceDetail from "./pages/ExperienceDetail.jsx";
import ATS from "./pages/ATS.jsx";
import Companies from "./pages/Companies.jsx";
import CompanyDetails from "./pages/CompanyDetails.jsx";
import AIPage from "./pages/AI.jsx";
import AuthPage from "./pages/AuthPage";
function Page({ text }) {
  return <h1 className="text-3xl p-5">{text}</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/experience" element={<Experience />} />
        <Route path="/experience/:id" element={<ExperienceDetail />} />

        <Route path="/ats" element={<ATS />} />

        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:companyName" element={<CompanyDetails />} />

        <Route path="/ai" element={<AIPage />} />

        <Route path="*" element={<Page text="Not Found" />} />
      <Route path="/login" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}
