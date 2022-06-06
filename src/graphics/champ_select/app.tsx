import React, {FC, useEffect, useState} from 'react'
import { ChampSelectType } from 'src/types/champSelect'
import NCGStore, { replicate } from "../../stores/NodecgStore"
import { SummonerNameProvider } from './util/summonerNamesCtx'

import * as example from './util/CSExample.json'
import './app.scss'
import Team from './components/Team'
import Ban from './components/Ban'
import Timer from './components/Timer'
// import Scoreboard from './components/Scoreboard'

const app: FC = () => {
  const [repState, setRepState] = useState({
    replicants: NCGStore.getReplicants(),
  });

  useEffect(() => {
    replicate("champSelectUpdate");
    replicate('summonerName') // You can subscribe to replicants with this method
  }, []);

  useEffect(() => {
    NCGStore.on("change", () => {
      setRepState({
        replicants: NCGStore.getReplicants(),
      });
    });
  }, []);
  
  const {
    replicants: { champSelectUpdate, summonerName }, // Used to take out a replicant from the replicants object
  } = repState || {}
  
  if(!champSelectUpdate || !summonerName) return null

  const champSelect:ChampSelectType = champSelectUpdate
  const { myTeam, theirTeam, bans, actions, timer } = champSelect 
  const { myTeamBans, theirTeamBans} = bans

  return (
    <div id="app">
      <video className='app-background' autoPlay muted loop> 
        <source src='https://www.dropbox.com/s/rl35zbi4ea0rj1e/LOL.webm?raw=1' type='video/webm'/>
      </video> 
      <div className="app-background">
        <img className="background" src="https://i.imgur.com/IndAbzb.png" alt="El fondo deberia estar aqui >:c"/>
      </div> 
        <div className="app-container">
        <SummonerNameProvider value = {summonerName}>
          <Team
            key={1}
            side="Blue"
            data={myTeam}
          />
          <Team
            key={2}
            side="Red"
            data={theirTeam}
          />
          <Ban
            key={3}
            side='Blue'
            data={myTeamBans}
          />
          <Ban
            key={4}
            side='Red'
            data={theirTeamBans}
          />
          <Timer
            actions={actions}
            timer={timer}
          />
        </SummonerNameProvider>
        </div>
    </div>
  );
};

export default app;
