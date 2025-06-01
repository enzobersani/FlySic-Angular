import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationLockTypeEnum } from './consts/notification-lock-type.enum';

@Component({
  selector: 'app-notification-lock',
  standalone: true,
  imports: [NgIf, NgClass, AsyncPipe],
  templateUrl: './notification-lock.component.html',
  styleUrl: './notification-lock.component.scss'
})
export class NotificationLockComponent implements OnInit{
  @Input() showEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Input() type: string = NotificationLockTypeEnum.Success;
  @Input() showIcon: boolean = false;
  @Input() showCloseButton: boolean = false;
 
  constructor() { }
 
  ngOnInit(): void { }
 
  close() {
    this.showEvent.next(false);
  }
 
  getNgClassObjectByType(type: string) {
    var obj: any = {};
    obj[type] = true;
    return obj;
  }
}
