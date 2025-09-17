# Automation Testing Website - Copilot Instructions

This project is a comprehensive website for automation testing built with Next.js, TypeScript, and shadcn/ui.

## Project Overview
- **Purpose**: Create a realistic website for testing Selenium automation
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Architecture**: SOLID principles with clean component structure
- **Testing Focus**: Multiple pages with complex interactions without automation-friendly IDs

## Development Guidelines
- Use semantic HTML elements and proper accessibility attributes
- Implement realistic form validation and error handling
- Create dynamic content that changes based on user interactions
- Avoid adding `id` attributes or other automation-friendly selectors
- Focus on real-world user flows and interactions

## Pages Structure
1. Homepage - Landing page with navigation
2. Forms - Various input types and validation
3. Tables & Data - Sortable tables, filters, pagination
4. Modals & Dialogs - Popups, confirmations, alerts
5. Authentication - Login, register, password reset
6. E-commerce - Product listing, cart, checkout
7. Interactive Elements - Drag-drop, sliders, file uploads

## Component Architecture
- Reusable UI components in `/components/ui`
- Page-specific components in `/components/pages`
- Shared utilities in `/lib`
- Type definitions in `/types`
