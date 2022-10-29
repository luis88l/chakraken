import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FC } from "react";

export interface KBreadcrumbProps {
  items: KBreadcrumbItemProps[];
  title: string;
  link: string;
}

export interface KBreadcrumbItemProps {
  title: string;
  link: string;
}

const KBreadcrumb: FC<KBreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumb>
      {items.map((item: KBreadcrumbItemProps, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink href={item.link}> {item.title} </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default KBreadcrumb;
