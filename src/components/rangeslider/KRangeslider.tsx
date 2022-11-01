import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  ResponsiveValue,
} from "@chakra-ui/react";
import { FC } from "react";

export interface KRangesliderProps {
  /**
   * Este es el valor default por el que partira el Range Slider.
   */
  defaultValue: number[];
  /**
   * Este es el valor maximo que alcanzara nuestro Range Slider.
   */
  max: number;
  /**
   * Este es el valor minimo que alcanzara nuestro Range Slider.
   */
  min: number;
  /**
   * La distancia mínima entre los sliders.
   * Útil para evitar que los sliders estén demasiado juntos.
   */
  minStepsBetweenThumbs: number;
  /**
   * Este es el tamaño del componente.
   */
  size: ResponsiveValue<(string & {}) | "sm" | "md" | "lg"> | undefined;
}

const KRangeslider: FC<KRangesliderProps> = ({
  defaultValue,
  max,
  min,
  minStepsBetweenThumbs,
  size,
}) => {
  return (
    <RangeSlider
      defaultValue={defaultValue}
      max={max}
      min={min}
      minStepsBetweenThumbs={minStepsBetweenThumbs}
      size={size}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  );
};

export default KRangeslider;
