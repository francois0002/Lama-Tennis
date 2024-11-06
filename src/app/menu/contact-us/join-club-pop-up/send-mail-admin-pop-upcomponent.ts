import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'send-mail-admin-pop-up',
  templateUrl: './send-mail-admin-pop-up.component.html',
  styleUrl: './send-mail-admin-pop-up.component.css',
  standalone: true,
})
export class SendMailAdminDialogComponent {

  constructor(public dialogRef: MatDialogRef<SendMailAdminDialogComponent>) {}

  onHome(): void {
    this.dialogRef.close();
    window.location.href = '/home/';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
