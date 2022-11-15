import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ResponsiveValue,
} from "@chakra-ui/react";
import { FC } from "react";

export interface KSliderProps {
  /**
   * Este es el valor por default donde iniciara el Slider
   */
  defaultValue: number;
  /**
   * Este es el tamaño del Slider
   */
  size: ResponsiveValue<(string & {}) | "sm" | "md" | "lg"> | undefined;
}

const KSlider: FC<KSliderProps> = ({ defaultValue, size }) => {
  return (
    <Slider aria-label="slider-ex-1" defaultValue={defaultValue} size={size}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default KSlider;
