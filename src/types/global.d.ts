/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

// Global test types
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveValue(value: string | number): R;
      toHaveTextContent(text: string): R;
      toBeChecked(): R;
      toHaveFocus(): R;
      toBeValid(): R;
      toBeInvalid(): R;
      toHaveDescription(text?: string): R;
      toHaveAccessibleName(name?: string): R;
      toHaveAccessibleDescription(description?: string): R;
    }
  }

  // Extend Window interface for PWA
  interface Window {
    beforeinstallprompt?: BeforeInstallPromptEvent;
  }

  // PWA Install Prompt Event
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

  // Service Worker types
  interface ServiceWorkerRegistration {
    installing: ServiceWorker | null;
    waiting: ServiceWorker | null;
    active: ServiceWorker | null;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
  }

  // Canvas fingerprinting types
  interface CanvasRenderingContext2D {
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
  }

  interface HTMLCanvasElement {
    toDataURL(type?: string, quality?: number): string;
  }

  // Mock types for testing
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_ALGOLIA_APP_ID?: string;
      NEXT_PUBLIC_ALGOLIA_SEARCH_KEY?: string;
    }
  }
}

// Module declarations for assets
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.ico' {
  const content: string;
  export default content;
}

declare module '*.bmp' {
  const content: string;
  export default content;
}

// CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

export {};