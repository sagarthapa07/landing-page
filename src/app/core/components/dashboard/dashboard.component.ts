import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor } from '@angular/common';
import { GrantCarouselComponent } from "../grant-carousel/grant-carousel.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, NgFor, GrantCarouselComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly r = 34;
  readonly circ = 2 * Math.PI * 34;

  readonly segments = [
    { pct: 0.42, color: '#0095C0' },
    { pct: 0.28, color: '#00C7FF' },
    { pct: 0.18, color: '#198754' },
    { pct: 0.12, color: '#DEE2E6' },
  ];

  donutPaths: { dash: number; gap: number; offset: number; color: string }[] = [];

  readonly sidebarItems = [
    'Tracker',
    'Matches',
    'Peers',
    'Awards',
    'Calendar',
    'Task',
    'Reports',
    'Documents',
    'Projects',
  ];

  readonly statTiles = [
    { label: 'Active Grants', val: '24', delta: '+3 this mo' },
    { label: 'Awarded YTD', val: '$382K', delta: '+12%' },
    { label: 'Win Rate', val: '68%', delta: '+4pts' },
  ];

  readonly tableRows = [
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
  ];

  readonly chartLegend = [
    { label: 'Won', color: '#0095C0' },
    { label: 'Pending', color: '#00C7FF' },
    { label: 'Other', color: '#198754' },
  ];

  readonly stars = [1, 2, 3, 4, 5];

  readonly orgs = [
    'UNITED WAY',
    'BOYS & GIRLS CLUB',
    'HABITAT FOR HUMANITY',
    'RED CROSS',
    'YMCA',
    'SALVATION ARMY',
    'GOODWILL',
  ];

  readonly features = [
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
  ];

  // Doubled for seamless infinite loop — same trick as React marquee
  readonly featuresDoubled = [...this.features, ...this.features];

  readonly stats = [
    { value: '400K+', label: 'Active grants indexed' },
    { value: '98%', label: 'Match accuracy rate' },
    { value: '2.4×', label: 'More grants discovered' },
    { value: '60%', label: 'Less time on research' },
  ];
  
  ngOnInit(): void {
    let offset = 0;
    this.donutPaths = this.segments.map((s) => {
      const dash = s.pct * this.circ;
      const gap = this.circ - dash;
      const path = { dash, gap, offset, color: s.color };
      offset += dash;
      return path;
    });
  }

  getOffset(offset: number): number {
    return -offset + this.circ * 0.25;
  }
}
