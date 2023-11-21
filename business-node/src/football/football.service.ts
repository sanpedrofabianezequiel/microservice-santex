import { Injectable, NotFoundException } from '@nestjs/common';
import { Football } from './entity/football.entity';
import { FootballRepository } from './football.repository';
import { IFootball } from './interfaces/football.interface';
import { CreateFootballInput } from './dtos/inputs/create-football.input';
import axios from 'axios';
import { IFootbalCompetitionResponse } from './interfaces/football-competition-response.interface';
import { IFootbalTeamResponse } from './interfaces/football-team.response.interface';
import { ICompetition } from './interfaces/competition.interface';
import {
  Coach,
  ICompetitionTeam,
} from './interfaces/competition-team.interface';
import { ICompetitionPerson } from './interfaces/competition-person.interface';
import { CompetitionTeam } from './entity/competition-team.entity';
import { CompetitionRepository } from './repositorys/competition.repository';
import { Competition } from './entity/competition.entity';
import { CompetitionAreaRepository } from './repositorys/competition-area.repository';
import { CompetitionArea } from './entity/competition-area.entity';
import { CompetitionTeamRepository } from './repositorys/competition-team.repository';
import { CompetitionPersonRepository } from './repositorys/competition-person.repository';
import { CompetitionPerson } from './entity/competition-person.entity';
import { CompetitionCoachRepository } from './repositorys/competition-coach.repository';

@Injectable()
export class FootballService {
  constructor(
    private readonly footballRepository: FootballRepository,
    private readonly competitionRepository: CompetitionRepository,
    private readonly competitionAreaRepository: CompetitionAreaRepository,
    private readonly competitionTeamRepository: CompetitionTeamRepository,
    private readonly competitionPersonRepository: CompetitionPersonRepository,
    private readonly competitionCoachRepository: CompetitionCoachRepository,
  ) {}

  async create(footballInput: CreateFootballInput): Promise<Football> {
    try {
      const { competitionResponse, teamsResponse } = await this.getFromApi(
        footballInput,
      );

      const teams = this.getTeams(teamsResponse.data);
      const squads = this.getSquads(teamsResponse.data);
      const competitions = this.getCompetitions(competitionResponse.data);
      const competitionArea = this.getCompetitionArea(competitionResponse.data);

      const footballSaved = await this.saveFootball(footballInput);

      const competitionSaved = await this.saveCompetition(
        competitions,
        footballSaved,
      );

      await this.saveCompetitionArea(competitionArea);

      const competitionTeamSaved = await this.saveCompetitionTeam(
        teams,
        competitionSaved,
      );

      await this.saveCompetitionPersons(squads, competitionTeamSaved);

      return footballSaved;
    } catch (error) {
      throw new Error(error);
    }
  }







  async findPlayerByLeagueCode(leagueCode: string): Promise<Football> {
    try {
      const exist = await this.competitionRepository.findOne({ code: leagueCode });
      if(!exist) throw new Error('League not found');
      return exist.football;
    } catch (error) {
      throw new Error(error);
    }
  }







  private async saveFootball(
    footballInput: CreateFootballInput,
  ): Promise<Football> {
    const football = new Football({ leagueCode: footballInput.leagueCode });
    return await this.footballRepository.create(football);
  }

  private async saveCompetition(
    competitions: ICompetition,
    footballSaved: Football,
  ): Promise<Competition> {
    const competition = new Competition({
      name: competitions.name,
      code: competitions.code,
      area: competitions.area,
      football: footballSaved,
    });
    return await this.competitionRepository.create(competition);
  }

  private async saveCompetitionArea(competitionArea: any): Promise<void> {
    const area = new CompetitionArea({
      name: competitionArea.name,
      code: competitionArea.code,
      flag: competitionArea.flag,
    });
    await this.competitionAreaRepository.create(area);
  }

  private async saveCompetitionTeam(
    teams: ICompetitionTeam[],
    competitionSaved: Competition,
  ): Promise<CompetitionTeam[]> {
    return await this.createCompetitionTeam(teams, competitionSaved);
  }

