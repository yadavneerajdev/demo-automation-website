"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormValidator } from "@/lib/validators";
import { FormField, FormFieldType, ValidationType } from "@/types";

export default function FormsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    country: "",
    interests: [] as string[],
    newsletter: false,
    terms: false,
    message: "",
    file: null as File | null,
    date: "",
    color: "#000000",
    range: "50",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: any) => {
    const fieldValidations: Record<string, any[]> = {
      firstName: [
        { type: ValidationType.REQUIRED, message: "First name is required" },
        {
          type: ValidationType.MIN_LENGTH,
          value: 2,
          message: "First name must be at least 2 characters",
        },
      ],
      lastName: [
        { type: ValidationType.REQUIRED, message: "Last name is required" },
        {
          type: ValidationType.MIN_LENGTH,
          value: 2,
          message: "Last name must be at least 2 characters",
        },
      ],
      email: [
        { type: ValidationType.REQUIRED, message: "Email is required" },
        {
          type: ValidationType.EMAIL,
          message: "Please enter a valid email address",
        },
      ],
      phone: [
        { type: ValidationType.REQUIRED, message: "Phone number is required" },
        {
          type: ValidationType.PATTERN,
          value: /^[+]?[\d\s\-\(\)]+$/,
          message: "Please enter a valid phone number",
        },
      ],
      age: [
        { type: ValidationType.REQUIRED, message: "Age is required" },
        {
          type: ValidationType.MIN,
          value: 18,
          message: "You must be at least 18 years old",
        },
        {
          type: ValidationType.MAX,
          value: 120,
          message: "Please enter a valid age",
        },
      ],
    };

    const rules = fieldValidations[name];
    if (rules) {
      return FormValidator.validateField(value, rules);
    }
    return null;
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (
    name: string,
    value: string,
    checked: boolean
  ) => {
    if (name === "interests") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach((key) => {
      if (
        key !== "interests" &&
        key !== "newsletter" &&
        key !== "file" &&
        key !== "message" &&
        key !== "date" &&
        key !== "color" &&
        key !== "range"
      ) {
        const error = validateField(key, (formData as any)[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    // Check terms acceptance
    if (!formData.terms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Form submitted successfully!");
    setIsSubmitting(false);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      country: "",
      interests: [],
      newsletter: false,
      terms: false,
      message: "",
      file: null,
      date: "",
      color: "#000000",
      range: "50",
    });
  };

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "India",
    "Brazil",
    "Other",
  ];

  const interests = [
    "Technology",
    "Sports",
    "Music",
    "Travel",
    "Cooking",
    "Reading",
    "Gaming",
    "Art",
  ];

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
              <span className="ml-4 text-gray-700">Forms</span>
            </div>
            <div className="flex items-center">
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Form Testing Page
          </h1>
          <p className="mt-2 text-gray-600">
            Test various form elements, validation, and submission flows
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>User Registration Form</CardTitle>
                <CardDescription>
                  Complete the form below to test form validation and submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div data-testid="first-name-field">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          data-testid="first-name-input"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className={errors.firstName ? "border-red-500" : ""}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p
                            className="text-sm text-red-600 mt-1"
                            data-testid="first-name-error"
                          >
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div data-testid="last-name-field">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          data-testid="last-name-input"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className={errors.lastName ? "border-red-500" : ""}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p
                            className="text-sm text-red-600 mt-1"
                            data-testid="last-name-error"
                          >
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div data-testid="email-field">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        data-testid="email-input"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p
                          className="text-sm text-red-600 mt-1"
                          data-testid="email-error"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div data-testid="phone-field">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          data-testid="phone-input"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={errors.phone ? "border-red-500" : ""}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p
                            className="text-sm text-red-600 mt-1"
                            data-testid="phone-error"
                          >
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div data-testid="age-field">
                        <Label htmlFor="age">Age *</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          data-testid="age-input"
                          value={formData.age}
                          onChange={(e) =>
                            handleInputChange(
                              "age",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className={errors.age ? "border-red-500" : ""}
                          placeholder="Enter your age"
                          min="18"
                          max="120"
                        />
                        {errors.age && (
                          <p
                            className="text-sm text-red-600 mt-1"
                            data-testid="age-error"
                          >
                            {errors.age}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div data-testid="gender-field">
                        <Label htmlFor="gender">Gender</Label>
                        <select
                          id="gender"
                          name="gender"
                          data-testid="gender-select"
                          value={formData.gender}
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">
                            Prefer not to say
                          </option>
                        </select>
                      </div>

                      <div data-testid="country-field">
                        <Label htmlFor="country">Country</Label>
                        <select
                          id="country"
                          name="country"
                          data-testid="country-select"
                          value={formData.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select country</option>
                          {countries.map((country) => (
                            <option
                              key={country}
                              value={country.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Interests
                    </h3>
                    <div
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                      data-testid="interests-group"
                    >
                      {interests.map((interest) => (
                        <label
                          key={interest}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            data-testid={`interest-${interest.toLowerCase()}`}
                            checked={formData.interests.includes(
                              interest.toLowerCase()
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "interests",
                                interest.toLowerCase(),
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {interest}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Fields */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Additional Information
                    </h3>

                    <div data-testid="message-field">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        name="message"
                        data-testid="message-textarea"
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter your message (optional)"
                      />
                    </div>

                    <div data-testid="file-field">
                      <Label htmlFor="file">Profile Picture</Label>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        data-testid="file-input"
                        accept="image/*"
                        onChange={(e) =>
                          handleInputChange("file", e.target.files?.[0] || null)
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-500 file:border-0 file:bg-transparent file:text-sm file:font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div data-testid="date-field">
                        <Label htmlFor="date">Birth Date</Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          data-testid="date-input"
                          value={formData.date}
                          onChange={(e) =>
                            handleInputChange("date", e.target.value)
                          }
                        />
                      </div>

                      <div data-testid="color-field">
                        <Label htmlFor="color">Favorite Color</Label>
                        <Input
                          id="color"
                          name="color"
                          type="color"
                          data-testid="color-input"
                          value={formData.color}
                          onChange={(e) =>
                            handleInputChange("color", e.target.value)
                          }
                        />
                      </div>

                      <div data-testid="range-field">
                        <Label htmlFor="range">
                          Experience Level: {formData.range}%
                        </Label>
                        <input
                          id="range"
                          name="range"
                          type="range"
                          data-testid="range-input"
                          min="0"
                          max="100"
                          value={formData.range}
                          onChange={(e) =>
                            handleInputChange("range", e.target.value)
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div
                      className="flex items-center space-x-2"
                      data-testid="newsletter-field"
                    >
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        data-testid="newsletter-checkbox"
                        checked={formData.newsletter}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "newsletter",
                            "",
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to our newsletter
                      </Label>
                    </div>

                    <div
                      className="flex items-center space-x-2"
                      data-testid="terms-field"
                    >
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        data-testid="terms-checkbox"
                        checked={formData.terms}
                        onChange={(e) =>
                          handleCheckboxChange("terms", "", e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the Terms and Conditions *
                      </Label>
                    </div>
                    {errors.terms && (
                      <p
                        className="text-sm text-red-600"
                        data-testid="terms-error"
                      >
                        {errors.terms}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      data-testid="submit-button"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Form"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      data-testid="reset-button"
                      onClick={() => {
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          phone: "",
                          age: "",
                          gender: "",
                          country: "",
                          interests: [],
                          newsletter: false,
                          terms: false,
                          message: "",
                          file: null,
                          date: "",
                          color: "#000000",
                          range: "50",
                        });
                        setErrors({});
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Form Information Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>
                  This form includes various input types for testing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Text inputs with validation</li>
                  <li>• Email and phone inputs</li>
                  <li>• Number input with min/max</li>
                  <li>• Select dropdowns</li>
                  <li>• Multiple checkboxes</li>
                  <li>• Textarea</li>
                  <li>• File upload</li>
                  <li>• Date picker</li>
                  <li>• Color picker</li>
                  <li>• Range slider</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Testing Scenarios</CardTitle>
                <CardDescription>Common test cases to practice</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Submit with empty required fields</li>
                  <li>• Enter invalid email format</li>
                  <li>• Test age validation (under 18)</li>
                  <li>• Select multiple interests</li>
                  <li>• Upload different file types</li>
                  <li>• Reset form functionality</li>
                  <li>• Loading states during submission</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
