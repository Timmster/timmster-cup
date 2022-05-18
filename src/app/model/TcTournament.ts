import { TEAMS } from '../DB';
import { TcGame } from './tc-game.enum';
import { TcMatch } from './TcMatch';
import { TcPlayer } from './TcPlayer';
import { TcTeam } from './TcTeam';

export class TcTournament {
  matches: TcMatch[] = [];

  constructor(public players: TcPlayer[]) {}

  static initAllGames(t: TcTournament) {
    TcTournament.initGames(TcGame.SACKEN, t);
    TcTournament.initGames(TcGame.KICKERN, t);
    TcTournament.initGames(TcGame.TIPPKICK, t);
    TcTournament.initGames(TcGame.MARIO_KART, t);
    TcTournament.initGames(TcGame.FIFA, t);
    // TcTournament.initGames(TcGame.LOOPING_LOUIE, matches);
  }

  static initGames(game: TcGame, t: TcTournament) {
    t.matches = t.matches.filter((g) => g.game != game);
    TcTournament.shakeAll();
    if (game == TcGame.SACKEN) {
      for (let season = 0; season < 5; season++) {
        for (let day = 1; day < TEAMS.length; day++) {
          TcTournament.createGamesForDay(day, TcGame.SACKEN, false, t);
        }
      }
    } else if (game == TcGame.FIFA) {
      for (let day = 1; day < TEAMS.length; day++) {
        TcTournament.createGamesForDay(day, TcGame.FIFA, true, t);
      }
    } else if (game == TcGame.KICKERN) {
      for (let day = 1; day < TEAMS.length; day++) {
        TcTournament.createGamesForDay(day, TcGame.KICKERN, true, t);
      }
    } else if (game == TcGame.TIPPKICK) {
      for (let season = 0; season < 2; season++) {
        for (let day = 1; day < TEAMS.length; day++) {
          TcTournament.createGamesForDay(day, TcGame.TIPPKICK, false, t);
        }
      }
    } else if (game == TcGame.MARIO_KART) {
      for (let day = 1; day < TEAMS.length; day++) {
        TcTournament.createGamesForDay(day, TcGame.MARIO_KART, true, t);
      }
    }
  }

  static shakeAll() {
    TEAMS.forEach((team) => {
      TcTournament.shake(team);
    });
  }

  static shake(team: TcTeam) {
    team.nextPlayerIndex = Math.floor(
      Math.random() * TcTeam.findPlayers(team).length
    );
    team.lastPlayerIndexStart = team.nextPlayerIndex;
  }

  static createGamesForDay(
    day: number,
    game: TcGame,
    is2On2: boolean,
    t: TcTournament
  ) {
    const count = TEAMS.length;
    const half = count / 2;
    const rows = [];
    TEAMS.forEach((team, index) => {
      if (index == 0 || index < half - day + 1 || index > count - day) {
        rows.push(team);
      }
    });
    TEAMS.forEach((team, index) => {
      if (!rows.find((t) => t.id == team.id)) {
        rows.splice(half, 0, team);
      }
    });
    rows.forEach((team, index) => {
      if (index < half) {
        let home1 = TcTournament.getCaptain(team);
        let away1 = TcTournament.getCaptain(rows[index + half]);
        if (index == 0 && day % 2 == 0) {
          const swap = home1;
          home1 = away1;
          away1 = swap;
        }
        if (!is2On2) {
          t.matches.push(TcMatch.create1on1(game, home1, away1));
        } else {
          let home2 = TcTournament.getCaptain(team);
          let away2 = TcTournament.getCaptain(rows[index + half]);
          if (index == 0 && day % 2 == 0) {
            const swap = home2;
            home2 = away2;
            away2 = swap;
          }
          t.matches.push(TcMatch.create2on2(game, home1, home2, away1, away2));
        }
      }
    });
  }

  static getCaptain(team: TcTeam) {
    return TcTeam.findPlayers(team)[0];
  }

  static countPlayedMatches(tournemant: TcTournament, player: TcPlayer) {
    return tournemant.matches
      .filter((m) => m.score)
      .filter(
        (m) =>
          m.playerHome1?.id == player.id ||
          m.playerHome2?.id == player.id ||
          m.playerAway1?.id == player.id ||
          m.playerAway2?.id == player.id
      ).length;
  }

  static getNextPlayer(tournemant: TcTournament, team: TcTeam) {
    const players = TcTeam.findPlayers(team).filter((p) => p.active);
    const counts = new Map<TcPlayer, number>();
    let min = 10000000000;
    players.forEach((p) => {
      const played = TcTournament.countPlayedMatches(tournemant, p);
      counts.set(p, played);
      if (played < min) {
        min = played;
      }
    });
    const leastPlays = players.filter((p) => counts.get(p) == min);
    return leastPlays[Math.floor(Math.random() * leastPlays.length)];
  }
}
