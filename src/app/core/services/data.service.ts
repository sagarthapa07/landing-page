import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  GrantRaw,
  ResourceRaw,
  CarouselStat,
  PlatformFeature,
  PipelineStep,
  ActionItem,
  GwiData,
  HeroHighlight,
  HeroStat,
} from '../../dataType';

import {
  ActivityItem,
  ChartLegendItem,
  CommentItem,
  DonutSegment,
  FeaturePill,
  ManageStat,
  PipelineItem,
  StatCard,
  StatTile,
  TabContent,
  TabDefinition,
  TabId,
  TableRow,
} from '../../dataType';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  getSidebarItems(): Observable<string[]> {
    return of([
      'Tracker',
      'Matches',
      'Peers',
      'Awards',
      'Calendar',
      'Task',
      'Reports',
      'Documents',
      'Projects',
    ]);
  }

  getStatTiles(): Observable<StatTile[]> {
    return of([
      { label: 'Active Grants', val: '24', delta: '+3 this mo' },
      { label: 'Awarded YTD', val: '$382K', delta: '+12%' },
      { label: 'Win Rate', val: '68%', delta: '+4pts' },
    ]);
  }

  getTableRows(): Observable<TableRow[]> {
    return of([
      {
        name: 'Robert Wood Johnson Foundation',
        stage: 'In Review',
        amt: '$75K',
        color: '#C07800',
        bg: '#FFF3CD',
      },
      {
        name: 'Kresge Foundation — Arts',
        stage: 'Submitted',
        amt: '$50K',
        color: '#0095C0',
        bg: '#E7F9FF',
      },
      {
        name: 'Annie E. Casey Foundation',
        stage: 'Awarded',
        amt: '$120K',
        color: '#198754',
        bg: '#D1E7DD',
      },
      {
        name: 'MacArthur Fellows Program',
        stage: 'Drafting',
        amt: '$25K',
        color: '#6C757D',
        bg: '#F3F4F6',
      },
    ]);
  }

  getChartLegend(): Observable<ChartLegendItem[]> {
    return of([
      { label: 'Won', color: '#0095C0' },
      { label: 'Pending', color: '#00C7FF' },
      { label: 'Other', color: '#198754' },
    ]);
  }

  getDonutSegments(): Observable<DonutSegment[]> {
    return of([
      { pct: 0.42, color: '#0095C0' },
      { pct: 0.28, color: '#00C7FF' },
      { pct: 0.18, color: '#198754' },
      { pct: 0.12, color: '#DEE2E6' },
    ]);
  }

  getOrgs(): Observable<string[]> {
    return of([
      'UNITED WAY',
      'BOYS & GIRLS CLUB',
      'HABITAT FOR HUMANITY',
      'RED CROSS',
      'YMCA',
      'SALVATION ARMY',
      'GOODWILL',
    ]);
  }

  getFeaturePills(): Observable<FeaturePill[]> {
    return of([
      { icon: '⭐', iconBg: '#FFF8E1', label: 'Smart Funder Match Scoring' },
      { icon: '✅', iconBg: '#E8F5E9', label: 'Intelligent Eligibility Vetting' },
      { icon: '🔄', iconBg: '#E3F2FD', label: 'Auto-Updating Grant Pipelines' },
      { icon: '🤖', iconBg: '#F3E5F5', label: 'AI Narrative Suggestions' },
      { icon: '📅', iconBg: '#E0F7FA', label: 'Deadline Tracking' },
      { icon: '🔍', iconBg: '#E8F0FE', label: 'Pattern Detection' },
      { icon: '🎯', iconBg: '#FDE8F0', label: 'Grant Matching' },
      { icon: '📊', iconBg: '#E8F5E9', label: 'Automated 990 Data Analysis' },
      { icon: '🌐', iconBg: '#E3F2FD', label: 'Federal Grant Monitoring' },
      { icon: '💡', iconBg: '#FFF8E1', label: 'Funder Insight Reports' },
    ]);
  }

  getStatCards(): Observable<StatCard[]> {
    return of([
      { value: '400K+', label: 'Active grants indexed' },
      { value: '98%', label: 'Match accuracy rate' },
      { value: '2.4×', label: 'More grants discovered' },
      { value: '60%', label: 'Less time on research' },
    ]);
  }

  getTabs(): Observable<TabDefinition[]> {
    return of([
      { id: 'discover', label: 'Discover' },
      { id: 'apply', label: 'Apply' },
      { id: 'manage', label: 'Manage' },
      { id: 'collaborate', label: 'Collaborate' },
    ]);
  }

  getTabContent(): Observable<Record<TabId, TabContent>> {
    return of({
      discover: {
        headline: 'Find the right grants faster',
        sub: 'Our AI-powered discovery engine surfaces the most relevant grants from 400,000+ active opportunities, matched to your mission.',
        cta: 'Explore Discover features',
        features: [
          {
            title: 'Smart Matching:',
            desc: 'AI recommends grants based on your mission, location, and budget.',
          },
          {
            title: 'Real-time Alerts:',
            desc: 'Get notified the moment new relevant opportunities are added.',
          },
          {
            title: 'Advanced Filters:',
            desc: 'Filter by deadline, funder type, award amount, and more.',
          },
        ],
      },
      apply: {
        headline: 'Write stronger applications, faster',
        sub: 'AI-assisted narratives, collaborative editing, and smart checklists keep every application on track and on-brand.',
        cta: 'Explore Apply features',
        features: [
          {
            title: 'AI Writing Assistant:',
            desc: "Get context-aware suggestions tailored to each funder's priorities.",
          },
          {
            title: 'Progress Tracker:',
            desc: 'See completion status for every section at a glance.',
          },
          {
            title: 'Document Manager:',
            desc: 'Attach supporting docs, budgets, and 990s in one place.',
          },
        ],
      },
      manage: {
        headline: 'Manage your entire pipeline in one view',
        sub: 'Track deadlines, award status, and reporting requirements across every active grant — no spreadsheets required.',
        cta: 'Explore Manage features',
        features: [
          {
            title: 'Pipeline Dashboard:',
            desc: 'See all active applications and their current stages.',
          },
          {
            title: 'Deadline Reminders:',
            desc: 'Automated alerts before every submission and report deadline.',
          },
          {
            title: 'Budget Tracking:',
            desc: 'Monitor spend against awarded amounts in real time.',
          },
        ],
      },
      collaborate: {
        headline: 'Keep your whole team in sync',
        sub: 'Assign tasks, leave comments, and track contributions — so nothing falls through the cracks when working across departments.',
        cta: 'Explore Collaborate features',
        features: [
          {
            title: 'Role-based Access:',
            desc: 'Writers, reviewers, and admins each see what they need.',
          },
          {
            title: 'Threaded Comments:',
            desc: 'Comment directly on narratives, budgets, and documents.',
          },
          {
            title: 'Task Assignments:',
            desc: 'Assign and track action items with due dates and owners.',
          },
        ],
      },
    });
  }

  getPipeline(): Observable<PipelineItem[]> {
    return of([
      {
        name: 'Kresge Foundation',
        stage: 'In Review',
        color: '#C07800',
        bg: '#FFF3CD',
        amt: '$50K',
      },
      {
        name: 'MacArthur Fellows',
        stage: 'Submitted',
        color: '#0095C0',
        bg: '#E7F9FF',
        amt: '$95K',
      },
      { name: 'Annie E. Casey', stage: 'Awarded', color: '#198754', bg: '#D1E7DD', amt: '$120K' },
      {
        name: 'W.K. Kellogg Foundation',
        stage: 'Drafting',
        color: '#6C757D',
        bg: '#F3F4F6',
        amt: '$60K',
      },
    ]);
  }

  getManageStats(): Observable<ManageStat[]> {
    return of([
      { val: '12', label: 'Active grants', color: '#0095C0' },
      { val: '$382K', label: 'Awarded YTD', color: '#198754' },
      { val: '68%', label: 'Win rate', color: '#7B5EA7' },
      { val: '3', label: 'Due this week', color: '#C0560A' },
    ]);
  }

  getActivities(): Observable<ActivityItem[]> {
    return of([
      {
        initials: 'MR',
        name: 'Maria R.',
        action: 'uploaded budget draft for Kresge application',
        time: '2 min ago',
        color: '#0095C0',
      },
      {
        initials: 'JT',
        name: 'James T.',
        action: 'left a comment on the narrative section',
        time: '8 min ago',
        color: '#7B5EA7',
      },
      {
        initials: 'SL',
        name: 'Sarah L.',
        action: 'marked "Supporting Docs" complete',
        time: '15 min ago',
        color: '#198754',
      },
      {
        initials: 'DK',
        name: 'David K.',
        action: 'submitted MacArthur application',
        time: '1 hr ago',
        color: '#C0560A',
      },
    ]);
  }

  getComments(): Observable<CommentItem[]> {
    return of([
      {
        initials: 'JT',
        name: 'James T.',
        text: 'Can we strengthen the impact metrics in paragraph 3?',
        color: '#7B5EA7',
      },
      {
        initials: 'MR',
        name: 'Maria R.',
        text: "Good call — I'll pull our 2025 annual report data.",
        color: '#0095C0',
      },
    ]);
  }

  getGrants(): Observable<GrantRaw[]> {
    return of([
      {
        name: 'Community Arts & Education Initiative',
        funder: 'Robert Wood Johnson Foundation',
        description:
          'Funds community-based arts and education programs that build creative skills and civic engagement among underserved youth.',
        amount: '$75,000',
        deadline: 'Sep 15, 2026',
        category: 'ARTS & EDUCATION',
        categoryColor: '#7B5EA7',
        categoryBg: '#F3EEFF',
        match: '96%',
        location: 'National',
      },
      {
        name: 'Youth Workforce Development Program',
        funder: 'Annie E. Casey Foundation',
        description:
          'Supports innovative programs that prepare young people for success in the workforce through education, training, and career development.',
        amount: '$120,000',
        deadline: 'Oct 1, 2026',
        category: 'WORKFORCE',
        categoryColor: '#0095C0',
        categoryBg: '#E7F9FF',
        match: '91%',
        location: 'Multi-State',
      },
      {
        name: 'Environmental Justice Initiative',
        funder: 'Kresge Foundation',
        description:
          'Backs grassroots organizations addressing environmental hazards and climate resilience in underserved communities.',
        amount: '$50,000',
        deadline: 'Nov 30, 2026',
        category: 'ENVIRONMENT',
        categoryColor: '#198754',
        categoryBg: '#D1E7DD',
        match: '88%',
        location: 'Midwest',
      },
      {
        name: 'Digital Equity & Access Fund',
        funder: 'MacArthur Foundation',
        description:
          'Provides funding to close the digital divide by expanding broadband access and digital literacy programs for low-income households.',
        amount: '$95,000',
        deadline: 'Dec 15, 2026',
        category: 'TECHNOLOGY',
        categoryColor: '#C0560A',
        categoryBg: '#FFF0E8',
        match: '84%',
        location: 'National',
      },
      {
        name: 'Community Health Outreach Grant',
        funder: 'W.K. Kellogg Foundation',
        description:
          'Funds outreach programs that improve access to preventive healthcare services for underserved families and children.',
        amount: '$60,000',
        deadline: 'Jan 10, 2027',
        category: 'HEALTH',
        categoryColor: '#DC3545',
        categoryBg: '#F8D7DA',
        match: '79%',
        location: 'Southeast',
      },
    ]);
  }

  getResources(): Observable<ResourceRaw[]> {
    return of([
      {
        title: 'How to Write a Winning Grant Proposal in 2026',
        author: 'GrantFlow Editorial Team',
        description:
          'A step-by-step guide covering narrative structure, budget justification, and funder alignment strategies used by top-performing nonprofits.',
        category: 'GRANT WRITING',
        categoryColor: '#7B5EA7',
        categoryBg: '#F3EEFF',
        type: 'Guide',
        readTime: '8 min read',
        published: 'Jul 2026',
        topic: 'Proposal Writing',
      },
      {
        title: 'Understanding 990 Data: What Funders Look For',
        author: 'GrantFlow Research',
        description:
          'Learn how to read IRS Form 990 filings to assess funder capacity, giving patterns, and alignment with your mission before you apply.',
        category: 'FUNDER RESEARCH',
        categoryColor: '#0095C0',
        categoryBg: '#E7F9FF',
        type: 'Article',
        readTime: '6 min read',
        published: 'Jun 2026',
        topic: 'Due Diligence',
      },
      {
        title: 'Federal Grants 101: SAM.gov to Submission',
        author: 'Policy & Funding Team',
        description:
          'Everything nonprofits need to know about registering on SAM.gov, finding federal opportunities, and navigating Grants.gov submissions.',
        category: 'FEDERAL FUNDING',
        categoryColor: '#198754',
        categoryBg: '#D1E7DD',
        type: 'Tutorial',
        readTime: '12 min read',
        published: 'May 2026',
        topic: 'Federal Grants',
      },
      {
        title: 'Building a 12-Month Grant Calendar That Works',
        author: 'GrantFlow Editorial Team',
        description:
          'Stop missing deadlines. This template and walkthrough will help your team build a sustainable grant calendar with buffer time built in.',
        category: 'PLANNING',
        categoryColor: '#C0560A',
        categoryBg: '#FFF0E8',
        type: 'Template',
        readTime: '5 min read',
        published: 'Apr 2026',
        topic: 'Operations',
      },
    ]);
  }

  getCarouselStats(): Observable<CarouselStat[]> {
    return of([
      { icon: '📋', value: '10,000+', label: 'Active Grants', bg: 'var(--brand-primary-soft)' },
      { icon: '👥', value: '25,000+', label: 'Nonprofits Supported', bg: 'var(--success-bg)' },
      { icon: '✅', value: '98%', label: 'Match Accuracy', bg: 'var(--purple-bg)' },
      { icon: '⏱️', value: 'Save Hours', label: 'With Smart Matching', bg: 'var(--orange-bg)' },
    ]);
  }

  getActions(): Observable<ActionItem[]> {
    return of([
      { icon: '👥', label: 'Invite Members' },
      { icon: '✅', label: 'Assign Tasks' },
      { icon: '📊', label: 'Track Progress' },
      { icon: '💬', label: 'Comment & Share' },
    ]);
  }

  getGrantSteps(): Observable<PipelineStep[]> {
    return of([
      { label: 'Interest', color: '#6C63FF' },
      { label: 'Eligible', color: '#00B4D8' },
      { label: 'Calendar', color: '#0095C0' },
      { label: 'Write & Collab', color: '#0077A8' },
      { label: 'Review', color: '#56CFE1' },
      { label: 'Final', color: '#48CAE4' },
      { label: 'Submit', color: '#F4845F' },
      { label: 'Denied', color: '#E63946' },
      { label: 'Awarded', color: '#2DC653' },
      { label: 'Implement', color: '#198754' },
      { label: 'Report', color: '#F4A261' },
      { label: 'Post Award', color: '#212529' },
    ]);
  }

  getDonorSteps(): Observable<PipelineStep[]> {
    return of([
      { label: 'Interest', color: '#6C63FF' },
      { label: 'Qualify', color: '#00B4D8' },
      { label: 'Call', color: '#0095C0' },
      { label: 'Cultivate', color: '#0077A8' },
      { label: 'Ready', color: '#56CFE1' },
      { label: 'Proposal', color: '#48CAE4' },
      { label: 'Pending', color: '#F4845F' },
      { label: 'Declined', color: '#E63946' },
      { label: 'Gift', color: '#2DC653' },
      { label: 'Steward', color: '#198754' },
      { label: 'Renew', color: '#F4A261' },
      { label: 'Partner', color: '#212529' },
    ]);
  }

  getPlatformFeatures(): Observable<PlatformFeature[]> {
    return of([
      {
        icon: '🔍',
        iconBg: '#EAF4FE',
        title: 'Advanced Search',
        desc: 'Filter 400,000+ grants by amount, deadline, funder type, focus area, and geography in seconds.',
      },
      {
        icon: '🔔',
        iconBg: '#F3EEFF',
        title: 'Grant Alerts',
        desc: 'Receive instant notifications when new grants matching your profile are added to the database.',
      },
      {
        icon: '📄',
        iconBg: '#E8F8F0',
        title: 'Easy-to-Read Grant Pages',
        desc: 'Every grant has a structured profile — <span class="link">eligibility, past awards, funder priorities, and key dates</span> at a glance.',
      },
      {
        icon: '🏛️',
        iconBg: '#FFF4EC',
        title: 'Foundation Directory',
        desc: 'Explore deep profiles on 90,000+ foundations including IRS 990 data, giving history, and <span class="link">leadership</span>.',
      },
      {
        icon: '🎓',
        iconBg: '#E8F8F6',
        title: 'Expert Support',
        desc: 'Access live onboarding, a dedicated success manager, and a community of <span class="link">5,500+ grant professionals</span>.',
      },
      {
        icon: '📈',
        iconBg: '#E8F8F0',
        title: 'Success Tracking',
        desc: 'Measure win rates, pipeline health, and ROI across your entire portfolio with one-click <span class="link">reports</span>.',
      },
    ]);
  }

  getGwiData(): Observable<GwiData> {
    return of({
      title: 'GrantFlow Intelligence™',
      subtitle: 'Research Beyond Public Data',
      description:
        'Built on human-verified grants, IRS Form 990 records, and exclusive organization information shared directly with GrantWatch through claimed organization profiles.',
      checklist: [
        'Human-Verified Grants',
        'IRS Form 990 Intelligence',
        'Claimed Organization Profiles',
      ],
      tokensTitle: 'GWI Tokens Included',
      tokensDesc:
        "Receive GWI Tokens with eligible first-time MemberPlus+ subscriptions and by claiming your organization's official profile.",
      ctaLabel: 'Try GrantWatch Intelligence™',
    });
  }

  getHeroHighlights(): Observable<HeroHighlight[]> {
    return of([
      { icon: '🔍', title: 'Discover', desc: 'AI-powered grant matching' },
      { icon: '📁', title: 'Organize', desc: 'Manage applications with ease' },
      { icon: '🤝', title: 'Collaborate', desc: 'Work together in real time' },
      { icon: '📈', title: 'Win', desc: 'Track, analyze & improve outcomes' },
    ]);
  }

  getHeroStats(): Observable<HeroStat[]> {
    return of([
      {
        icon: '🏢',
        iconBg: 'rgba(0,149,192,0.1)',
        value: '5,500+',
        label: 'Organizations trust us',
      },
      { icon: '💲', iconBg: 'rgba(25,135,84,0.1)', value: '$1.1B+', label: 'In grants managed' },
      { icon: '🙂', iconBg: 'rgba(255,193,7,0.15)', value: '96%', label: 'Customer satisfaction' },
      { icon: '🛡️', iconBg: 'rgba(0,149,192,0.1)', value: 'SOC 2', label: 'Security compliant' },
    ]);
  }
}
