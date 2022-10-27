import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { FC } from "react";

export interface KSliderProps {
  /**
   * Este es el valor por default donde iniciara el Slider
   */
  defaultValue: number;
}

const KSlider: FC<KSliderProps> = ({ defaultValue }) => {
  return (
    <Slider aria-label="slider-ex-1" defaultValue={defaultValue}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default KSlider;
