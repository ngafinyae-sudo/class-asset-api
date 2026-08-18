import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(): void {

    console.log('Username:', this.username);
    console.log('Password:', this.password);

    const data = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(
      'http://localhost/class-asset-api/login.php',
      data
    ).subscribe({

      next: (response) => {

        console.log('PHP RESPONSE:', response);

        if (response.success === true) {

          localStorage.setItem(
            'user',
            JSON.stringify(response.user)
          );

          this.router.navigate(['/dashboard']);

        } else {

          alert(response.message);

        }
      },

     error: (error) => {

  console.log('STATUS:', error.status);
  console.log('STATUS TEXT:', error.statusText);
  console.log('URL:', error.url);
  console.log('ERROR BODY:', error.error);
  console.log('MESSAGE:', error.message);
  console.log('FULL ERROR:', error);

  alert('Error status: ' + error.status);
}

    });
  }
}