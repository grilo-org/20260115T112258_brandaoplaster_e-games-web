import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "@/components/shared/logo";

const AdminFooter: React.FC = () => {
  return (
    <Container className="p-4">
      <Row>
        <Col>
          <Logo />
        </Col>
        <Col>
          <span className="float-right">E-games.com • contact@e-games.com</span>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminFooter;
