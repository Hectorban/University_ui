import React from 'react';

interface Props {
  banName: string
}

const BanPick: React.FC<Props> = ({banName}:Props) => {
  const banImage = banName==='Fiddlesticks' ? `http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/FiddleSticks_0.jpg` 
  : `http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${banName}_0.jpg`;

    return (
    <div className='ban-pick'>
      <img className='ban-pick-image' src={banImage} alt={banName}/>
    </div>
  );
};

export default BanPick;
