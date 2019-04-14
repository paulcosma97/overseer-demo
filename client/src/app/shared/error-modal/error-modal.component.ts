import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements AfterViewInit {
  modal: ModalDirective;
  private message = 'asd';

  constructor(private modalService: ModalService) { }

  @ViewChildren(ModalDirective)
  set modals(list: QueryList<ModalDirective>) {
    this.modal = list.first;
  }

  ngAfterViewInit(): void {
    this.modalService.errorState$.subscribe(state => {
      state.open ? this.modal.show() : this.modal.hide();
      this.message = state.message;
    });
  }

}
