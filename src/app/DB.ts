import { TcPlayer } from './model/TcPlayer';
import { TcTeam } from './model/TcTeam';
import { TcTournament } from './model/TcTournament';

const FORCE_REFRESH = true;
export let DATA: TcTournament;
const KEY = 'DATA';

export const saveData = () => {
  localStorage.setItem(KEY, JSON.stringify(DATA));
};

export const TEAMS = [
  new TcTeam(1, 'FC St. Pauli', 'FCSP', '#5B3A29', '#FFFFFF'),
  new TcTeam(2, 'Hamburger SV', 'HSV', '#0A3F86', '#FFFFFF'),
  new TcTeam(3, 'SV Werder Bremen', 'WERDER', '#1D9053', '#FFFFFF'),
  new TcTeam(4, 'Team Ostsee - Hansa/Holstein', 'OSTSEE', '#CC3043', '#FFFFFF'),
];

export const initData = () => {
  const PLAYERS = [];
  const playerCount = 24;
  const perTeam = Math.floor(playerCount / TEAMS.length);
  for (let i = 0; i < playerCount; i++) {
    const p = new TcPlayer('s' + (i + 1));
    TcTeam.addPlayer(TEAMS[Math.floor(i / perTeam)], p);
    PLAYERS.push(p);
  }

  DATA = new TcTournament(PLAYERS);
  DATA.initAllGames();
};

export const loadData = () => {
  if (localStorage.getItem(KEY) == null) {
    initData();
    saveData();
  } else {
    DATA = new TcTournament([]);
    Object.assign(DATA, JSON.parse(localStorage.getItem(KEY)));
  }
};

const autoSave = () => {
  setTimeout(() => {
    // Automatisch Speichern alle 30 Sekunden
    saveData();
    console.log('SAVED');
    autoSave();
  }, 30000);
};

// autoSave();
loadData();
