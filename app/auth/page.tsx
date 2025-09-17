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
import { ValidationType } from "@/types";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "reset">(
    "login"
  );
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [resetData, setResetData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateLoginField = (name: string, value: string) => {
    const rules = {
      email: [
        { type: ValidationType.REQUIRED, message: "Email is required" },
        {
          type: ValidationType.EMAIL,
          message: "Please enter a valid email address",
        },
      ],
      password: [
        { type: ValidationType.REQUIRED, message: "Password is required" },
      ],
    };

    return FormValidator.validateField(
      value,
      rules[name as keyof typeof rules] || []
    );
  };

  const validateRegisterField = (name: string, value: string) => {
    const rules = {
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
      password: [
        { type: ValidationType.REQUIRED, message: "Password is required" },
        {
          type: ValidationType.MIN_LENGTH,
          value: 8,
          message: "Password must be at least 8 characters",
        },
      ],
    };

    return FormValidator.validateField(
      value,
      rules[name as keyof typeof rules] || []
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    Object.keys(loginData).forEach((key) => {
      const error = validateLoginField(key, (loginData as any)[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate login success/failure
    if (
      loginData.email === "demo@example.com" &&
      loginData.password === "password123"
    ) {
      alert("Login successful!");
      setLoginData({ email: "", password: "" });
    } else {
      setErrors({ general: "Invalid email or password" });
    }

    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    Object.keys(registerData).forEach((key) => {
      if (key !== "confirmPassword") {
        const error = validateRegisterField(key, (registerData as any)[key]);
        if (error) newErrors[key] = error;
      }
    });

    // Check password confirmation
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      "Registration successful! Please check your email to verify your account."
    );
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setActiveTab("login");
    setIsLoading(false);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetData.email) {
      setErrors({ email: "Email is required" });
      return;
    }

    const emailError = validateLoginField("email", resetData.email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Password reset link sent to your email!");
    setResetData({ email: "" });
    setActiveTab("login");
    setIsLoading(false);
  };

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
              <span className="ml-4 text-gray-500">/</span>
              <span className="ml-4 text-gray-700">Authentication</span>
            </div>
            <div className="flex items-center">
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex space-x-4 border-b">
              {[
                { id: "login", label: "Login" },
                { id: "register", label: "Register" },
                { id: "reset", label: "Reset Password" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setErrors({});
                  }}
                  data-testid={`${tab.id}-tab`}
                  className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <CardTitle>
                {activeTab === "login" && "Sign in to your account"}
                {activeTab === "register" && "Create a new account"}
                {activeTab === "reset" && "Reset your password"}
              </CardTitle>
              <CardDescription>
                {activeTab === "login" &&
                  "Enter your email and password to access your account"}
                {activeTab === "register" &&
                  "Fill out the form below to create your account"}
                {activeTab === "reset" &&
                  "Enter your email to receive a password reset link"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {errors.general && (
              <div
                className="mb-4 p-3 rounded-md bg-red-50 border border-red-200"
                data-testid="error-message"
              >
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} data-testid="login-form">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email Address</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      data-testid="login-email-input"
                      value={loginData.email}
                      onChange={(e) => {
                        setLoginData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      className={errors.email ? "border-red-500" : ""}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p
                        className="text-sm text-red-600 mt-1"
                        data-testid="login-email-error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      data-testid="login-password-input"
                      value={loginData.password}
                      onChange={(e) => {
                        setLoginData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                        if (errors.password)
                          setErrors((prev) => ({ ...prev, password: "" }));
                      }}
                      className={errors.password ? "border-red-500" : ""}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    {errors.password && (
                      <p
                        className="text-sm text-red-600 mt-1"
                        data-testid="login-password-error"
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        data-testid="remember-me-checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setActiveTab("reset")}
                      data-testid="forgot-password-link"
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="login-submit-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
            )}

            {/* Register Form */}
            {activeTab === "register" && (
              <form onSubmit={handleRegister} data-testid="register-form">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="register-firstName">First Name</Label>
                      <Input
                        id="register-firstName"
                        name="firstName"
                        data-testid="register-firstName-input"
                        value={registerData.firstName}
                        onChange={(e) => {
                          setRegisterData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }));
                          if (errors.firstName)
                            setErrors((prev) => ({ ...prev, firstName: "" }));
                        }}
                        className={errors.firstName ? "border-red-500" : ""}
                        placeholder="First name"
                        autoComplete="given-name"
                      />
                      {errors.firstName && (
                        <p
                          className="text-sm text-red-600 mt-1"
                          data-testid="register-firstName-error"
                        >
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="register-lastName">Last Name</Label>
                      <Input
                        id="register-lastName"
                        name="lastName"
                        data-testid="register-lastName-input"
                        value={registerData.lastName}
                        onChange={(e) => {
                          setRegisterData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }));
                          if (errors.lastName)
                            setErrors((prev) => ({ ...prev, lastName: "" }));
                        }}
                        className={errors.lastName ? "border-red-500" : ""}
                        placeholder="Last name"
                        autoComplete="family-name"
                      />
                      {errors.lastName && (
                        <p
                          className="text-sm text-red-600 mt-1"
                          data-testid="register-lastName-error"
                        >
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-email">Email Address</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      data-testid="register-email-input"
                      value={registerData.email}
                      onChange={(e) => {
                        setRegisterData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      className={errors.email ? "border-red-500" : ""}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p
                        className="text-sm text-red-600 mt-1"
                        data-testid="register-email-error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      data-testid="register-password-input"
                      value={registerData.password}
                      onChange={(e) => {
                        setRegisterData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                        if (errors.password)
                          setErrors((prev) => ({ ...prev, password: "" }));
                      }}
                      className={errors.password ? "border-red-500" : ""}
                      placeholder="Create a password"
                      autoComplete="new-password"
                    />
                    {errors.password && (
                      <p
                        className="text-sm text-red-600 mt-1"
                        data-testid="register-password-error"
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-confirmPassword">
                      Confirm Password
                    </Label>
                    <Input
                      id="register-confirmPassword"
                      name="confirmPassword"
                      type="password"
                      data-testid="register-confirmPassword-input"
                      value={registerData.confirmPassword}
                      onChange={(e) => {
                        setRegisterData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }));
                        if (errors.confirmPassword)
                          setErrors((prev) => ({
                            ...prev,
                            confirmPassword: "",
                          }));
                      }}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                      <p
                        className="text-sm text-red-600 mt-1"
                        data-testid="register-confirmPassword-error"
                      >
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      data-testid="terms-checkbox"
                      required
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 text-sm text-gray-600"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="register-submit-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </div>
              </form>
            )}

            {/* Reset Password Form */}
            {activeTab === "reset" && (
              <form onSubmit={handleReset} data-testid="reset-form">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reset-email">Email Address</Label>
                    <Input
                      id="reset-email"
                      name="email"
                      type="email"
                      data-testid="reset-email-input"
                      value={resetData.email}
                      onChange={(e) => {
                        setResetData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      className={errors.email ? "border-red-500" : ""}
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p
                        className="text-sm text-red-600 mt-1"
                        data-testid="reset-email-error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="reset-submit-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </div>
              </form>
            )}

            {/* Demo Credentials */}
            {activeTab === "login" && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                  Demo Credentials
                </h4>
                <p className="text-xs text-blue-700">
                  Email: demo@example.com
                  <br />
                  Password: password123
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
