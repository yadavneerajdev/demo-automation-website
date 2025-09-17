"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/hooks";

interface DragItem {
  id: string;
  content: string;
  category: "todo" | "in-progress" | "done";
}

interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
}

export default function InteractiveElementsPage() {
  // Drag and Drop State
  const [dragItems, setDragItems] = useState<DragItem[]>([
    { id: "1", content: "Design homepage mockup", category: "todo" },
    { id: "2", content: "Implement user authentication", category: "todo" },
    { id: "3", content: "Set up database schema", category: "in-progress" },
    { id: "4", content: "Write unit tests", category: "done" },
  ]);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  // Slider States
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [brightnessLevel, setBrightnessLevel] = useState(75);
  const [temperatureRange, setTemperatureRange] = useState([18, 24]);

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Color Picker State
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [colorHistory, setColorHistory] = useState<string[]>(["#3b82f6"]);

  // Progress and Rating States
  const [progressValue, setProgressValue] = useState(65);
  const [rating, setRating] = useState(3);
  const [hoverRating, setHoverRating] = useState(0);

  // Accordion State
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(
    new Set(["section1"])
  );

  // Tab State
  const [activeTab, setActiveTab] = useState("overview");

  // Canvas Drawing State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState("#000000");

  const confirmModal = useModal();

  // Drag and Drop Functions
  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent,
    targetCategory: "todo" | "in-progress" | "done"
  ) => {
    e.preventDefault();
    if (draggedItem && draggedItem.category !== targetCategory) {
      setDragItems((items) =>
        items.map((item) =>
          item.id === draggedItem.id
            ? { ...item, category: targetCategory }
            : item
        )
      );
    }
    setDraggedItem(null);
  };

  // File Upload Functions
  const handleFileSelect = (files: FileList) => {
    const newFiles: FileUpload[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((files) => files.filter((f) => f.id !== fileId));
  };

  // Canvas Drawing Functions
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  }, []);

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineTo(x, y);
        ctx.strokeStyle = drawColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    },
    [isDrawing, drawColor]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Color Picker Function
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (!colorHistory.includes(color)) {
      setColorHistory((prev) => [color, ...prev].slice(0, 8));
    }
  };

  // Accordion Function
  const toggleAccordion = (sectionId: string) => {
    setOpenAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
              <span className="ml-4 text-gray-700">Interactive Elements</span>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Interactive Elements Testing
          </h1>
          <p className="mt-2 text-gray-600">
            Test drag-and-drop, sliders, file uploads, and other interactive
            components
          </p>
        </div>

        <div className="space-y-8">
          {/* Tab Navigation */}
          <Card>
            <CardHeader>
              <CardTitle>Tab Navigation</CardTitle>
              <CardDescription>
                Test tab switching and content display
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-b mb-4">
                <nav className="flex space-x-8">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "features", label: "Features" },
                    { id: "pricing", label: "Pricing" },
                    { id: "support", label: "Support" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      data-testid={`tab-${tab.id}`}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div
                data-testid={`tab-content-${activeTab}`}
                className="min-h-[100px]"
              >
                {activeTab === "overview" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Product Overview
                    </h3>
                    <p className="text-gray-600">
                      This is the overview section with product information and
                      key details.
                    </p>
                  </div>
                )}
                {activeTab === "features" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Advanced automation testing capabilities</li>
                      <li>Cross-browser compatibility</li>
                      <li>Real-time reporting and analytics</li>
                      <li>CI/CD integration support</li>
                    </ul>
                  </div>
                )}
                {activeTab === "pricing" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Pricing Plans
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 text-center">
                        <h4 className="font-semibold">Basic</h4>
                        <p className="text-2xl font-bold text-green-600">
                          $29/mo
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 text-center bg-blue-50">
                        <h4 className="font-semibold">Pro</h4>
                        <p className="text-2xl font-bold text-green-600">
                          $79/mo
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <h4 className="font-semibold">Enterprise</h4>
                        <p className="text-2xl font-bold text-green-600">
                          $199/mo
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "support" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Support Options
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Get help when you need it with our comprehensive support
                      options.
                    </p>
                    <div className="space-y-2">
                      <p>
                        <strong>Email Support:</strong> support@example.com
                      </p>
                      <p>
                        <strong>Live Chat:</strong> Available 24/7
                      </p>
                      <p>
                        <strong>Phone Support:</strong> +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Drag and Drop Kanban Board */}
          <Card>
            <CardHeader>
              <CardTitle>Drag and Drop Kanban Board</CardTitle>
              <CardDescription>
                Drag tasks between columns to test drag-and-drop functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(["todo", "in-progress", "done"] as const).map((category) => (
                  <div
                    key={category}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, category)}
                    data-testid={`drop-zone-${category}`}
                    className="bg-gray-100 rounded-lg p-4 min-h-[200px]"
                  >
                    <h3 className="font-semibold mb-3 capitalize text-center">
                      {category.replace("-", " ")}
                    </h3>
                    <div className="space-y-2">
                      {dragItems
                        .filter((item) => item.category === category)
                        .map((item, index) => (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item)}
                            data-testid={`drag-item-${category}-${index}`}
                            className="bg-white p-3 rounded shadow cursor-move hover:shadow-md transition-shadow"
                          >
                            {item.content}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sliders and Range Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Sliders and Range Controls</CardTitle>
              <CardDescription>
                Test various slider components and range inputs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume Level: {volumeLevel}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volumeLevel}
                  onChange={(e) => setVolumeLevel(parseInt(e.target.value))}
                  data-testid="volume-slider"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brightness: {brightnessLevel}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={brightnessLevel}
                  onChange={(e) => setBrightnessLevel(parseInt(e.target.value))}
                  data-testid="brightness-slider"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature Range: {temperatureRange[0]}°C -{" "}
                  {temperatureRange[1]}°C
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="10"
                    max="30"
                    value={temperatureRange[0]}
                    onChange={(e) =>
                      setTemperatureRange([
                        parseInt(e.target.value),
                        temperatureRange[1],
                      ])
                    }
                    data-testid="temp-min-slider"
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="10"
                    max="30"
                    value={temperatureRange[1]}
                    onChange={(e) =>
                      setTemperatureRange([
                        temperatureRange[0],
                        parseInt(e.target.value),
                      ])
                    }
                    data-testid="temp-max-slider"
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress: {progressValue}%
                </label>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progressValue}%` }}
                    data-testid="progress-bar"
                  ></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressValue}
                  onChange={(e) => setProgressValue(parseInt(e.target.value))}
                  data-testid="progress-slider"
                  className="w-full mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* File Upload Zone */}
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>
                Test file upload functionality with drag-and-drop support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                data-testid="file-drop-zone"
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
              >
                <div className="space-y-4">
                  <div className="text-4xl">📁</div>
                  <div>
                    <p className="text-lg font-medium">
                      Drop files here or click to browse
                    </p>
                    <p className="text-gray-500">
                      Support for images, documents, and other file types
                    </p>
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="browse-files-button"
                  >
                    Browse Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) =>
                      e.target.files && handleFileSelect(e.target.files)
                    }
                    data-testid="file-input"
                    className="hidden"
                  />
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">
                    Uploaded Files ({uploadedFiles.length})
                  </h4>
                  <div className="space-y-2" data-testid="uploaded-files-list">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded"
                        data-testid={`uploaded-file-${index}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">📄</div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {formatFileSize(file.size)} •{" "}
                              {file.uploadDate.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          data-testid={`remove-file-${index}`}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Color Picker */}
          <Card>
            <CardHeader>
              <CardTitle>Color Picker</CardTitle>
              <CardDescription>
                Test color selection and color history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    data-testid="color-picker"
                    className="w-12 h-12 border rounded cursor-pointer"
                  />
                  <div>
                    <p className="font-medium">Selected Color</p>
                    <p
                      className="text-sm text-gray-600"
                      data-testid="selected-color-value"
                    >
                      {selectedColor}
                    </p>
                  </div>
                  <div
                    className="w-16 h-12 rounded border"
                    style={{ backgroundColor: selectedColor }}
                    data-testid="color-preview"
                  ></div>
                </div>

                <div>
                  <p className="font-medium mb-2">Color History</p>
                  <div className="flex space-x-2" data-testid="color-history">
                    {colorHistory.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        data-testid={`color-history-${index}`}
                        className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Star Rating */}
          <Card>
            <CardHeader>
              <CardTitle>Star Rating</CardTitle>
              <CardDescription>
                Test interactive star rating component
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Rate this product:</p>
                  <div className="flex space-x-1" data-testid="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        data-testid={`star-${star}`}
                        className={`text-2xl transition-colors ${
                          star <= (hoverRating || rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <p
                    className="text-sm text-gray-600 mt-2"
                    data-testid="rating-value"
                  >
                    Current rating: {rating} star{rating !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accordion */}
          <Card>
            <CardHeader>
              <CardTitle>Accordion</CardTitle>
              <CardDescription>
                Test expandable accordion sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2" data-testid="accordion">
                {[
                  {
                    id: "section1",
                    title: "Getting Started",
                    content:
                      "Learn the basics of automation testing and how to set up your first test.",
                  },
                  {
                    id: "section2",
                    title: "Advanced Features",
                    content:
                      "Explore advanced automation techniques, custom selectors, and test optimization.",
                  },
                  {
                    id: "section3",
                    title: "Best Practices",
                    content:
                      "Follow industry best practices for maintainable and reliable test automation.",
                  },
                  {
                    id: "section4",
                    title: "Troubleshooting",
                    content:
                      "Common issues and their solutions when working with automation testing.",
                  },
                ].map((section) => (
                  <div key={section.id} className="border rounded-lg">
                    <button
                      onClick={() => toggleAccordion(section.id)}
                      data-testid={`accordion-${section.id}`}
                      className="w-full px-4 py-3 text-left font-medium hover:bg-gray-50 flex justify-between items-center"
                    >
                      {section.title}
                      <span
                        className={`transform transition-transform ${
                          openAccordions.has(section.id) ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {openAccordions.has(section.id) && (
                      <div
                        className="px-4 py-3 border-t bg-gray-50"
                        data-testid={`accordion-content-${section.id}`}
                      >
                        <p className="text-gray-600">{section.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Canvas Drawing */}
          <Card>
            <CardHeader>
              <CardTitle>Canvas Drawing</CardTitle>
              <CardDescription>
                Test canvas interaction and drawing functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Color:</label>
                    <input
                      type="color"
                      value={drawColor}
                      onChange={(e) => setDrawColor(e.target.value)}
                      data-testid="draw-color-picker"
                      className="w-8 h-8 border rounded cursor-pointer"
                    />
                  </div>
                  <Button
                    onClick={clearCanvas}
                    data-testid="clear-canvas"
                    variant="outline"
                  >
                    Clear Canvas
                  </Button>
                </div>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={300}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  data-testid="drawing-canvas"
                  className="border border-gray-300 rounded cursor-crosshair bg-white"
                />
                <p className="text-sm text-gray-600">
                  Click and drag to draw on the canvas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Modal Trigger */}
          <Card>
            <CardHeader>
              <CardTitle>Confirmation Dialog</CardTitle>
              <CardDescription>
                Test confirmation modal and user decision handling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Click the button below to trigger a confirmation dialog:</p>
                <Button
                  onClick={confirmModal.openModal}
                  data-testid="open-confirmation"
                  variant="destructive"
                >
                  Delete All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          data-testid="confirmation-modal"
        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirm Deletion
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete all data? This will permanently
              remove all information and cannot be recovered.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={confirmModal.closeModal}
                data-testid="cancel-confirmation"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  alert("Data deletion confirmed!");
                  confirmModal.closeModal();
                }}
                data-testid="confirm-deletion"
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
