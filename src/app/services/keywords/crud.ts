import * as keywordsData from '../../servicesDTO/keywords/keywords.json';

export class KeywordsService {
  private data = keywordsData;

  getKeywordsData() {
    return this.data;
  }
}
