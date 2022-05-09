import { TcPlayer } from '../model/TcPlayer';
import { TcTeam } from '../model/TcTeam';
import { TcTournament } from '../model/TcTournament';

const FORCE_REFRESH = true;
export let DATA: TcTournament;
const KEY = 'DATA';

export const initData = () => {
  const TEAMS = [
    new TcTeam(1, 'FC St. Pauli', 'FCSP', '', ''),
    new TcTeam(2, 'Hamburger SV', 'HSV', '', ''),
    new TcTeam(3, 'SV Werder Bremen', 'WERDER', '', ''),
    new TcTeam(4, 'Team Ostsee - Hansa/Holstein', 'OSTSEE', '', ''),
  ];
  const PLAYERS = [new TcPlayer('Timm'), new TcPlayer('Wencke')];
  DATA = new TcTournament(PLAYERS, TEAMS);
  localStorage.setItem(KEY, JSON.stringify(DATA));
};

export const loadData = () => {
  if (FORCE_REFRESH || localStorage.getItem(KEY) == null) {
    initData();
  } else {
    DATA = JSON.parse(localStorage.getItem(KEY));
  }
};

loadData();
