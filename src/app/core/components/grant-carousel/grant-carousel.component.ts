import { Component, OnInit, OnDestroy, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { forkJoin } from 'rxjs';
import { DataService } from '../../services/data.service';
import { MetaField, ShowcaseCard } from '../../../dataType';

@Component({
  selector: 'app-grant-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grant-carousel.component.html',
  styleUrl: './grant-carousel.component.scss',
  animations: [
    trigger('cardEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(28px)' }),
        animate(
          '380ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),
  ],
})
export class GrantCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  activeTab: 'grants' | 'resources' = 'grants';

  grantStart = 0;
  resStart = 0;

  // Har transition (arrow click, dot click, ya auto-timer) par increment hota hai.
  // trackBy isko use karta hai taaki Angular purane card element destroy karke
  // naya bana de — isi se :enter animation trigger hota hai.
  private animKey = 0;

  private platformId = inject(PLATFORM_ID);
  private timer: any;
  private resumeTimeout: any;
  private resizeDebounce: any;
  private resizeObserver?: ResizeObserver;

  // Ab yeh FIXED nahi hai — screen width ke hisaab se change hota hai.
  VISIBLE_COUNT = 4;

  // ── DataService se aane wala data ─────────────────────────────
  stats: { icon: string; value: string; label: string; bg: string }[] = [];
  grantCards: ShowcaseCard[] = [];
  resourceCards: ShowcaseCard[] = [];

  constructor(private dataService: DataService) {}

  // FIX: pehle sirf window 'resize' event pe recalculate hota tha — lekin
  // page ki height data load hone ke baad badalti hai (cards + stats bar
  // add hote hain), jisse scrollbar aa jaata hai aur document ka clientWidth
  // ghat jaata hai — bina kisi window resize ke. Us case mein VISIBLE_COUNT
  // stale reh jaata tha (load pe 4 hi rehta, jabki CSS grid 3 columns ki thi
  // → 4th card neeche wrap ho jaata tha).
  //
  // ResizeObserver seedha <html> element ka size observe karta hai, isliye
  // yeh window resize AUR content-load-ki-wajah-se-scrollbar-aana, dono
  // cases mein automatically fire hota hai.
  private startResizeObserver(): void {
    if (!isPlatformBrowser(this.platformId) || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver(() => {
      clearTimeout(this.resizeDebounce);
      this.resizeDebounce = setTimeout(() => {
        const prev = this.VISIBLE_COUNT;
        this.updateVisibleCount();
        // Sirf tab hi cards re-key karo jab count actually badla ho —
        // warna har resize par animation bewajah replay hoga.
        if (prev !== this.VISIBLE_COUNT) {
          this.animKey++;
        }
      }, 120);
    });
    this.resizeObserver.observe(document.documentElement);
  }

  private updateVisibleCount(): void {
    // FIX: window.innerWidth scrollbar ki width bhi include karta hai,
    // jabki SCSS ke @media queries actual CSS viewport width (scrollbar minus)
    // ke against evaluate hote hain — jo document.documentElement.clientWidth
    // deta hai. innerWidth use karne se boundary (~1400px, ~1100px) ke paas
    // JS aur CSS ek doosre se disagree kar jaate the — isi wajah se load pe
    // 4 cards render hote the jabki grid sirf 3 columns dikha raha tha.
    const w = document.documentElement.clientWidth;
    if (w > 1400) {
      this.VISIBLE_COUNT = 4; // large desktop
    } else if (w > 1100) {
      this.VISIBLE_COUNT = 3; // laptop
    } else {
      this.VISIBLE_COUNT = 2; // tablet se mobile tak — hamesha 2, size CSS mein chota
    }
  }

  get activeList(): ShowcaseCard[] {
    return this.activeTab === 'grants' ? this.grantCards : this.resourceCards;
  }

  get activeStart(): number {
    return this.activeTab === 'grants' ? this.grantStart : this.resStart;
  }

  get visibleCards(): ShowcaseCard[] {
    const list = this.activeList;
    if (!list.length) return [];
    const count = Math.min(this.VISIBLE_COUNT, list.length);
    const start = this.activeStart;
    const out: ShowcaseCard[] = [];
    for (let i = 0; i < count; i++) {
      out.push(list[(start + i) % list.length]);
    }
    return out;
  }

  // trackBy: index + animKey — isliye har transition par Angular naye
  // DOM elements banata hai aur cardEnter animation trigger hoti hai.
  trackByCard(index: number, _card: ShowcaseCard): string {
    return `${index}-${this.animKey}`;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleCount();
    }

    forkJoin({
      grants: this.dataService.getGrants(),
      resources: this.dataService.getResources(),
      stats: this.dataService.getCarouselStats(),
    }).subscribe(({ grants, resources, stats }) => {
      // ── Normalized cards, dono tabs ka ek hi shape mein ──────
      this.grantCards = grants.map((g) => ({
        category: g.category,
        categoryColor: g.categoryColor,
        categoryBg: g.categoryBg,
        badgeRight: `${g.match} match`,
        badgeRightIsMatch: true,
        title: g.name,
        subtitle: g.funder,
        description: g.description,
        meta: [
          { icon: '💰', label: 'AWARD AMOUNT', value: g.amount },
          { icon: '📅', label: 'DEADLINE', value: g.deadline },
          { icon: '📍', label: 'LOCATION', value: g.location },
        ] as MetaField[],
        primaryBtnLabel: 'View full grant details',
        secondaryBtnLabel: 'Save to Calender',
      }));

      this.resourceCards = resources.map((r) => ({
        category: r.category,
        categoryColor: r.categoryColor,
        categoryBg: r.categoryBg,
        badgeRight: r.type,
        badgeRightIsMatch: false,
        title: r.title,
        subtitle: r.author,
        description: r.description,
        meta: [
          { icon: '⏱️', label: 'READ TIME', value: r.readTime },
          { icon: '📆', label: 'PUBLISHED', value: r.published },
          { icon: '🏷️', label: 'TOPIC', value: r.topic },
        ] as MetaField[],
        primaryBtnLabel: 'Read full article',
        secondaryBtnLabel: 'Save to library',
      }));

      this.stats = stats;

      if (isPlatformBrowser(this.platformId)) {
        // FIX: data set hone ke turant baad DOM update hone se pehle recompute
        // karna kaafi nahi — ek frame wait karo taaki cards + stats bar render
        // ho jayein aur scrollbar (agar aana hai) aa jaye, USKE BAAD width
        // measure karo. Warna VISIBLE_COUNT wahi purana (pre-scrollbar) reh
        // jaata hai.
        requestAnimationFrame(() => {
          const prev = this.VISIBLE_COUNT;
          this.updateVisibleCount();
          if (prev !== this.VISIBLE_COUNT) {
            this.animKey++;
          }
        });

        // Data aane ke baad hi timer start karo, warna length 0 pe hi timer chalu ho jayega
        this.startTimer();
      }
    });
  }

  ngAfterViewInit(): void {
    this.startResizeObserver();
  }

  ngOnDestroy(): void {
    this.clearTimer();
    clearTimeout(this.resumeTimeout);
    clearTimeout(this.resizeDebounce);
    this.resizeObserver?.disconnect();
  }

  setTab(tab: 'grants' | 'resources'): void {
    if (this.activeTab === tab) return;
    this.activeTab = tab;
    this.animKey++;
    this.clearTimer();
    this.startTimer();
  }

  next(): void {
    if (!this.activeList.length) return;
    this.goTo(this.activeStart + 1);
  }
  prev(): void {
    if (!this.activeList.length) return;
    this.goTo(this.activeStart - 1 + this.activeList.length);
  }
  goTo(i: number): void {
    if (!this.activeList.length) return;
    const wrapped = i % this.activeList.length;
    if (this.activeTab === 'grants') {
      this.grantStart = wrapped;
    } else {
      this.resStart = wrapped;
    }
    this.animKey++;
    this.clearTimer();
    clearTimeout(this.resumeTimeout);
    this.resumeTimeout = setTimeout(() => this.startTimer(), 8000);
  }

  private startTimer(): void {
    this.clearTimer();
    if (!this.grantCards.length && !this.resourceCards.length) return;
    this.timer = setInterval(() => {
      if (this.activeTab === 'grants' && this.grantCards.length) {
        this.grantStart = (this.grantStart + 1) % this.grantCards.length;
      } else if (this.resourceCards.length) {
        this.resStart = (this.resStart + 1) % this.resourceCards.length;
      }
      this.animKey++;
    }, 5000);
  }

  private clearTimer(): void {
    if (this.timer) clearInterval(this.timer);
  }
}
