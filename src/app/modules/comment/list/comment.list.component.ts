import { Component, Self } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { CommentList } from '@blueriq/angular/dashboard';
import { Container } from '@blueriq/core';
import { dateFromNowHumanReadable } from '@shared/date/bq-date-parser';

@Component({
  selector: 'bq-comment-list',
  templateUrl: './comment.list.component.html',
  styleUrls: ['./comment.list.component.scss'],
  providers: [CommentList],
})
@BlueriqComponent({
  type: Container,
  selector: 'commentlist',
})
export class CommentListComponent {

  constructor(@Self() public readonly commentList: CommentList, private readonly session: BlueriqSession) {
  }

  dateToHumanReadableFormat(date: Date): string {
    return dateFromNowHumanReadable(date, this.session.localization);
  }
}
