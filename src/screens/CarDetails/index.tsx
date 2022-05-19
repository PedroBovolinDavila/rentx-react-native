import React from "react";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native'

import { ICarDTO } from "../../dtos/CarDTO";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from './styles'

interface IParams {
  car: ICarDTO
}

interface INavigationProps {
  navigate: (
    screen: string,
    carObject: {
      car: ICarDTO
    }
  ) => void;
  goBack: () => void
}

export function CarDetails() {
  const navigation = useNavigation<INavigationProps>();
  const route = useRoute();

  const { car } = route.params as IParams

  function handleScheduling() {
    navigation.navigate('Scheduling', { car })
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>
              {car.brand}
            </Brand>
            <Name>
              {car.name}
            </Name>
          </Description>
          <Rent>
            <Period>
              {car.rent.period}
            </Period>
            <Price>
              R$ {car.rent.price}
            </Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                icon={getAccessoryIcon(accessory.type)}
                name={accessory.name}
                key={accessory.type}
              />
            ))
          }
        </Accessories>

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleScheduling}
        />
      </Footer>

    </Container>
  )
}