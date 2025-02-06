import { faJs } from '@fortawesome/free-brands-svg-icons';
import { render, screen, within } from '@testing-library/angular';
import { SocialNetworkService } from './data-access/social-network';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let socialNetworkService: jasmine.SpyObj<SocialNetworkService>;

  beforeEach(() => {
    socialNetworkService = jasmine.createSpyObj<SocialNetworkService>({
      $socialNetworks: [],
      $isLoading: false,
    });
  });

  it('should show the project name', async () => {
    await render(FooterComponent, {
      providers: [
        { provide: SocialNetworkService, useValue: socialNetworkService },
      ],
    });

    const actual = screen.getByRole('heading', {
      level: 4,
      name: /project.name/,
    });

    expect(actual).toBeVisible();
  });

  it('should show the action to contact', async () => {
    await render(FooterComponent, {
      providers: [
        { provide: SocialNetworkService, useValue: socialNetworkService },
      ],
    });

    const actual = screen.getByRole('link', { name: /footer.action$/ });

    expect(actual).toBeVisible();
    expect(actual).toHaveAttribute('href', '/contact');
  });

  it('should link to the home page in the title', async () => {
    await render(FooterComponent, {
      providers: [
        { provide: SocialNetworkService, useValue: socialNetworkService },
      ],
    });

    const actual = screen.getByRole('link', { name: /project.name$/ });

    expect(actual).toBeVisible();
    expect(actual).toHaveAttribute('href', '/');
  });

  describe('when showing the current year', () => {
    let clock: jasmine.Clock;

    beforeEach(() => {
      clock = jasmine.clock();
      clock.install();
    });

    afterEach(() => {
      clock.uninstall();
    });

    it('should show the current year', async () => {
      const expected = '2022';
      clock.mockDate(new Date(expected));

      await render(FooterComponent, {
        providers: [
          { provide: SocialNetworkService, useValue: socialNetworkService },
        ],
      });

      const actual = screen.getByText(new RegExp(expected));

      expect(actual).toBeVisible();
    });
  });

  it('should show the social networks', async () => {
    const expected = [
      { name: 'social-network-1', url: 'url-1', icon: faJs },
      { name: 'social-network-2', url: 'url-2', icon: faJs },
      { name: 'social-network-3', url: 'url-3', icon: faJs },
    ];

    socialNetworkService.$socialNetworks.and.returnValue(expected as any);

    await render(FooterComponent, {
      providers: [
        { provide: SocialNetworkService, useValue: socialNetworkService },
      ],
    });

    const actual = screen
      .getAllByTestId('social-network-link')
      .map((element) => within(element).getByRole('link'));

    expect(actual).toHaveSize(expected.length);
    actual.forEach((link, i) => {
      expect(link).toBeVisible();
      expect(link).toHaveAttribute('href', expected.at(i)?.url);
    });
  });

  describe('when social networks are loading', () => {
    beforeEach(() => {
      socialNetworkService.$isLoading.and.returnValue(true);
    });

    it('should show a skeleton', async () => {
      await render(FooterComponent, {
        providers: [
          { provide: SocialNetworkService, useValue: socialNetworkService },
        ],
      });

      const actual = screen.getByTestId('skeleton');

      expect(actual).toBeVisible();
    });
  });
});
