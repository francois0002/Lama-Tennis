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

  onJoinClub(): void {
    this.dialogRef.close();
    window.location.href = '/home/join-club'; // Redirige l'utilisateur vers la page de join club
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
