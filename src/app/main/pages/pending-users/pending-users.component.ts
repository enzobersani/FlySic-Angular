import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InputTextComponent } from "../../../shared/components/forms/input-text/input-text.component";
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';

interface PendingUser {
  name: string;
  email: string;
  createdAt: Date;
}

@Component({
  selector: 'app-pending-users',
  standalone: true,
  imports: [
    InputTextComponent, NgFor
],
  templateUrl: './pending-users.component.html',
  styleUrl: './pending-users.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PendingUsersComponent implements OnInit{
  users = [
    { name: 'João Silva', email: 'joao@email.com', status: 'Pendente' },
    { name: 'Maria Oliveira', email: 'maria@email.com', status: 'Pendente' },
    { name: 'Carlos Santos', email: 'carlos@email.com', status: 'Pendente' }
  ];
  filteredUsers = [...this.users];
  filterForm = new UntypedFormGroup({
    filter: new UntypedFormControl('')
  });

  ngOnInit(): void {
    this.filterForm.get('filter')?.valueChanges.subscribe((value) => {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  onFilterChange(event: any): void {
    const value = event.target.value;
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase())
    );
  }

  approveUser(user: any): void {
    alert(`Usuário ${user.name} aprovado!`);
    // Lógica para aprovar o usuário
  }

  rejectUser(user: any): void {
    alert(`Usuário ${user.name} recusado!`);
    // Lógica para recusar o usuário
  }
}
