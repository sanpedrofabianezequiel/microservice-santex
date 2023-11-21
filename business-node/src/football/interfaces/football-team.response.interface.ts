export interface IFootbalTeamResponse {
    area: {
      id: number;
      name: string;
      code: string;
      flag: string;
    };
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
    runningCompetitions: {
      id: number;
      name: string;
      code: string;
      type: string;
      emblem: string;
    }[];
    coach: {
      id: number;
      firstName: string;
      lastName: string;
      name: string;
      dateOfBirth: string;
      nationality: string;
      contract: {
        start: string;
        until: string;
      };
    };
    marketValue: number;
    squad: {
      id: number;
      firstName: string;
      lastName: string | null;
      name: string;
      position: string;
      dateOfBirth: string;
      nationality: string;
      shirtNumber: number | null;
      marketValue: number;
      contract: {
        start: string;
        until: string;
      };
    }[];
    staff: any[]; // You might define a proper type for staff members if needed
    lastUpdated: string;
  }
  