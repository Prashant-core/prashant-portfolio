# Prashant Kumar - Personal Portfolio

This repository contains the source code for my professional portfolio website. Designed with a focus on minimalism and high performance, this site serves as a central hub for my technical projects, engineering capabilities, and professional experience in the Artificial Intelligence and Machine Learning domains.

**Live Demo:** [https://prashant-portfolio-nine.vercel.app/](https://prashant-portfolio-nine.vercel.app/)

## Visual Overview

The portfolio features a custom dual-video theme engine that smoothly transitions between a dark, space-oriented aesthetic and a clean, light geometric aesthetic.

### Dark Mode
![Dark Mode Theme](./dark-mode.png)

### Light Mode
![Light Mode Theme](./light-mode.png)

## Key Features

* **Dual-Video Theme Engine:** A custom-built theme toggle that dynamically crossfades between two distinct video backgrounds without interrupting playback or page performance.
* **Minimalist Architecture:** A typography-driven design utilizing the Inter font family, relying on solid colors, subtle glassmorphism, and structured grids rather than heavy UI components.
* **Dynamic Data Integration:** Live fetching and rendering of GitHub statistics, repositories, and contribution data using the GitHub REST API.
* **Compact Technical Showcase:** A highly organized, auto-fitting grid system to display technical proficiencies across languages, ML frameworks, data analytics tools, and backend infrastructure.
* **Responsive Design:** Fully fluid layout that adapts seamlessly across desktop, tablet, and mobile environments.

## Technical Stack

* **Backend:** Python, FastAPI
* **Frontend:** HTML5, CSS3 (Custom Variables & Grid/Flexbox layouts), Vanilla JavaScript
* **Animations:** Canvas API (Custom particle interactions), Intersection Observer API (Scroll reveals)
* **Deployment:** Vercel

## Project Structure

```text
PRASHANT-PORTFOLIO/
├── data/
│   ├── __pycache__/
│   └── portfolio_data.py
├── static/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   └── profile.jpg
│   ├── js/
│   │   └── animation.js
│   └── resume.pdf
├── templates/
│   ├── partials/
│   │   ├── about.html
│   │   ├── contact.html
│   │   ├── github.html
│   │   ├── hero.html
│   │   ├── projects.html
│   │   └── skills.html
│   ├── base.html
│   └── index.html
├── venv/
├── .env
├── .gitignore
├── dark-mode.png
├── light-mode.png
├── main.py
├── README.md
├── requirements.txt
└── vercel.json