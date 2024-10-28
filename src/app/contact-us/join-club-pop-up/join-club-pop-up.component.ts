import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-join-club-pop-up',
  templateUrl: './join-club-pop-up.component.html',
  styleUrl: './join-club-pop-up.component.css',
  standalone: true,
})
export class JoinClubDialogComponent {

  constructor(public dialogRef: MatDialogRef<JoinClubDialogComponent>) {}

  onHome(): void {
    this.dialogRef.close();
    window.location.href = '/home/';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
