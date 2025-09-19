import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';               

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  notes: Array<{ id: number; title: string }> = [];

  constructor(private http: HttpClient, private router: Router) {}  

  getNotes() {
    if (!this.username || !this.password) {
      alert('Önce kullanıcı adı ve şifre girin');
      return;
    }
    const token = btoa(`${this.username}:${this.password}`);
    const headers = new HttpHeaders({ Authorization: `Basic ${token}` });

    this.http.get<Array<{ id: number; title: string }>>(
      'http://localhost:8080/api/notes',
      { headers }
    ).subscribe({
      next: (data) => {
        this.notes = data;
        localStorage.setItem('authToken', token);
        this.router.navigateByUrl('/notes');          
      },
      error: () => alert('Giriş hatalı veya yetkiniz yok (401).')
    });
  }
}
