import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMenuMb } from '~/pages/HomePage/HomePageSlice';
import Rank from '~/Components/Rank/Rank';

import MenuTlMb from '~/Components/MenuTlMb/MenuTlMb';

function RankPage() {
  const dispatch = useDispatch();
  const handleOpenMenuMb = () => {
    dispatch(setMenuMb(true));
  };
  return (
    <div>
      <MenuTlMb open={handleOpenMenuMb} />
      <Rank />
    </div>
  );
}

export default RankPage;
