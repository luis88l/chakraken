// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KDrawer from "./KDrawer";

export default {
	title: "Kraken+ChakraUI/Drawer",
	component: KDrawer,
} as ComponentMeta<typeof KDrawer>;

const Template: ComponentStory<typeof KDrawer> = (args) => <KDrawer {...args}/>;


export const Drawer1 = Template.bind({});
Drawer1.args={
	colorScheme: "blackAlpha",
	placement: 'right',
	title: 'Crea tu propia cuenta.',
	placeholder:'escriba aqui...',
	variant:'ghost',
	mr:'5',
	secondColorScheme: 'green',
	colorCancel:'red',
	titleBtnDrawer:'Open',
	titleBtnCancel:'Cancel',
	titleBtnSave:'Save',
	size:'lg',
}

export const Drawer2 = Template.bind({});
Drawer2.args={
	colorScheme: "linkedin",
	placement: 'left',
	title: 'Crea tu propia cuenta.',
	placeholder:'escriba aqui...',
	variant:'outline',
	mr:'10',
	secondColorScheme: 'blue',
	colorCancel:'red',
	titleBtnDrawer:'Open',
	titleBtnCancel:'Cancel',
	titleBtnSave:'Save',
}

