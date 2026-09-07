import { Component, NgZone, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';
import { GrantCarouselComponent } from '../grant-carousel/grant-carousel.component';
import { DataService } from '../../services/data.service';
import {
  ActionItem,
  ActivityItem,
  ChartLegendItem,
  CommentItem,
  DonutPath,
  DonutSegment,
  FeaturePill,
  Funder,
  GwiData,
  HeroHighlight,
  HeroStat,
  ManageStat,
  PipelineItem,
  PipelineStep,
  PlatformFeature,
  StatCard,
  StatTile,
  TabContent,
  TabDefinition,
  TabId,
  TableRow,
  Testimonial,
} from '../../../dataType';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    NgFor,
    GrantCarouselComponent,
    NgIf,
    HeroSectionComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('slideUpFade', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '250ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  readonly r = 34;
  readonly circ = 2 * Math.PI * 34;

  // ── DataService se aane wala data ──────────────────────────────
  sidebarItems: string[] = [];
  statTiles: StatTile[] = [];
  tableRows: TableRow[] = [];
  chartLegend: ChartLegendItem[] = [];
  orgs: string[] = [];
  features: FeaturePill[] = [];
  featuresDoubled: FeaturePill[] = [];
  stats: StatCard[] = [];
  tabs: TabDefinition[] = [];
  contentMap: Record<TabId, TabContent> | null = null;
  pipeline: PipelineItem[] = [];
  manageStats: ManageStat[] = [];
  activities: ActivityItem[] = [];
  comments: CommentItem[] = [];
  donutPaths: DonutPath[] = [];
  platformFeatures: PlatformFeature[] = [];
  actions: ActionItem[] = [];
  grantSteps: PipelineStep[] = [];
  donorSteps: PipelineStep[] = [];
  heroHighlights: HeroHighlight[] = [];
  heroStats: HeroStat[] = [];

  query = '';
  focused = false;
  loading = true;
  allFunders: Funder[] = [];

  selectedFocusAreas: string[] = [];
  selectedCountries: string[] = [];

  readonly MAX_FOCUS_AREAS = 3;
  readonly PAGE_SIZE = 10;

  visibleFocusCount = 9;
  visibleCountryCount = 10;

  testimonials: Testimonial[] = [];
  currentIndex = 0;
  animating = false;
  private timer: any;

  readonly focusAreasMaster: string[] = [
    'Arts & Culture',
    'Education',
    'Environment',
    'Health',
    'Human Services',
    'Youth Dev',
    'Housing',
    'STEM',
    'Food Security',
    'Animal Welfare',
    'Civil Rights',
    'Community Development',
    'Disaster Relief',
    'Economic Development',
    'Elderly Care',
    'Employment',
    'Family Services',
    'Gender Equality',
    'Global Health',
    'Homelessness',
    'Immigration',
    'International Development',
    'Justice Reform',
    'LGBTQ+ Rights',
    'Literacy',
    'Mental Health',
    'Public Health',
    'Refugee Support',
    'Research & Science',
    'Rural Development',
    'Sports & Recreation',
    'Substance Abuse',
    'Veterans',
    'Water & Sanitation',
    'Women Empowerment',
  ];

  readonly countriesMaster: string[] = [
    'All Countries',
    'United States',
    'India',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'UAE',
    'Singapore',
    'Japan',
    'Brazil',
    'South Africa',
    'Mexico',
    'Italy',
    'Spain',
    'Netherlands',
    'Sweden',
    'Norway',
    'Switzerland',
    'China',
    'South Korea',
    'New Zealand',
    'Ireland',
    'Belgium',
    'Austria',
    'Denmark',
    'Finland',
    'Portugal',
    'Poland',
    'Kenya',
    'Nigeria',
    'Egypt',
    'Israel',
    'Saudi Arabia',
    'Indonesia',
    'Philippines',
    'Malaysia',
    'Thailand',
    'Vietnam',
    'Argentina',
  ];

  // ── Sirf UI state ──────────────────────────────────────────────
  readonly stars = [1, 2, 3, 4, 5];
  activeTab: TabId = 'discover';

  gwi: GwiData | null = null;

  constructor(
    private dataService: DataService,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.dataService.getSidebarItems().subscribe((v) => (this.sidebarItems = v));
    this.dataService.getStatTiles().subscribe((v) => (this.statTiles = v));
    this.dataService.getTableRows().subscribe((v) => (this.tableRows = v));
    this.dataService.getChartLegend().subscribe((v) => (this.chartLegend = v));
    this.dataService.getOrgs().subscribe((v) => (this.orgs = v));

    this.dataService.getFeaturePills().subscribe((v) => {
      this.features = v;
      this.featuresDoubled = [...v, ...v];
    });

    this.dataService.getFunders().subscribe((funders) => {
      this.allFunders = funders;
      this.loading = false;
    });

    this.dataService.getTestimonials().subscribe((data) => {
      this.testimonials = data;
      this.loading = false;
      this.startTimer();
    });

    this.dataService.getStatCards().subscribe((v) => (this.stats = v));
    this.dataService.getTabs().subscribe((v) => (this.tabs = v));
    this.dataService.getTabContent().subscribe((v) => (this.contentMap = v));
    this.dataService.getPipeline().subscribe((v) => (this.pipeline = v));
    this.dataService.getManageStats().subscribe((v) => (this.manageStats = v));
    this.dataService.getActivities().subscribe((v) => (this.activities = v));
    this.dataService.getComments().subscribe((v) => (this.comments = v));
    this.dataService.getPlatformFeatures().subscribe((v) => (this.platformFeatures = v));
    this.dataService.getActions().subscribe((v) => (this.actions = v));
    this.dataService.getGrantSteps().subscribe((v) => (this.grantSteps = v));
    this.dataService.getDonorSteps().subscribe((v) => (this.donorSteps = v));
    this.dataService.getGwiData().subscribe((v) => (this.gwi = v));
    this.dataService.getHeroHighlights().subscribe((v) => (this.heroHighlights = v));
    this.dataService.getHeroStats().subscribe((v) => (this.heroStats = v));

    this.dataService.getDonutSegments().subscribe((segments: DonutSegment[]) => {
      let offset = 0;
      this.donutPaths = segments.map((s) => {
        const dash = s.pct * this.circ;
        const gap = this.circ - dash;
        const path: DonutPath = { dash, gap, offset, color: s.color };
        offset += dash;
        return path;
      });
    });
  }

  getOffset(offset: number): number {
    return -offset + this.circ * 0.25;
  }

  get activeContent(): TabContent | null {
    return this.contentMap ? this.contentMap[this.activeTab] : null;
  }

  setTab(id: TabId): void {
    this.activeTab = id;
  }
  get visibleFocusAreas(): string[] {
    return this.focusAreasMaster.slice(0, this.visibleFocusCount);
  }
  get hasMoreFocusAreas(): boolean {
    return this.visibleFocusCount < this.focusAreasMaster.length;
  }
  showMoreFocusAreas(): void {
    this.visibleFocusCount = Math.min(
      this.visibleFocusCount + this.PAGE_SIZE,
      this.focusAreasMaster.length,
    );
  }

  get visibleCountries(): string[] {
    return this.countriesMaster.slice(0, this.visibleCountryCount);
  }
  get hasMoreCountries(): boolean {
    return this.visibleCountryCount < this.countriesMaster.length;
  }
  showMoreCountries(): void {
    this.visibleCountryCount = Math.min(
      this.visibleCountryCount + this.PAGE_SIZE,
      this.countriesMaster.length,
    );
  }

  isFocusDisabled(tag: string): boolean {
    return (
      this.selectedFocusAreas.length >= this.MAX_FOCUS_AREAS &&
      !this.selectedFocusAreas.includes(tag)
    );
  }

  toggleFocus(tag: string): void {
    const idx = this.selectedFocusAreas.indexOf(tag);
    if (idx > -1) {
      this.selectedFocusAreas.splice(idx, 1);
    } else if (this.selectedFocusAreas.length < this.MAX_FOCUS_AREAS) {
      this.selectedFocusAreas.push(tag);
    }
  }

  toggleCountry(c: string): void {
    if (c === 'All Countries') {
      this.selectedCountries = this.selectedCountries.includes('All Countries')
        ? []
        : ['All Countries'];
      return;
    }
    this.selectedCountries = this.selectedCountries.filter((x) => x !== 'All Countries');
    const idx = this.selectedCountries.indexOf(c);
    if (idx > -1) {
      this.selectedCountries.splice(idx, 1);
    } else {
      this.selectedCountries.push(c);
    }
  }

  clearAll(): void {
    this.query = '';
    this.selectedFocusAreas = [];
    this.selectedCountries = [];
  }

  get hasFilters(): boolean {
    return !!(
      this.query ||
      this.selectedFocusAreas.length ||
      (this.selectedCountries.length && !this.selectedCountries.includes('All Countries'))
    );
  }

  get filtered(): Funder[] {
    const q = this.query.toLowerCase().trim();
    return this.allFunders.filter((f) => {
      const matchQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.area.toLowerCase().includes(q) ||
        f.range.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q));

      const matchFocus =
        !this.selectedFocusAreas.length ||
        this.selectedFocusAreas.some((sf) => f.focus.includes(sf));

      const matchCountry =
        !this.selectedCountries.length ||
        this.selectedCountries.includes('All Countries') ||
        this.selectedCountries.some(
          (c) => f.state === c || f.state === 'National' || f.tags.includes(c),
        );

      return matchQuery && matchFocus && matchCountry;
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  get featured(): Testimonial {
    return this.testimonials[this.currentIndex];
  }

  get visibleCards(): Testimonial[] {
    return this.testimonials.filter((_, i) => i !== this.currentIndex).slice(0, 3);
  }

  next(): void {
    this.go((this.currentIndex + 1) % this.testimonials.length);
    this.resetTimer();
  }

  prev(): void {
    this.go((this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length);
    this.resetTimer();
  }

  private go(index: number): void {
    this.currentIndex = index;
    this.triggerAnim();
  }

  private triggerAnim(): void {
    this.animating = false;
    setTimeout(() => (this.animating = true), 10);
    setTimeout(() => (this.animating = false), 400);
  }

  private startTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.ngZone.run(() => {
          this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
          this.triggerAnim();
        });
      }, 9000);
    });
  }
  private resetTimer(): void {
    clearInterval(this.timer);
    setTimeout(() => this.startTimer(), 8000);
  }
}
