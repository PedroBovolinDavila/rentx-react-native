import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import {
  Container,
  Name
} from './styles'

interface IProps extends RectButtonProps {
  name: string;
  icon: React.FC<SvgProps>;
}

export function Accessory({
  name,
  icon: Icon,
  ...rest
}: IProps) {
  return (
    <Container {...rest}>
      <Icon
        width={32}
        height={32}
      />

      <Name>
        {name}
      </Name>
    </Container>
  )
}