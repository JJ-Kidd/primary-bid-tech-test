import { getUrlByShort, insertUrl } from "../repo/url-repo";
import { shortGen } from "../util/short-gen";

export const ensureUniqueShort = async () => {
  let unique: boolean;
  let short: string;
  while(unique != true){
    short = shortGen();
    const query = await getUrlByShort(short);
    if(!query){
      unique = true
    }
  }
  return short;
}

export const createShortUrl = async (url: string) => {
  const short = await ensureUniqueShort();
  const success = await insertUrl({short_url: short, long_url: url });
  if(!success) return { success };
  return { success, short_url: short };
} 