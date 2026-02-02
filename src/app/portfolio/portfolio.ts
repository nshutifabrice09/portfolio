import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.css']
})
export class Portfolio {
  activeSection = 'about';
  
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

  setActiveSection(section: string): void {
    this.activeSection = section;
  }
}