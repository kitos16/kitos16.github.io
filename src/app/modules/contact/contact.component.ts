import { Component } from '@angular/core';

declare var emailjs: any;

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  sending = false;
  sent = false;
  error = '';

  constructor() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init('YOUR_PUBLIC_KEY');
    }
  }

  async sendMessage() {
    if (!this.name || !this.email || !this.message) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    this.sending = true;
    this.error = '';

    try {
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: this.name,
        from_email: this.email,
        message: this.message
      });
      this.sent = true;
      this.name = '';
      this.email = '';
      this.message = '';
    } catch (e) {
      this.error = 'Error al enviar. Intenta de nuevo.';
    } finally {
      this.sending = false;
    }
  }
}