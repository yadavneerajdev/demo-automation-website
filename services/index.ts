// Services following Dependency Inversion Principle
import { ApiResponse, User, Product, Order } from "@/types";

// Abstract base service
abstract class BaseApiService {
  protected baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(
        `API request failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  protected async post<T>(
    endpoint: string,
    data: any
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  protected async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// Authentication service
export class AuthService extends BaseApiService {
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.post("/auth/login", { email, password });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.post("/auth/register", userData);
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.post("/auth/logout", {});
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.get("/auth/me");
  }

  async resetPassword(email: string): Promise<ApiResponse<void>> {
    return this.post("/auth/reset-password", { email });
  }
}

// Product service
export class ProductService extends BaseApiService {
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<ApiResponse<{ products: Product[]; total: number }>> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const query = queryParams.toString();
    return this.get(`/products${query ? `?${query}` : ""}`);
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.get(`/products/${id}`);
  }

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return this.get(`/products/search?q=${encodeURIComponent(query)}`);
  }
}

// Order service
export class OrderService extends BaseApiService {
  async createOrder(orderData: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: any;
    paymentMethod: any;
  }): Promise<ApiResponse<Order>> {
    return this.post("/orders", orderData);
  }

  async getOrders(): Promise<ApiResponse<Order[]>> {
    return this.get("/orders");
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return this.get(`/orders/${id}`);
  }

  async updateOrderStatus(
    id: string,
    status: string
  ): Promise<ApiResponse<Order>> {
    return this.put(`/orders/${id}/status`, { status });
  }
}

// Mock data service for testing
export class MockDataService {
  static generateUsers(count: number = 50): User[] {
    const users: User[] = [];

    for (let i = 1; i <= count; i++) {
      users.push({
        id: `user-${i}`,
        email: `user${i}@example.com`,
        firstName: `User${i}`,
        lastName: `Test`,
        role: i <= 5 ? ("admin" as any) : ("user" as any),
        isActive: Math.random() > 0.1,
        createdAt: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
        ),
        updatedAt: new Date(),
      });
    }

    return users;
  }

  static generateProducts(count: number = 100): Product[] {
    const categories = [
      { id: "electronics", name: "Electronics", slug: "electronics" },
      { id: "clothing", name: "Clothing", slug: "clothing" },
      { id: "books", name: "Books", slug: "books" },
      { id: "home", name: "Home & Garden", slug: "home-garden" },
      { id: "sports", name: "Sports", slug: "sports" },
    ];

    const products: Product[] = [];

    for (let i = 1; i <= count; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      products.push({
        id: `product-${i}`,
        name: `${category.name} Product ${i}`,
        description: `This is a great ${category.name.toLowerCase()} product with amazing features.`,
        price: Math.floor(Math.random() * 500) + 10,
        category,
        images: [`https://via.placeholder.com/400x300?text=Product+${i}`],
        inStock: Math.random() > 0.2,
        stockQuantity: Math.floor(Math.random() * 100),
        rating: Math.floor(Math.random() * 50) / 10,
        reviewCount: Math.floor(Math.random() * 200),
        createdAt: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
        ),
        updatedAt: new Date(),
      });
    }

    return products;
  }

  static generateTableData(count: number = 100): Array<{
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
    lastLogin: Date;
    isActive: boolean;
  }> {
    const statuses = ["active", "inactive", "pending", "suspended"];
    const roles = ["admin", "user", "moderator", "editor"];
    const data = [];

    for (let i = 1; i <= count; i++) {
      data.push({
        id: `id-${i}`,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        role: roles[Math.floor(Math.random() * roles.length)],
        lastLogin: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
        isActive: Math.random() > 0.3,
      });
    }

    return data;
  }
}

// Service instances
export const authService = new AuthService();
export const productService = new ProductService();
export const orderService = new OrderService();
