import { Component } from '@angular/core';

@Component({
  selector: 'app-calendulum-demo',
  standalone: false,
  templateUrl: './calendulum-demo.component.html',
  styleUrl: './calendulum-demo.component.scss'
})
export class CalendulumDemoComponent {
  currentDate = new Date();
  selectedDate: Date | null = null;
  viewDate = new Date();

  get monthName(): string {
    return this.viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  get daysInMonth(): number {
    return new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0).getDate();
  }

  get firstDayOfWeek(): number {
    return new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1).getDay();
  }

  get calendarDays(): (number | null)[] {
    const days: (number | null)[] = [];
    for (let i = 0; i < this.firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= this.daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }

  prevMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  nextMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }

  selectDay(day: number) {
    this.selectedDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), day);
  }

  isToday(day: number): boolean {
    return (
      day === this.currentDate.getDate() &&
      this.viewDate.getMonth() === this.currentDate.getMonth() &&
      this.viewDate.getFullYear() === this.currentDate.getFullYear()
    );
  }

  isSelected(day: number): boolean {
    if (!this.selectedDate) return false;
    return (
      day === this.selectedDate.getDate() &&
      this.viewDate.getMonth() === this.selectedDate.getMonth() &&
      this.viewDate.getFullYear() === this.selectedDate.getFullYear()
    );
  }
}
