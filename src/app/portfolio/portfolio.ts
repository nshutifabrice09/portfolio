import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.css']
})
export class Portfolio {
  activeSection = 'about';
  contactForm: FormGroup;
  submitted = false;
  success = false;
  error = false;
  sending = false;
  errorMessage = '';
  
  projects = [
    {
      title: "E-Commerce Platform",
      tech: "Angular, TypeScript, RxJS",
      description: "Full-stack shopping experience with real-time inventory management and payment integration",
      year: "2024",
      link: "https://github.com/yourusername/project1"
    },
    {
      title: "Analytics Dashboard",
      tech: "Angular, D3.js, Material",
      description: "Interactive data visualization dashboard for enterprise metrics and KPIs",
      year: "2024",
      link: "https://github.com/yourusername/project2"
    },
    {
      title: "Mobile Banking App",
      tech: "Ionic, Angular, Firebase",
      description: "Secure financial management application with biometric authentication",
      year: "2023",
      link: "https://github.com/yourusername/project3"
    },
    {
      title: "Task Management System",
      tech: "Angular, NgRx, Node.js",
      description: "Collaborative project management tool with real-time updates",
      year: "2023",
      link: "https://github.com/yourusername/project4"
    }
  ];

  skills = [
    { category: "Programming Languages", items: ["Java", "Python", "JavaScript", "C/C++"]},
    { category: "Frameworks", items: ["Spring Boot", "Nest.js", "Django", "Angular"]},
    { category: "Databases", items: ["PostgreSQL", "MongoDB", "Firebase", "MySQL"]},
    { category: "Cloud Tools and Platforms", items: ["Docker", "AWS", "DigitalOcean"]},
    { category: "DevOps Appliance", items: ["Git Bash", "GitHub Actions", "Linux/Shell Scripting", "Postman"]},
  ];

  experience = [
    {
      role: "Senior Frontend Developer",
      company: "Tech Company",
      period: "2022 - Present",
      description: "Leading development of enterprise Angular applications, mentoring junior developers"
    },
    {
      role: "Frontend Developer",
      company: "Digital Agency",
      period: "2020 - 2022",
      description: "Built responsive web applications and improved performance by 40%"
    },
    {
      role: "Junior Developer",
      company: "Startup Inc",
      period: "2019 - 2020",
      description: "Developed features for SaaS platform using Angular and TypeScript"
    }
  ];

  currentYear = new Date().getFullYear();
  yearsExperience = this.currentYear - 2019;

  // EmailJS Configuration
  private emailJSConfig = {
    serviceID: 'service_xmx86xn',
    templateID: 'template_niuaaq9',
    publicKey: 'nJNRFnnODkQm_mDiH'
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Initialize EmailJS with your public key
    emailjs.init(this.emailJSConfig.publicKey);
  }

  get f() {
    return this.contactForm.controls;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.error = false;
    this.success = false;
    this.errorMessage = '';

    console.log('=== FORM SUBMISSION START ===');
    console.log('Form Valid?', this.contactForm.valid);
    console.log('Form Values:', this.contactForm.value);

    if (this.contactForm.invalid) {
      console.log('Form is invalid, stopping.');
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        if (control?.invalid) {
          console.log(`${key} is invalid:`, control.errors);
        }
      });
      return;
    }

    this.sending = true;
    console.log('Starting email send...');

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        to_email: 'niyonzimanshuti@outlook.com' // Your email
      };

      console.log('Template Params:', templateParams);
      console.log('Service ID:', this.emailJSConfig.serviceID);
      console.log('Template ID:', this.emailJSConfig.templateID);

      // Send email using EmailJS
      const response = await emailjs.send(
        this.emailJSConfig.serviceID,
        this.emailJSConfig.templateID,
        templateParams
      );

      console.log('✅ SUCCESS! Email sent:', response);
      console.log('Response status:', response.status);
      console.log('Response text:', response.text);
      
      // Show success message
      this.success = true;
      this.sending = false;
      
      // Reset form after 4 seconds
      setTimeout(() => {
        this.contactForm.reset();
        this.submitted = false;
        this.success = false;
      }, 4000);

    } catch (error: any) {
      console.error('❌ ERROR! Email sending failed:', error);
      console.error('Error details:', {
        status: error?.status,
        text: error?.text,
        message: error?.message
      });
      
      this.error = true;
      this.sending = false;
      
      // Set user-friendly error message
      if (error?.text) {
        this.errorMessage = `Error: ${error.text}`;
      } else if (error?.message) {
        this.errorMessage = `Error: ${error.message}`;
      } else {
        this.errorMessage = 'Failed to send message. Please try again or email me directly at nshuti.fabrice09@gmail.com';
      }
    }
  }
}