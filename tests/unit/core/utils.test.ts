/**
 * MIT License
 *
 * Copyright (c) 2025 TimeKill
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { describe, it, expect } from 'vitest';

// Utility functions that would typically be in the codebase
export function calculateCreditsRequired(textLength: number): number {
  return Math.ceil(textLength / 500);
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
    .trim();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

describe('Utility Functions', () => {
  describe('calculateCreditsRequired', () => {
    it('should calculate credits correctly for various text lengths', () => {
      expect(calculateCreditsRequired(0)).toBe(0);
      expect(calculateCreditsRequired(250)).toBe(1);
      expect(calculateCreditsRequired(500)).toBe(1);
      expect(calculateCreditsRequired(501)).toBe(2);
      expect(calculateCreditsRequired(1000)).toBe(2);
      expect(calculateCreditsRequired(1500)).toBe(3);
      expect(calculateCreditsRequired(2000)).toBe(4);
    });

    it('should handle edge cases', () => {
      expect(calculateCreditsRequired(1)).toBe(1);
      expect(calculateCreditsRequired(499)).toBe(1);
      expect(calculateCreditsRequired(999)).toBe(2);
    });
  });

  describe('sanitizeHtml', () => {
    it('should remove script tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      expect(sanitizeHtml(input)).toBe('Hello');
    });

    it('should remove all HTML tags', () => {
      const input = '<div><p>Hello <strong>world</strong></p></div>';
      expect(sanitizeHtml(input)).toBe('Hello world');
    });

    it('should handle complex script injections', () => {
      const input = '<script type="text/javascript">malicious code</script><p>Safe content</p>';
      expect(sanitizeHtml(input)).toBe('Safe content');
    });

    it('should handle empty input', () => {
      expect(sanitizeHtml('')).toBe('');
      expect(sanitizeHtml('   ')).toBe('');
    });

    it('should preserve text content', () => {
      const input = 'Just plain text';
      expect(sanitizeHtml(input)).toBe('Just plain text');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('firstname.lastname@company.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('test.domain.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });

    it('should handle fractional sizes', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB');
      expect(formatFileSize(2560000)).toBe('2.44 MB');
    });

    it('should handle small sizes', () => {
      expect(formatFileSize(500)).toBe('500 Bytes');
      expect(formatFileSize(1023)).toBe('1023 Bytes');
    });
  });

  describe('debounce', () => {
    it('should delay function execution', async () => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      // Should not be called immediately
      expect(callCount).toBe(0);

      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Should be called only once after delay
      expect(callCount).toBe(1);
    });

    it('should pass arguments correctly', async () => {
      let receivedArgs: any[] = [];
      const debouncedFn = debounce((a: number, b: string) => {
        receivedArgs = [a, b];
      }, 50);

      debouncedFn(42, 'test');

      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(receivedArgs).toEqual([42, 'test']);
    });
  });

  describe('generateSlug', () => {
    it('should generate URL-friendly slugs', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
      expect(generateSlug('Test-Case & Example!')).toBe('test-case-example');
      expect(generateSlug('  Multiple   Spaces  ')).toBe('multiple-spaces');
    });

    it('should handle special characters', () => {
      expect(generateSlug('User@Example.com')).toBe('userexamplecom');
      expect(generateSlug('Price: $29.99')).toBe('price-2999');
    });

    it('should handle empty and edge cases', () => {
      expect(generateSlug('')).toBe('');
      expect(generateSlug('   ')).toBe('');
      expect(generateSlug('---')).toBe('');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long...');
    });

    it('should not truncate short text', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });

    it('should handle exact length', () => {
      const text = 'Exactly twenty chars';
      expect(truncateText(text, 20)).toBe('Exactly twenty chars');
    });

    it('should handle edge cases', () => {
      expect(truncateText('', 10)).toBe('');
      expect(truncateText('Test', 0)).toBe('...');
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('ftp://files.example.com')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('javascript:alert("xss")')).toBe(true); // Technically valid but dangerous
    });

    it('should handle complex URLs', () => {
      expect(isValidUrl('https://api.example.com/v1/users?id=123&filter=active')).toBe(true);
      expect(isValidUrl('https://sub.domain.example.com:8080/path/to/resource#section')).toBe(true);
    });
  });
});