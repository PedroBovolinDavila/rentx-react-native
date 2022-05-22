import React, { useState, useRef } from "react";
import { FlatList, ViewToken } from "react-native";

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles'

interface IProps {
  imagesUrl: string[]
}

interface IChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: IProps) {
  const [imageIndex, setIndexImage] = useState(0);

  const indexChanged = useRef((info: IChangeImageProps) => {
    const index = info.viewableItems[0].index!
    setIndexImage(index);
  })

  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((_, index) => (
            <ImageIndex
              key={index}
              active={index === imageIndex}
            />
          ))
        }
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />

    </Container>
  )
}