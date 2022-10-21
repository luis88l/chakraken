import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
} from "@chakra-ui/react";

export interface KSliderProps {
	/**
	 * Este es el punto de inicio del Slider
	 */
	defaultValue: number;
}

function KSlider(props: KSliderProps) {
	return (
		<Slider aria-label="slider-ex-1" defaultValue={props.defaultValue}>
			<SliderTrack>
				<SliderFilledTrack />
			</SliderTrack>
			<SliderThumb />
		</Slider>
	);
}

export default KSlider;
