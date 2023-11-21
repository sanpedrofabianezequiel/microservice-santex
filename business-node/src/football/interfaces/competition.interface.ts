import { ICompetitionArea } from "./competition-area.interface";
import { ICompetitionTeam } from "./competition-team.interface";

export interface ICompetition {
    area?: ICompetitionArea
    name: string;
    code: string;
    type?: string;
    flag?: string;
    competitionTeams?: ICompetitionTeam[];
  }
  