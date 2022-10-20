// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KModal from "./KModal";

export default {
	title: "Kraken+ChakraUI/Modal",
	component: KModal,
} as ComponentMeta<typeof KModal>;

const Template: ComponentStory<typeof KModal> = (args) => <KModal {...args} />;

export const Modal1 = Template.bind({});
Modal1.args = {
	BtnTitle: "Open Modal",
	ModalHeaderTitle: "Modal Title",
	ModalBodyTitle: "Texto a insertar de tu preferencia",
	TxtBtnClose: "Close",
	TxtBtnSave: "Save",
	variant: "outline",
};
