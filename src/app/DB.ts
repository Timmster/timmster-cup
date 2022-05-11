import { TcPlayer } from './model/TcPlayer';
import { TcTeam } from './model/TcTeam';
import { TcTournament } from './model/TcTournament';

const FORCE_REFRESH = true;
export let DATA: TcTournament;
const KEY = 'DATA';

export const saveData = () => {
  localStorage.setItem(KEY, JSON.stringify(DATA));
};

export const initData = () => {
  const TEAMS = [
    new TcTeam(1, 'FC St. Pauli', 'FCSP', '', ''),
    new TcTeam(2, 'Hamburger SV', 'HSV', '', ''),
    new TcTeam(3, 'SV Werder Bremen', 'WERDER', '', ''),
    new TcTeam(4, 'Team Ostsee - Hansa/Holstein', 'OSTSEE', '', ''),
  ];
  const PLAYERS = [];
  for (let i = 1; i < 25; i++) {
    const p = new TcPlayer('Spieler' + i);
    p.team = TEAMS[i % TEAMS.length];
    PLAYERS.push(p);
  }

  DATA = new TcTournament(PLAYERS, TEAMS);
  saveData();
};

export const loadData = () => {
  if (FORCE_REFRESH || localStorage.getItem(KEY) == null) {
    initData();
  } else {
    DATA = JSON.parse(localStorage.getItem(KEY));
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

loadData();
// autoSave();
