
import { askForDistance } from './distance';
import {TelegrafContext} from "../../types";
import { cancelSearchReply } from '../helpers';
class IncorrectMessageError extends Error {}
class NoLocationFoundError extends Error {}

export default async function stepLocationHandler(ctx: TelegrafContext) {
  try {
    if (!ctx.message || !('text' in ctx.message) || ctx.message.text.length < 2) {
      throw new IncorrectMessageError( '⛔️ *Pardon*, you entered incorrect location.');
    }

    try {
      //const location = await detectLocation(ctx.message.text);
      //ctx.scene.session.search.area = location.locationName;
      //ctx.scene.session.search.zooplaAreaId = location.locationId;
    } catch (error) {}

    if (!ctx.scene.session.search.area) {
      throw new NoLocationFoundError('⛔️ Sorry, i can not find this location not found. Please enter correct one.');
    }

    //let locationAlreadyInSearch = false;

    //if (ctx.session.activeSearches) {
      //const searches = ctx.session.activeSearches;

      //Object.keys(searches).forEach((key) => {
        //const searchObject = searches[key];

        //if (searchObject.zooplaAreaId === ctx.scene.session.search.zooplaAreaId) {
          //locationAlreadyInSearch = true;
        //}
      //});
    //}

    await askForDistance(ctx);
    return ctx.wizard.next();
  } catch (error) {
    // @ts-ignore
    return cancelSearchReply(ctx, error.message);
  }
}