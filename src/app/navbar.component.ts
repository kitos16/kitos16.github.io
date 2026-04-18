import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;
  isMenuOpen = false;
  isScrolled = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isDarkMode = savedTheme === 'dark';
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${theme}-theme.css`;
    }
  }
}