  private async saveCompetitionPersons(
    squads: ICompetitionPerson[],
    competitionTeamSaved: CompetitionTeam[],
  ): Promise<void> {
    await this.createCompetitionPerson(squads, competitionTeamSaved);
  }

  private async getFromApi(footballInput: CreateFootballInput): Promise<any> {
    const token = 'f7fdb02ceae34b4495e26929467affec';

    const config = {
      headers: {
        'X-Auth-Token': token,
      },
    };
    const competitionResponse = await axios.get(
      `https://api.football-data.org/v4/competitions/${footballInput.leagueCode}`,
      config,
    );
    const teamsResponse = await axios.get(
      `https://api.football-data.org/v4/competitions/${competitionResponse.data.code}/teams`,
      config,
    );

    return { competitionResponse, teamsResponse };
  }

  private async createCompetitionPerson(
    squads: ICompetitionPerson[],
    competitionTeam: CompetitionTeam[],
  ): Promise<CompetitionPerson[]> {
    const competitionPersonsPromises: Promise<CompetitionPerson>[] = [];
    competitionTeam.map((team) => {
      const squad = squads.find((squad) => squad.currentTeamId === team.idTeam);
      if (squad) {
        const competitionPerson = this.competitionPersonRepository.create(
          new CompetitionPerson({
            name: squad.name,
            position: squad.position,
            dateOfBirth: squad.dateOfBirth,
            competitionTeam: team,
            currentTeamId: squad.currentTeamId,
            nationality: squad.nationality,
          }),
        );
        competitionPersonsPromises.push(competitionPerson);
      }
    });

    const competitionPersons: CompetitionPerson[] = await Promise.all(
      competitionPersonsPromises,
    );

    return competitionPersons;
  }

  private async createCompetitionTeam(
    teams: ICompetitionTeam[],
    competition: Competition,
  ): Promise<CompetitionTeam[]> {
    const competitionTeamsPromises: Promise<CompetitionTeam>[] = teams.map(
      (team) => {
        return this.competitionTeamRepository.create(
          new CompetitionTeam({
            idTeam: team.idTeam,
            name: team.name,
            tla: team.tla,
            shortName: team.shortName,
            area: team.area,
            address: team.address,
            competition: competition,
          }),
        );
      },
    );

    // Await all promises and get the resolved values using Promise.all
    const competitionTeams: CompetitionTeam[] = await Promise.all(
      competitionTeamsPromises,
    );

    return competitionTeams;
  }

  private getCompetitionArea(data): ICompetition {
    return {
      name: data.area.name,
      code: data.area.code,
      flag: data.area.flag,
    };
  }
  private getCompetitions(data): ICompetition {
    return {
      name: data.name,
      code: data.code,
      area: data.area.name,
    };
  }

  private getTeams(data): ICompetitionTeam[] {
    return data.teams.map((team) => {
      return {
        idTeam: team.id.toString(),
        name: team.name,
        tla: team.tla,
        shortName: team.shortName,
        areaName: team.area.name,
        address: team.address,
      };
    });
  }

  private getSquads(data): ICompetitionPerson[] {
    const response = data.teams.map((team) => {
      return team.squad.map((squad) => {
        return {
          name: squad.name,
          position: squad.position,
          dateOfBirth: squad.dateOfBirth,
          nationality: squad.nationality,
          currentTeamId: team.id.toString(),
        };
      });
    });
    return response.flat();
  }

  private getCoaches(data): Coach[] {
    return data.teams.map((team) => {
      return {
        name: team.coach.name,
        dateOfBirth: team.coach.dateOfBirth,
        nationality: team.coach.nationality,
      };
    });
  }

  async findOne(id: string): Promise<Football> {
    try {
      return await this.footballRepository.findOne({ id });
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async find(userId: string): Promise<Football[]> {
    try {
      return await this.footballRepository.find({ userId });
    } catch (error) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }
}
