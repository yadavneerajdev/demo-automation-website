import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const testingSections = [
    {
      title: "Forms",
      description: "Test various form elements, validation, and submissions",
      href: "/forms" as const,
      features: [
        "Input fields",
        "Dropdowns",
        "Checkboxes",
        "File uploads",
        "Form validation",
      ],
    },
    {
      title: "Tables & Data",
      description: "Interactive tables with sorting, pagination, and filtering",
      href: "/tables" as const,
      features: [
        "Sortable columns",
        "Pagination",
        "Search & filters",
        "Data export",
        "Row actions",
      ],
    },
    {
      title: "Modals & Dialogs",
      description: "Various types of modal dialogs and popups",
      href: "/modals" as const,
      features: [
        "Confirmation dialogs",
        "Form modals",
        "Alert boxes",
        "Toast notifications",
        "Overlays",
      ],
    },
    {
      title: "Authentication",
      description: "Login, registration, and user management flows",
      href: "/auth" as const,
      features: [
        "Login forms",
        "Registration",
        "Password reset",
        "User profiles",
        "Access control",
      ],
    },
    {
      title: "E-commerce",
      description: "Shopping cart, product listings, and checkout process",
      href: "/shop" as const,
      features: [
        "Product catalog",
        "Shopping cart",
        "Checkout flow",
        "Order management",
        "Payment forms",
      ],
    },
    {
      title: "Interactive Elements",
      description: "Drag & drop, sliders, and dynamic components",
      href: "/interactive" as const,
      features: [
        "Drag & drop",
        "Sliders",
        "File uploads",
        "Dynamic content",
        "Real-time updates",
      ],
    },
    {
      title: "IFrame Testing",
      description: "Nested iframes and cross-frame interactions",
      href: "/iframes" as const,
      features: [
        "Simple iframes",
        "Nested iframes (3 levels)",
        "Cross-frame communication",
        "Dynamic iframe loading",
        "Multiple iframes",
      ],
    },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Automation Testing Site
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/forms">View Demo</Link>
              </Button>
              <Button asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Comprehensive
            <span className="text-blue-600"> Testing Website</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A complete website designed for Selenium automation testing.
            Practice with real-world components, forms, interactions, and
            workflows that you'll encounter in production applications.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button size="lg" asChild>
                <Link href="/forms">Start Testing</Link>
              </Button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button variant="outline" size="lg" asChild>
                <Link href="/interactive">Try Interactive</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Testing Sections
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testingSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {section.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <svg
                          className="h-4 w-4 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href={section.href}>Explore {section.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Use This Testing Site?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Real-World Elements
              </h3>
              <p className="text-gray-600">
                Components and interactions you'll find in actual production
                applications.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Realistic Testing
              </h3>
              <p className="text-gray-600">
                No automation-friendly IDs - practice finding elements like in
                real applications.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Comprehensive Testing
              </h3>
              <p className="text-gray-600">
                Complete coverage of all major web application patterns and
                interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
