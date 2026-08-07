import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-grant-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grant-carousel.component.html',
  styleUrl: './grant-carousel.component.scss',
})
export class GrantCarouselComponent {
  activeTab: 'grants' | 'resources' = 'grants';
  currentIndex = 0;
  currentResIndex = 0;
  animating = false;
  animKey = 0;
  private timer: any;
  private platformId = inject(PLATFORM_ID);

  readonly grants = [
    {
      name: 'Community Arts & Education Initiative',
      funder: 'Robert Wood Johnson Foundation',
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
      amount: '$60,000',
      deadline: 'Jan 10, 2027',
      category: 'HEALTH',
      categoryColor: '#DC3545',
      categoryBg: '#F8D7DA',
      match: '79%',
      location: 'Southeast',
    },
  ];

  readonly resources = [
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
  ];

  get currentGrant() {
    return this.grants[this.currentIndex];
  }
  get currentResource() {
    return this.resources[this.currentResIndex];
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTimer();
    }
  }
  ngOnDestroy(): void {
    this.clearTimer();
  }

  setTab(tab: 'grants' | 'resources'): void {
    this.activeTab = tab;
    this.clearTimer();
    this.startTimer();
  }

  // ── Grants navigation ──────────────────────────────────────────
  next(): void {
    this.goTo((this.currentIndex + 1) % this.grants.length);
  }
  prev(): void {
    this.goTo((this.currentIndex - 1 + this.grants.length) % this.grants.length);
  }
  goTo(i: number): void {
    this.currentIndex = i;
    this.triggerAnim();
    this.clearTimer();
    setTimeout(() => this.startTimer(), 8000);
  }

  // ── Resources navigation ───────────────────────────────────────
  nextRes(): void {
    this.goToRes((this.currentResIndex + 1) % this.resources.length);
  }
  prevRes(): void {
    this.goToRes((this.currentResIndex - 1 + this.resources.length) % this.resources.length);
  }
  goToRes(i: number): void {
    this.currentResIndex = i;
    this.triggerAnim();
    this.clearTimer();
    setTimeout(() => this.startTimer(), 8000);
  }

  private startTimer(): void {
    this.timer = setInterval(() => {
      if (this.activeTab === 'grants') {
        this.currentIndex = (this.currentIndex + 1) % this.grants.length;
      } else {
        this.currentResIndex = (this.currentResIndex + 1) % this.resources.length;
      }
      this.triggerAnim();
    }, 5000);
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private triggerAnim(): void {
    this.animating = false;
    this.animKey++;
    setTimeout(() => (this.animating = true), 10);
    setTimeout(() => (this.animating = false), 400);
  }
}
