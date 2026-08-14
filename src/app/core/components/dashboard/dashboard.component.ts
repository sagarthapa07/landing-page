import { Component, OnInit } from '@angular/core';
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
} from '../../../dataType';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, NgFor, GrantCarouselComponent, NgIf],
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

  // ── Sirf UI state ──────────────────────────────────────────────
  readonly stars = [1, 2, 3, 4, 5];
  activeTab: TabId = 'discover';

  gwi: GwiData | null = null;

  constructor(private dataService: DataService) {}

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
}
