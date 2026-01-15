import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchIcon from "@/components/shared/admin-subheader/search-icon";
import TitlePath from "@/components/shared/admin-subheader/title-path";
import styles from "./styles.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface AdminSubHeaderProps {
  title?: string;
  path: string;
  icon?: IconProp;
  newPath: string;
}

const AdminSubHeader: React.FC<AdminSubHeaderProps> = ({
  title,
  path,
  icon,
  newPath
}) => {
  return (
    <Row>
      {(icon) ?
        <>
          <Col lg={6} xs={4} className={styles.title_and_path}>
            <TitlePath title={title} path={path} />
          </Col>

          <Col lg={6} xs={8}>
            <SearchIcon icon={icon} newPath={newPath} />
          </Col>
        </>
       : 
        <TitlePath title={title} path={path} />
      }
    </Row>
  );
};

export default AdminSubHeader;
