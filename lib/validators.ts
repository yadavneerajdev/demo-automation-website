// Form validation utilities following Single Responsibility Principle
import { ValidationRule, ValidationType } from "@/types";

export class FormValidator {
  static validateField(value: any, rules: ValidationRule[]): string | null {
    for (const rule of rules) {
      const error = this.validateRule(value, rule);
      if (error) return error;
    }
    return null;
  }

  private static validateRule(value: any, rule: ValidationRule): string | null {
    switch (rule.type) {
      case ValidationType.REQUIRED:
        return this.validateRequired(value, rule.message);
      case ValidationType.MIN_LENGTH:
        return this.validateMinLength(value, rule.value, rule.message);
      case ValidationType.MAX_LENGTH:
        return this.validateMaxLength(value, rule.value, rule.message);
      case ValidationType.EMAIL:
        return this.validateEmail(value, rule.message);
      case ValidationType.PATTERN:
        return this.validatePattern(value, rule.value, rule.message);
      case ValidationType.MIN:
        return this.validateMin(value, rule.value, rule.message);
      case ValidationType.MAX:
        return this.validateMax(value, rule.value, rule.message);
      default:
        return null;
    }
  }

  private static validateRequired(value: any, message: string): string | null {
    if (value === null || value === undefined || value === "") {
      return message;
    }
    return null;
  }

  private static validateMinLength(
    value: string,
    minLength: number,
    message: string
  ): string | null {
    if (value && value.length < minLength) {
      return message;
    }
    return null;
  }

  private static validateMaxLength(
    value: string,
    maxLength: number,
    message: string
  ): string | null {
    if (value && value.length > maxLength) {
      return message;
    }
    return null;
  }

  private static validateEmail(value: string, message: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return message;
    }
    return null;
  }

  private static validatePattern(
    value: string,
    pattern: RegExp,
    message: string
  ): string | null {
    if (value && !pattern.test(value)) {
      return message;
    }
    return null;
  }

  private static validateMin(
    value: number,
    min: number,
    message: string
  ): string | null {
    if (value !== null && value !== undefined && value < min) {
      return message;
    }
    return null;
  }

  private static validateMax(
    value: number,
    max: number,
    message: string
  ): string | null {
    if (value !== null && value !== undefined && value > max) {
      return message;
    }
    return null;
  }
}
