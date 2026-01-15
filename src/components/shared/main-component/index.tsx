import React, { ReactNode } from "react";
import Header from "@/components/shared/header/storefront-header";
import Footer from "@/components/shared/footer/storefront";

interface MainComponentProps {
  children?: ReactNode;
}

const MainComponent: React.FC<MainComponentProps> = ({ children }) => {
  return (
    <div className="d-flex flex-column sticky-footer-wrapper">
      <Header />
      <div className="container flex-fill">
        {children}
      </div>
      <Footer />
    </div>
  )
};

export default MainComponent;
