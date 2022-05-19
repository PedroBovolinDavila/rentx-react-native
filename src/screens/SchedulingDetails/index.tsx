import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, StatusBar } from "react-native";
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

import api from "../../services/api";

import { ICarDTO } from "../../dtos/CarDTO";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { format, parseISO } from "date-fns";

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from "../../utils/getPlatformDate";

import { useTheme } from "styled-components";

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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'

interface IParams {
  car: ICarDTO;
  dates: string[];
}

interface IRentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>()

  const theme = useTheme()
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as IParams

  const rentTotal = Number(dates.length * car.rent.price)

  async function handleSchedulingComplete() {
    const schedulingByCar = await api.get(`/schedules_bycars/${car.id}`)

    console.log(schedulingByCar.data)


    const unavailable_dates = [
      ...schedulingByCar.data.unavailable_dates,
      ...dates
    ]

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
      .then(() => navigation.navigate('SchedulingComplete'))
      .catch(() => Alert.alert('Erro', 'Não foi possivel confirmar o agendamento'))


  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(parseISO(dates[0])), 'dd/MM/yy'),
      end: format(getPlatformDate(parseISO(dates[dates.length - 1])), 'dd/MM/yy')
    })
  }, [])

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
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>
              {rentalPeriod?.start}
            </DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>
              {rentalPeriod?.end}
            </DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>
            TOTAL
          </RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.rent.price} x${dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>
              R$ {rentTotal}
            </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleSchedulingComplete}
        />
      </Footer>
    </Container>
  )
}