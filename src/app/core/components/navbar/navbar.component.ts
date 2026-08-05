import { Component, HostListener } from '@angular/core';
 
interface NavItem {
  label: string;
  subLinks: string[];
  active: boolean;
}


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;
 
  subLinks: string[] = ['Overview', 'Features', 'Integrations', 'Changelog'];
 
  navItems: NavItem[] = [
    { label: 'Platform', subLinks: this.subLinks, active: false },
    { label: 'Pricing', subLinks: this.subLinks, active: false },
    { label: 'Grants Database', subLinks: this.subLinks, active: false },
    { label: 'Resources', subLinks: this.subLinks, active: false }
  ];
 
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 16;
  }
 
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
 
  openDropdown(item: NavItem): void {
    item.active = true;
  }
 
  closeDropdown(item: NavItem): void {
    item.active = false;
  }
}
