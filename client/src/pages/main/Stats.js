import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatsContainer, Loading, ChartsContainer } from '../../component';
import { getStats } from '../../store/statSlice';

const Stats = () => {
  const { isLoading, monthlyProducts } = useSelector((state) => state.stat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats());
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyProducts.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
