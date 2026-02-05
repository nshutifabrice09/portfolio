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

    emailjs.init(this.emailJSConfig.publicKey);
  }

  get f() {
    return this.contactForm.controls;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.error = false;
    this.success = false;
    this.errorMessage = '';

    if (this.contactForm.invalid) {
      return;
    }

    this.sending = true;

    try {
      const templateParams = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message
      };

      const response = await emailjs.send(
        this.emailJSConfig.serviceID,
        this.emailJSConfig.templateID,
        templateParams
      );

      console.log('✅ Email sent successfully!', response);
      
      this.success = true;
      this.sending = false;
      
      setTimeout(() => {
        this.contactForm.reset();
        this.submitted = false;
        this.success = false;
      }, 4000);

    } catch (error: any) {
      console.error('❌ Email failed:', error);
      this.error = true;
      this.sending = false;
      this.errorMessage = 'Failed to send message. Please try again or email me directly.';
    }
  }
}