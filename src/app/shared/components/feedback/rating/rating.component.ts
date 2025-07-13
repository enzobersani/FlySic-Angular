import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Input() editable: boolean = false;
  @Input() size: number = 24;
  @Output() ratingChange = new EventEmitter<number>();

  hoveredIndex: number | null = null;

  get displayRating(): number {
    return this.hoveredIndex !== null ? this.hoveredIndex : this.rating;
  }

  get fullStars(): number[] {
    return Array(Math.floor(this.displayRating)).fill(0);
  }

  get hasHalfStar(): boolean {
    return this.displayRating % 1 >= 0.5;
  }

  get emptyStars(): number[] {
    const total = 5;
    const full = Math.floor(this.displayRating);
    const half = this.hasHalfStar ? 1 : 0;
    return Array(total - full - half).fill(0);
  }

  setRating(index: number) {
    if (this.editable) {
      this.rating = index;
      this.ratingChange.emit(this.rating);
    }
  }

  onMouseEnter(index: number) {
    if (this.editable) {
      this.hoveredIndex = index;
    }
  }

  onMouseLeave() {
    if (this.editable) {
      this.hoveredIndex = null;
    }
  }
}
