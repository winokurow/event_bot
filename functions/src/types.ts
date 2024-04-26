import { Scenes, Context } from 'telegraf';

export type IEventData = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  multiday?: boolean;
  location?: string;
  file?: string;
  description?: string;
  chatId?: number;
  area?: string;
  zooplaAreaId?: string;
  rooms?: string;
  roomsMore?: boolean;
  budget?: number;
};

interface WizardSession extends Scenes.WizardSessionData {
  add: IEventData;
  search: IEventData;
}

export interface TelegrafContext extends Context {
  //session: SessionData;
  scene: Scenes.SceneContextScene<TelegrafContext, WizardSession>;
  wizard: Scenes.WizardContextWizard<TelegrafContext>;
}

export enum GLOBAL_ACTIONS {
  search = 'search',
  add = 'add',
}