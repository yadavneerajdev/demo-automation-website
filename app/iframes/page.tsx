"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function IframePage() {
  const [mainMessage, setMainMessage] = useState("");
  const [mainFormData, setMainFormData] = useState({ name: "", email: "" });

  const handleMainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Main page form submitted: ${mainFormData.name} - ${mainFormData.email}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Automation Testing Site
              </Link>
              <span className="ml-4 text-gray-500">/</span>
              <span className="ml-4 text-gray-700">IFrame Testing</span>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">IFrame Testing</h1>
          <p className="mt-2 text-gray-600">
            Test iframe interactions, nested iframes, and cross-frame element
            handling
          </p>
        </div>

        <div className="space-y-8">
          <style jsx global>{`
            iframe {
              overflow: auto;
              scrolling: auto;
            }
          `}</style>
          {/* Main Page Elements */}
          <Card>
            <CardHeader>
              <CardTitle>Main Page Elements</CardTitle>
              <CardDescription>
                Elements on the main page (not in iframe)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Type a message for main page..."
                  value={mainMessage}
                  onChange={(e) => setMainMessage(e.target.value)}
                  data-testid="main-page-input"
                />
                <p
                  className="mt-2 text-sm text-gray-600"
                  data-testid="main-page-display"
                >
                  Main page message: {mainMessage}
                </p>
              </div>

              <form onSubmit={handleMainSubmit} className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={mainFormData.name}
                  onChange={(e) =>
                    setMainFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  data-testid="main-form-name"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={mainFormData.email}
                  onChange={(e) =>
                    setMainFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  data-testid="main-form-email"
                />
                <Button type="submit" data-testid="main-form-submit">
                  Submit Main Form
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Simple IFrame */}
          <Card>
            <CardHeader>
              <CardTitle>Simple IFrame</CardTitle>
              <CardDescription>Basic iframe with form elements</CardDescription>
            </CardHeader>
            <CardContent>
              <iframe
                src="/api/iframe/simple"
                width="100%"
                height="500"
                className="border-2 border-blue-200 rounded-lg shadow-sm"
                title="Simple IFrame"
                data-testid="simple-iframe"
                style={{ minHeight: "500px" }}
              />
            </CardContent>
          </Card>

          {/* Nested IFrame */}
          <Card>
            <CardHeader>
              <CardTitle>Nested IFrame (3 Levels Deep)</CardTitle>
              <CardDescription>
                IFrame containing another iframe (nested structure) - 3 levels
                deep with different colors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <iframe
                src="/api/iframe/nested"
                width="100%"
                height="800"
                className="border-2 border-orange-200 rounded-lg shadow-sm"
                title="Nested IFrame"
                data-testid="nested-iframe"
                style={{ minHeight: "800px" }}
              />
            </CardContent>
          </Card>

          {/* Multiple IFrames */}
          <Card>
            <CardHeader>
              <CardTitle>Multiple IFrames</CardTitle>
              <CardDescription>
                Multiple iframes on the same page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">IFrame 1 - Calculator</h4>
                  <iframe
                    src="/api/iframe/calculator"
                    width="100%"
                    height="450"
                    className="border-2 border-green-200 rounded-lg shadow-sm"
                    title="Calculator IFrame"
                    data-testid="calculator-iframe"
                    style={{ minHeight: "450px" }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">IFrame 2 - Todo List</h4>
                  <iframe
                    src="/api/iframe/todo"
                    width="100%"
                    height="450"
                    className="border-2 border-purple-200 rounded-lg shadow-sm"
                    title="Todo IFrame"
                    data-testid="todo-iframe"
                    style={{ minHeight: "450px" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cross-Frame Communication */}
          <Card>
            <CardHeader>
              <CardTitle>Cross-Frame Communication</CardTitle>
              <CardDescription>
                Test communication between main page and iframe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Message from IFrame:</h4>
                  <p id="iframe-message" data-testid="iframe-message-display">
                    No message received yet
                  </p>
                </div>
                <iframe
                  src="/api/iframe/communication"
                  width="100%"
                  height="350"
                  className="border-2 border-red-200 rounded-lg shadow-sm"
                  title="Communication IFrame"
                  data-testid="communication-iframe"
                  style={{ minHeight: "350px" }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Dynamic IFrame */}
          <Card>
            <CardHeader>
              <CardTitle>Dynamic IFrame</CardTitle>
              <CardDescription>
                Dynamically change iframe source
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={() => {
                      const iframe = document.getElementById(
                        "dynamic-iframe"
                      ) as HTMLIFrameElement;
                      if (iframe) iframe.src = "/api/iframe/simple";
                    }}
                    data-testid="load-simple-iframe"
                    size="sm"
                  >
                    Load Simple
                  </Button>
                  <Button
                    onClick={() => {
                      const iframe = document.getElementById(
                        "dynamic-iframe"
                      ) as HTMLIFrameElement;
                      if (iframe) iframe.src = "/api/iframe/calculator";
                    }}
                    data-testid="load-calculator-iframe"
                    size="sm"
                  >
                    Load Calculator
                  </Button>
                  <Button
                    onClick={() => {
                      const iframe = document.getElementById(
                        "dynamic-iframe"
                      ) as HTMLIFrameElement;
                      if (iframe) iframe.src = "/api/iframe/todo";
                    }}
                    data-testid="load-todo-iframe"
                    size="sm"
                  >
                    Load Todo
                  </Button>
                </div>
                <iframe
                  id="dynamic-iframe"
                  src="/api/iframe/simple"
                  width="100%"
                  height="500"
                  className="border-2 border-indigo-200 rounded-lg shadow-sm"
                  title="Dynamic IFrame"
                  data-testid="dynamic-iframe"
                  style={{ minHeight: "500px" }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          // Listen for messages from iframes
          window.addEventListener('message', function(event) {
            if (event.data.type === 'iframe-message') {
              const display = document.getElementById('iframe-message');
              if (display) {
                display.textContent = 'Message from iframe: "' + event.data.message + '" at ' + event.data.timestamp;
              }
            } else if (event.data.type === 'request-data') {
              // Send response back to iframe
              event.source.postMessage({
                type: 'parent-response',
                message: 'Hello from parent window!',
                timestamp: new Date().toLocaleTimeString()
              }, '*');
            }
          });
        `,
        }}
      />
    </div>
  );
}
