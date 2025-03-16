import React, { useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import WorkFlow from "../components/sections/Portfolio/WorkFlow";

function Work() {
  useEffect(() => {
    document.title = "Work - Chathura Sudaraka";
  }, []);
  
  return (
    <Layout>
      <WorkFlow />
    </Layout>
  );
}

export default Work;