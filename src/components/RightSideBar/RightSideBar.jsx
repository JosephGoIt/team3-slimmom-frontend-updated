import { useSelector } from 'react-redux';
import {
  Wrapper,
  SummaryWrap,
  FoodWrap,
  Title,
  Item,
  Text,
  RedText,
} from './RightSideBar.styled';
import moment from 'moment';
import {
  getProfileUser,
  getProfileLoading,
} from '../../redux/profile/selectors';
import { Loader } from 'components/Loader/Loader';

export const RightSideBar = () => {
  const date =
    useSelector(state => state.diary.selectedDate) || 'No date available';
  const dailyRate = useSelector(getProfileUser);
  const isLoading = useSelector(getProfileLoading);

  const notAllowedProducts = 0;
  const diaryEntries = useSelector(state => state.diary.diaryEntries) || [];
  const totalCalories = diaryEntries
    .map(product => product.calories)
    .reduce((prev, product) => {
      return Number.parseInt(prev) + Number.parseInt(product);
    }, 0);
  const leftCalories = dailyRate?.data?.dailyCalories - totalCalories;
  const nOfNorm = dailyRate?.data?.dailyCalories
    ? (totalCalories / dailyRate?.data?.dailyCalories) * 100
    : 0;

  return (
    <div>
      <Wrapper>
        {isLoading ? (
          <div className="flex justify-center mx-auto xl:mt-[70px] mt-[40px]">
            <Loader />
          </div>
        ) : (
          <>
            <SummaryWrap>
              <Title>
                Summary for {moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY')}
              </Title>
              <ul>
                <Item>
                  <Text>Left</Text>
                  {leftCalories < 0 ? (
                    <RedText>{leftCalories} kcal</RedText>
                  ) : (
                    <Text>{leftCalories ? leftCalories : '000'} kcal</Text>
                  )}
                </Item>
                <Item>
                  <Text>Consumed{}</Text>
                  <Text>{totalCalories ? totalCalories : '000'} kcal</Text>
                </Item>
                <Item>
                  <Text>Daily rate</Text>
                  <Text>
                    {dailyRate ? dailyRate?.data?.dailyCalories : '000'} kcal
                  </Text>
                </Item>
                <Item>
                  <Text>n% of normal</Text>
                  {nOfNorm > 100 ? (
                    <RedText>{nOfNorm ? Math.round(nOfNorm) : '0'} %</RedText>
                  ) : (
                    <Text>{nOfNorm ? Math.round(nOfNorm) : '0'} %</Text>
                  )}
                </Item>
              </ul>
            </SummaryWrap>
            <FoodWrap>
              <Title>Food not recommended</Title>
              {notAllowedProducts.length > 0 ? (
                <ul>
                  {notAllowedProducts.map((prod, index) => (
                    <Text key={index}>
                      {index + 1}. {prod}
                    </Text>
                  ))}
                </ul>
              ) : (
                <Text>Your diet will be displayed here</Text>
              )}
            </FoodWrap>
          </>
        )}
      </Wrapper>
    </div>
  );
};
