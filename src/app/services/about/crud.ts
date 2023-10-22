import * as aboutData from '../../servicesDTO/about/about.json';

export class AboutService {
  private data = aboutData;

  getAboutData() {
    return this.data;
  }
}
