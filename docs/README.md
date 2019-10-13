---
home: true
heroImage: /home.png
title: a
actionText: Get Started →
actionLink: /guide/
features:
  - title: Feature-rich
    details: Typical templates for enterprise applications and various components
  - title: Best Practice
    details: Reasonable framework choice, good engineering practice
  - title: Up-to-date Technology Stack
    details: Development using latest version of Laravel, VueJS and other libraries
  - title: Powerful ACL
    details: Roles & permissions management with excellent UI
  - title: Globalization
    details: Built-in industry universal international solution
  - title: Easy to integrate
    details: The project works perfectly with any API-based Laravel projects
footer: MIT Licensed | Copyright © 2019 Tuan Duong
---

## Getting Started

```bash
# Clone the project with composer
composer create-project tuandm/laravue
cd laravue

# Migration and DB seeder (after changing your DB settings in .env)
php artisan migrate --seed

# Generate JWT secret key
php artisan jwt:secret

# Install dependency
yarn install

# develop
yarn run dev # or yarn run watch

# Start local development server
php artisan serve
```
