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
    { category: "Frontend", items: ["Angular", "TypeScript", "RxJS", "NgRx", "HTML5", "CSS3", "SASS"] },
    { category: "Backend", items: ["Node.js", "Express", "NestJS", "REST APIs", "GraphQL"] },
    { category: "Database", items: ["MongoDB", "PostgreSQL", "Firebase", "MySQL"] },
    { category: "Tools", items: ["Git", "Docker", "Jenkins", "AWS", "Azure"] }
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

  // EmailJS Configuration - REPLACE THESE WITH YOUR ACTUAL VALUES
  private emailJSConfig = {
    serviceID: 'service_xmx86xn',      // Replace with your Service ID
    templateID: 'template_niuaaq9',    // Replace with your Template ID
    publicKey: 'nJNRFnnODkQm_mDiH'       // Replace with your Public Key
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
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

    if (this.contactForm.invalid) {
      return;
    }

    this.sending = true;

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        this.emailJSConfig.serviceID,
        this.emailJSConfig.templateID,
        templateParams,
        this.emailJSConfig.publicKey
      );

      console.log('Email sent successfully!', response);
      
      // Show success message
      this.success = true;
      this.sending = false;
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.contactForm.reset();
        this.submitted = false;
        this.success = false;
      }, 3000);

    } catch (error) {
      console.error('Email sending failed:', error);
      this.error = true;
      this.sending = false;
    }
  }
}