import React, { useState } from "react";
import { Alert, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"

import { format, parseISO } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import {
  Calendar,
  generateInterval,
  IDayProps,
  IMarkedDatesProps
} from "../../components/Calendar";

import ArrowSvg from '../../assets/arrow.svg'

import { useTheme } from "styled-components";

import {
  Container,
  Header,
  BackButtonWrapper,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles'
import { ICarDTO } from "../../dtos/CarDTO";

interface IRentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface INavigationProps {
  navigate: (
    screen: string,
    rentObject: {
      car: ICarDTO;
      dates: object
    }
  ) => void;
  goBack: () => void;
}

interface IParams {
  car: ICarDTO
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>({} as IDayProps);
  const [markedDates, setMarkedDates] = useState<IMarkedDatesProps>({} as IMarkedDatesProps);
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod)

  const theme = useTheme()
  const navigation = useNavigation<INavigationProps>();
  const route = useRoute()
  const { car } = route.params as IParams

  function handleSchedulingDetails() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Erro', 'Selecione uma data')
    } else {
      navigation.navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates)
      });
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: IDayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end)
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(parseISO(firstDate)), 'dd/MM/yy'),
      endFormatted: format(getPlatformDate(parseISO(endDate)), 'dd/MM/yy')
    })
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButtonWrapper>
          <BackButton onPress={handleBack} color={theme.colors.shape} />
        </BackButtonWrapper>

        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleSchedulingDetails}
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>
    </Container >
  )
}