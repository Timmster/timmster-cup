import { TcPlayer } from './model/TcPlayer';
import { TcTeam } from './model/TcTeam';
import { TcTournament } from './model/TcTournament';

const FORCE_REFRESH = true;
const KEY_SAVEGAMES = 'SAVEGAMES';
export let SAVEGAMES = [];
const KEY = 'DATA';
export let DATA: TcTournament;

export const saveData = () => {
  const date = new Date().getTime();
  const key = KEY + date;
  localStorage.setItem(key, JSON.stringify(DATA));
  SAVEGAMES.push(key);
  localStorage.setItem(KEY_SAVEGAMES, JSON.stringify(SAVEGAMES));
};

const initNames = [
  'Timm',
  'Thomas',
  'Kim',
  'Kristin',
  'Klaus',
  'Lars',
  /*  */
  'Jan',
  'Daniel',
  'Sarena',
  'Coco',
  'Marcel',
  'Caro',
  /*  */
  'Wencke',
  'Alex',
  'Budde',
  'Sönke',
  'Matze',
  'Buddy',
  /*  */
  'Philipp',
  'Horner',
  'Ögi',
  'Svenja',
  'Loucas',
  'Conny',
];

/*
 */

export const TEAMS = [
  new TcTeam(1, 'FC St. Pauli', 'FCSP', '#5B3A29', '#FFFFFF'),
  new TcTeam(2, 'Hamburger SV', 'HSV', '#0A3F86', '#FFFFFF'),
  new TcTeam(3, 'SV Werder Bremen', 'WERDER', '#1D9053', '#FFFFFF'),
  new TcTeam(
    4,
    'Team Ostsee - Hansa & Holstein',
    'OSTSEE',
    '#CC3043',
    '#FFFFFF'
  ),
];

export let PLAYERS = [];

export const initData = () => {
  SAVEGAMES = JSON.parse(localStorage.getItem(KEY_SAVEGAMES));
  SAVEGAMES = SAVEGAMES ? SAVEGAMES : [];

  const playerCount = 24;
  const perTeam = Math.floor(playerCount / TEAMS.length);
  for (let i = 0; i < playerCount; i++) {
    const runningName = 'Spieler ' + (i + 1);
    const name = i < initNames.length ? initNames[i] : runningName;
    const p = new TcPlayer(name);
    p.team = TEAMS[Math.floor(i / perTeam)];
    PLAYERS.push(p);
  }
  initAllGames();
};

export const loadData = (savegame: string) => {
  if (localStorage.getItem(savegame) == null) {
    initData();
    saveData();
  } else {
    DATA = new TcTournament([]);
    DATA = JSON.parse(localStorage.getItem(savegame));
    PLAYERS = DATA.players;
  }
};

export const initAllGames = () => {
  DATA = new TcTournament(PLAYERS);
  TcTournament.initAllGames(DATA);
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
initData();
