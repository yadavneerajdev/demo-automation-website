// Core application types following SOLID principles

// Interface Segregation: Separate interfaces for different concerns
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User and Authentication Types
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
  options?: FormOption[];
  validation?: ValidationRule[];
}

export enum FormFieldType {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  NUMBER = "number",
  SELECT = "select",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  TEXTAREA = "textarea",
  DATE = "date",
  FILE = "file",
}

export interface FormOption {
  value: string;
  label: string;
}

export interface ValidationRule {
  type: ValidationType;
  message: string;
  value?: any;
}

export enum ValidationType {
  REQUIRED = "required",
  MIN_LENGTH = "minLength",
  MAX_LENGTH = "maxLength",
  PATTERN = "pattern",
  EMAIL = "email",
  MIN = "min",
  MAX = "max",
}

// E-commerce Types
export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order extends BaseEntity {
  user: User;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: PaymentType;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export enum PaymentType {
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  PAYPAL = "paypal",
  BANK_TRANSFER = "bank_transfer",
}

// Table and Data Types
export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableState {
  sortBy: string | null;
  sortOrder: SortOrder;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  filters: Record<string, any>;
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Modal and Dialog Types
export interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  data?: any;
}

export enum ModalType {
  CONFIRM = "confirm",
  ALERT = "alert",
  FORM = "form",
  INFO = "info",
  ERROR = "error",
}

export interface ConfirmationData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

// Interactive Elements Types
export interface DragDropItem {
  id: string;
  content: React.ReactNode;
  type: string;
  data?: any;
}

export interface FileUploadConfig {
  acceptedTypes: string[];
  maxSize: number;
  multiple: boolean;
  onUpload: (files: File[]) => void;
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  errors?: string[];
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

// Component Props Types (Open/Closed Principle)
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingProps extends BaseComponentProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export interface ErrorProps extends BaseComponentProps {
  error: Error | string;
  onRetry?: () => void;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavigationItem[];
  badge?: string | number;
}
