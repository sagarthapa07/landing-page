import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { DataService } from '../../services/data.service';
import { HeroHighlight, HeroStat } from '../../../dataType';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements OnInit {
  heroHighlights: HeroHighlight[] = [];
  heroStats: HeroStat[] = [];
  orgs: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getHeroHighlights().subscribe((v) => (this.heroHighlights = v));
    this.dataService.getHeroStats().subscribe((v) => (this.heroStats = v));
    this.dataService.getOrgs().subscribe((v) => (this.orgs = v));
  }
}
