export type TabId = 'discover' | 'apply' | 'manage' | 'collaborate';

export interface StatTile {
  label: string;
  val: string;
  delta: string;
}

export interface TableRow {
  name: string;
  stage: string;
  amt: string;
  color: string;
  bg: string;
}

export interface ChartLegendItem {
  label: string;
  color: string;
}

export interface FeaturePill {
  icon: string;
  iconBg: string;
  label: string;
}

export interface StatCard {
  value: string;
  label: string;
}

export interface TabDefinition {
  id: TabId;
  label: string;
}

export interface FeatureListItem {
  title: string;
  desc: string;
}

export interface TabContent {
  headline: string;
  sub: string;
  cta: string;
  features: FeatureListItem[];
}

export interface PipelineItem {
  name: string;
  stage: string;
  color: string;
  bg: string;
  amt: string;
}

export interface ManageStat {
  val: string;
  label: string;
  color: string;
}

export interface ActivityItem {
  initials: string;
  name: string;
  action: string;
  time: string;
  color: string;
}

export interface CommentItem {
  initials: string;
  name: string;
  text: string;
  color: string;
}

export interface DonutSegment {
  pct: number;
  color: string;
}

export interface DonutPath {
  dash: number;
  gap: number;
  offset: number;
  color: string;
}

export interface MetaField {
  icon: string;
  label: string;
  value: string;
}

export interface GrantRaw {
  name: string;
  funder: string;
  description: string;
  amount: string;
  deadline: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  match: string;
  location: string;
}

export interface ResourceRaw {
  title: string;
  author: string;
  description: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  type: string;
  readTime: string;
  published: string;
  topic: string;
}

export interface CarouselStat {
  icon: string;
  value: string;
  label: string;
  bg: string;
}

export interface ShowcaseCard {
  category: string;
  categoryColor: string;
  categoryBg: string;
  badgeRight: string;
  badgeRightIsMatch: boolean;
  title: string;
  subtitle: string;
  description: string;
  meta: MetaField[];
  primaryBtnLabel: string;
  secondaryBtnLabel: string;
}
export interface ActionItem {
  icon: string;
  label: string;
}

export interface PipelineStep {
  label: string;
  color: string;
}

export interface PlatformFeature {
  icon: string;
  iconBg: string;
  title: string;
  desc: string;
}

export interface GwiData {
  title: string;
  subtitle: string;
  description: string;
  checklist: string[];
  tokensTitle: string;
  tokensDesc: string;
  ctaLabel: string;
}
