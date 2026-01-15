import React, { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import AdminHeader from "@/components/shared/header/admin-header";
import AdminFooter from "@/components/shared/footer/admin-footer";
import LatealMenu from "@/components/shared/lateral-menu";

interface AdminComponentProps {
  children?: ReactNode;
}

const AdminComponent: React.FC<AdminComponentProps> = ({ children }) => {
  return (
    <Row className="mr-lg-4">
      <Col lg={3}>
        <LatealMenu />
      </Col>
      <Col lg={9}>
        <div className="d-flex flex-column sticky-footer-wrapper container">
          <AdminHeader />
          <div className="flex-fill text-center">{children}</div>
          <AdminFooter />
        </div>
      </Col>
    </Row>
  );
};

export default AdminComponent;
