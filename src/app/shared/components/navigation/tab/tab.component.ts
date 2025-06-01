import { AfterContentChecked, AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { Observable, startWith, delay, map } from 'rxjs';
import { TextTransformEnum } from './enum/text-transform.enum';
import { AsyncPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, AsyncPipe, NgTemplateOutlet],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent implements AfterContentInit, AfterContentChecked {
  @Input() headerTextTransform = TextTransformEnum.NONE;
  @Input() backgroundColorTransparent: boolean = true;
  @ContentChildren(TabItemComponent) tabs!: QueryList<TabItemComponent>;

  tabItems!: Observable<TabItemComponent[]>;
  activeTab!: TabItemComponent;
  itemsQuantity: number = 0;

  constructor() {}

  ngAfterContentInit(): void {
    this.tabItems = this.tabs.changes
      .pipe(startWith(''))
      .pipe(delay(0))
      .pipe(map(() => this.tabs.toArray()));

    this.tabItems.subscribe((item) => {
      this.itemsQuantity = item.length;
    });
  }

  ngAfterContentChecked() {
    if (!this.activeTab) {
      Promise.resolve().then(() => {
        this.activeTab = this.tabs.first;
      });
    }
  }

  selectTab(tabItem: TabItemComponent) {
    if (tabItem.preventClick) return;

    if (this.activeTab === tabItem) {
      return;
    }

    if (this.activeTab) {
      this.activeTab.isActive = false;
    }

    this.activeTab = tabItem;

    tabItem.isActive = true;
  }
}
