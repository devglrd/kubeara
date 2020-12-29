import { WebsiteRouting } from './website.routing';

describe('WebsiteRouting', () => {
  let websiteRoutingModule: WebsiteRouting;

  beforeEach(() => {
    websiteRoutingModule = new WebsiteRouting();
  });

  it('should create an instance', () => {
    expect(websiteRoutingModule).toBeTruthy();
  });
});
