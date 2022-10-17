import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react';

function KBreadcrumb(props) {
    console.log(props);
    const items = props.items
    console.log(items);
    return (
        <Breadcrumb>
            {items.map((item) => (
                <BreadcrumbItem>
                    <BreadcrumbLink href={item.link}> {item.title} </BreadcrumbLink>
                </BreadcrumbItem>
            ))}

        </Breadcrumb>
    )
}

export default KBreadcrumb;