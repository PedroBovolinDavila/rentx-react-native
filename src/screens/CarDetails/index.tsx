import React from "react";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import {
  Container,
  Header,
  CarImages
} from './styles'

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => { }} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={["https://cdn.jdpower.com/ChromeImageGallery/Expanded/White/640/2016PRC010009_640/2016PRC010009_640_01.jpg"]}
        />
      </CarImages>
    </Container>
  )
}