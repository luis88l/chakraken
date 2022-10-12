// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Dashboard from "./Dashboard";
import { userOptions } from "../../fixtures/user";

export default {
	title: "Kraken+ChakraUI/Dashboard",
	component: Dashboard,
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => (
	<Dashboard {...args} />
);

export const Default = Template.bind({});

Default.args = {
	userProfile: {
		id_rol: "f2320fd2-fd6f-4876-a8a5-e2c2d71f09aa",
		nb_nombre: "Administrador",
		de_email: "admin@admin.com",
		nb_usuario: "admin",
		de_rol: "default",
		nb_area: "default",
	},
	userOptions: userOptions.data,
};
