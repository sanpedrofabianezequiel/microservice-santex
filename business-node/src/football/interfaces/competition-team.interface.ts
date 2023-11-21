import { ICompetitionArea } from './competition-area.interface';
import { ICompetition } from './competition.interface';

export interface ICompetitionTeam {
  idTeam: string;
  area: ICompetitionArea;
  name: string;
  shortName: string;
  tla: string;
  address: string;
  coach?: Coach;
}

export interface ICompetitionTeamResponse {
  count: number;
  filters?: {
    season: string;
  };
  competition: ICompetition;
  season?: Season;
  teams: ICompetitionTeam[];
}

export interface Coach {
  id?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  name: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
  contract?: {
    start: string | null;
    until: string | null;
  };
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: any; // Define the appropriate type for winner if available
  stages: string[];
}
