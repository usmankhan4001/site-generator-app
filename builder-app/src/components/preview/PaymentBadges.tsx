'use client';

import React from 'react';

export function VisaBadge({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="32" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <path
        d="M20.2 21H17.4L19.1 11H21.9L20.2 21ZM15.5 11L12.8 17.8L12.5 16.3C12.0 14.7 10.6 13.0 9 12.2L11.5 21H14.4L18.7 11H15.5ZM32.4 17.8C32.4 15.2 28.8 15.1 28.8 13.9C28.8 13.5 29.2 13.1 30.1 13.0C30.5 12.9 31.7 12.9 32.9 13.4L33.4 11.2C32.7 11.0 31.7 10.8 30.5 10.8C27.6 10.8 25.6 12.3 25.6 14.5C25.6 16.1 27.0 17.0 28.1 17.5C29.2 18.0 29.6 18.4 29.6 18.9C29.6 19.6 28.7 20.0 27.8 20.0C26.5 20.0 25.4 19.6 24.6 19.2L24.1 21.5C25.0 21.9 26.6 22.2 28.0 22.2C31.2 22.2 33.2 20.6 33.2 18.2L32.4 17.8ZM39.5 21H42L39.8 11H37.5C36.9 11 36.4 11.3 36.2 11.8L32.6 21H35.5L36.1 19.4H39.1L39.5 21ZM36.9 17.2L38.1 13.8L38.8 17.2H36.9Z"
        fill="#1A1F71"
      />
    </svg>
  );
}

export function MastercardBadge({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="32" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="19" cy="16" r="7" fill="#EB001B" />
      <circle cx="29" cy="16" r="7" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  );
}

export function AmexBadge({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="32" rx="4" fill="#0077A6" />
      <path
        d="M9 16.5L12 10.5H15.5L18.5 16.5L21.5 10.5H25L21.5 17.5L25 21.5H21.5L18.5 15.5L15.5 21.5H9V16.5ZM13 13.5L11.5 16.5H14.5L13 13.5ZM30 10.5H39V12.8H34.5V14.8H38.5V17H34.5V19.2H39V21.5H30V10.5Z"
        fill="white"
      />
    </svg>
  );
}

export function ApplePayBadge({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="32" rx="4" fill="#000000" />
      <path
        d="M17.8 13.8C17.8 12.2 18.8 11.2 19.8 10.5C19.1 9.5 18.0 8.9 16.8 8.9C15.2 8.9 14.3 9.8 13.4 9.8C12.5 9.8 11.4 9.0 10.1 9.0C8.3 9.0 6.6 10.1 5.6 11.8C3.7 15.1 5.1 20.0 7.0 22.7C7.9 24.0 8.9 25.4 10.3 25.3C11.6 25.2 12.2 24.4 13.8 24.4C15.3 24.4 15.8 25.3 17.2 25.3C18.6 25.3 19.5 24.0 20.4 22.7C21.4 21.2 21.9 19.8 21.9 19.7C21.8 19.6 17.8 18.1 17.8 13.8Z"
        fill="white"
      />
      <path
        d="M15.4 8.0C16.1 7.1 16.6 5.9 16.4 4.7C15.3 4.8 14.1 5.4 13.4 6.3C12.8 7.0 12.2 8.2 12.4 9.4C13.6 9.5 14.8 8.8 15.4 8.0Z"
        fill="white"
      />
      <text x="24" y="20" fill="white" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">
        Pay
      </text>
    </svg>
  );
}

export function GooglePayBadge({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <path
        d="M18.5 16.1V18.8H22.7C22.3 20.1 20.9 21.2 18.5 21.2C15.7 21.2 13.4 18.9 13.4 16.0C13.4 13.1 15.7 10.8 18.5 10.8C19.8 10.8 21.0 11.3 21.9 12.1L23.8 10.2C22.4 8.9 20.6 8.2 18.5 8.2C14.2 8.2 10.7 11.7 10.7 16.0C10.7 20.3 14.2 23.8 18.5 23.8C22.9 23.8 25.8 20.7 25.8 16.3C25.8 15.7 25.7 15.2 25.6 14.7H18.5V16.1Z"
        fill="#4285F4"
      />
      <text x="27" y="19" fill="#5F6368" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">
        Pay
      </text>
    </svg>
  );
}

export function PaymentBadgesRow({ className = 'flex items-center gap-2' }: { className?: string }) {
  return (
    <div className={className}>
      <VisaBadge />
      <MastercardBadge />
      <AmexBadge />
      <ApplePayBadge />
      <GooglePayBadge />
    </div>
  );
}
