import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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
    // Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Form Data:', this.contactForm.value);
    
    // Simulate successful submission
    this.success = true;
    
    // Reset form after 3 seconds
    setTimeout(() => {
      this.contactForm.reset();
      this.submitted = false;
      this.success = false;
    }, 3000);
  }
}