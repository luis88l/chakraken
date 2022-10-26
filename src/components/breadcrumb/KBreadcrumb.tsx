import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FC } from "react";

export interface KBreadcrumbProps {
  items: KBreadcrumbItemProps[];
}

export interface KBreadcrumbItemProps {
  title: string;
  link: string;
}

const KBreadcrum: FC<KBreadcrumbItemProps> = ({ items, title, link }) => {
  const items = items;
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
