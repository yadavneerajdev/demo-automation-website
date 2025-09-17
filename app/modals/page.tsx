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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks";

export default function ModalsPage() {
  const confirmModal = useModal();
  const infoModal = useModal();
  const formModal = useModal();
  const alertModal = useModal();

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({ show: false, message: "", type: "info" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 5000);
  };

  const handleConfirmAction = () => {
    showToast("Action confirmed successfully!", "success");
    confirmModal.closeModal();
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email) {
      showToast("Please fill all required fields", "error");
      return;
    }
    showToast("Form submitted successfully!", "success");
    setFormData({ name: "", email: "", message: "" });
    formModal.closeModal();
  };

  const modalExamples = [
    {
      title: "Confirmation Dialog",
      description: "Standard confirmation with action buttons",
      testId: "confirmation-modal-trigger",
      action: () =>
        confirmModal.openModal({
          title: "Delete Item",
          message:
            "Are you sure you want to delete this item? This action cannot be undone.",
          type: "danger",
        }),
    },
    {
      title: "Information Modal",
      description: "Display information to users",
      testId: "info-modal-trigger",
      action: () =>
        infoModal.openModal({
          title: "System Information",
          content:
            "This is an informational dialog that provides details about system status, features, or help content.",
        }),
    },
    {
      title: "Form Modal",
      description: "Modal containing form elements",
      testId: "form-modal-trigger",
      action: () => formModal.openModal(),
    },
    {
      title: "Alert Dialog",
      description: "Important alerts and warnings",
      testId: "alert-modal-trigger",
      action: () =>
        alertModal.openModal({
          title: "Warning",
          message:
            "Your session will expire in 5 minutes. Please save your work.",
          type: "warning",
        }),
    },
  ];

  const toastExamples = [
    {
      title: "Success Toast",
      type: "success" as const,
      message: "Operation completed successfully!",
    },
    {
      title: "Error Toast",
      type: "error" as const,
      message: "An error occurred while processing",
    },
    {
      title: "Warning Toast",
      type: "warning" as const,
      message: "Please check your input data",
    },
    {
      title: "Info Toast",
      type: "info" as const,
      message: "New features are now available",
    },
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
              <span className="ml-4 text-gray-700">Modals</span>
            </div>
            <div className="flex items-center">
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Modals & Dialogs</h1>
          <p className="mt-2 text-gray-600">
            Test various types of modal dialogs, confirmations, and
            notifications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Modal Dialogs */}
          <Card>
            <CardHeader>
              <CardTitle>Modal Dialogs</CardTitle>
              <CardDescription>
                Different types of modal dialogs for testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modalExamples.map((example, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {example.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {example.description}
                      </p>
                    </div>
                    <Button
                      onClick={example.action}
                      data-testid={example.testId}
                      variant="outline"
                    >
                      Open
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Toast Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Toast Notifications</CardTitle>
              <CardDescription>
                Different types of toast messages for testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {toastExamples.map((example, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {example.title}
                      </h3>
                      <p className="text-sm text-gray-600">{example.message}</p>
                    </div>
                    <Button
                      onClick={() => showToast(example.message, example.type)}
                      data-testid={`toast-${example.type}-trigger`}
                      variant="outline"
                    >
                      Show
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Modals</CardTitle>
              <CardDescription>More complex modal interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    // Simulate nested modal
                    setTimeout(() => {
                      confirmModal.openModal({
                        title: "Nested Confirmation",
                        message:
                          "This is a nested modal that appeared after a delay.",
                        type: "info",
                      });
                    }, 1000);
                  }}
                  data-testid="nested-modal-trigger"
                >
                  Nested Modal (with delay)
                </Button>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    showToast("Loading...", "info");
                    setTimeout(() => {
                      showToast("Process completed!", "success");
                    }, 2000);
                  }}
                  data-testid="sequential-toast-trigger"
                >
                  Sequential Toasts
                </Button>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    const confirmResult = window.confirm(
                      "Use browser confirmation?"
                    );
                    showToast(
                      confirmResult
                        ? "Confirmed via browser"
                        : "Cancelled via browser",
                      confirmResult ? "success" : "warning"
                    );
                  }}
                  data-testid="browser-confirm-trigger"
                >
                  Browser Confirmation
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testing Scenarios</CardTitle>
              <CardDescription>Common test cases to practice</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Open and close different modal types</li>
                <li>• Test modal overlay clicks</li>
                <li>• ESC key to close modals</li>
                <li>• Form validation in modals</li>
                <li>• Confirm and cancel actions</li>
                <li>• Toast notification timing</li>
                <li>• Multiple toast messages</li>
                <li>• Nested modal interactions</li>
                <li>• Focus management</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={confirmModal.isOpen} onOpenChange={confirmModal.closeModal}>
        <DialogContent data-testid="confirmation-modal">
          <DialogHeader>
            <DialogTitle>
              {confirmModal.data?.title || "Confirm Action"}
            </DialogTitle>
            <DialogDescription>
              {confirmModal.data?.message ||
                "Are you sure you want to perform this action?"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={confirmModal.closeModal}
              data-testid="cancel-button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAction}
              data-testid="confirm-button"
              variant={
                confirmModal.data?.type === "danger" ? "destructive" : "default"
              }
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Information Modal */}
      <Dialog open={infoModal.isOpen} onOpenChange={infoModal.closeModal}>
        <DialogContent data-testid="info-modal">
          <DialogHeader>
            <DialogTitle>{infoModal.data?.title || "Information"}</DialogTitle>
            <DialogDescription>
              {infoModal.data?.content || "This is an informational dialog."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-6">
            <Button
              onClick={infoModal.closeModal}
              data-testid="info-close-button"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Form Modal */}
      <Dialog open={formModal.isOpen} onOpenChange={formModal.closeModal}>
        <DialogContent data-testid="form-modal">
          <DialogHeader>
            <DialogTitle>Contact Form</DialogTitle>
            <DialogDescription>
              Fill out the form below to send us a message.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div>
              <Label htmlFor="modal-name">Name *</Label>
              <Input
                id="modal-name"
                data-testid="modal-name-input"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="modal-email">Email *</Label>
              <Input
                id="modal-email"
                type="email"
                data-testid="modal-email-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="modal-message">Message</Label>
              <textarea
                id="modal-message"
                data-testid="modal-message-input"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Enter your message"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={formModal.closeModal}
              data-testid="form-cancel-button"
            >
              Cancel
            </Button>
            <Button onClick={handleFormSubmit} data-testid="form-submit-button">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert Modal */}
      <Dialog open={alertModal.isOpen} onOpenChange={alertModal.closeModal}>
        <DialogContent data-testid="alert-modal">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.963-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              {alertModal.data?.title || "Alert"}
            </DialogTitle>
            <DialogDescription>
              {alertModal.data?.message || "This is an alert message."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-6">
            <Button
              onClick={alertModal.closeModal}
              data-testid="alert-close-button"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : toast.type === "warning"
              ? "bg-yellow-500 text-white"
              : "bg-blue-500 text-white"
          }`}
          data-testid={`toast-${toast.type}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {toast.type === "success" && (
                <svg
                  className="w-5 h-5"
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
              )}
              {toast.type === "error" && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              {toast.type === "warning" && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.963-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              )}
              {toast.type === "info" && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              data-testid="toast-close-button"
              className="ml-4 hover:opacity-75"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
