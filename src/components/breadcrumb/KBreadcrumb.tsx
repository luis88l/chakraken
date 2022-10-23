import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export interface KBreadcrumbProps {
  items: KBreadcrumbItemProps[];
}

export interface KBreadcrumbItemProps {
  title: string;
  link: string;
}

function KBreadcrumb(props: KBreadcrumbProps): any {
  const items = props.items;
  return (
    <Breadcrumb>
      {items.map((item: KBreadcrumbItemProps, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink href={item.link}> {item.title} </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default KBreadcrumb;
