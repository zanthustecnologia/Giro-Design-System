import React from 'react';

interface FooterProps {
  title?: string;
  description?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  title = "Feedback", 
  description = "We'd love to hear your thoughts about our design system!" 
}) => {
  return (
    <div className="docs-footer">
      <div className="docs-footer-content">
        <div className="docs-footer-titles">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <style>{`
        .docs-footer {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          background-color: var(--color-neutral-high-light);
          border-top: var(--border-width-1) solid var(--color-neutral-high-medium);
          margin-top: var(--spacing-40);
          margin-bottom: 0;
          padding: 40px 0;
          display: flex;
          justify-content: center;
        }
        .docs-footer-content {
          flex: 1;
          max-width: 1200px;
          min-width: 640px;
          margin: 0 120px;
          display: flex;
          align-items: flex-start;
        }
        .docs-footer-titles {
          max-width: 320px;
          flex-shrink: 0;
          margin-right: 80px;
        }
        .docs-footer h2 {
          font-size: 32px;
          font-weight: 700;
          color: var(--color-neutral-low-default);
          margin: 0;
          border-bottom: none !important;
          padding-bottom: 0 !important;
          line-height: 105%;
          letter-spacing: -1.333px;
          font-family: var(--font-family-primary, 'Figtree', sans-serif);
        }
        .docs-footer p {
          font-size: 16px;
          font-weight: 400;
          line-height: 140%;
          letter-spacing: 0.427px;
          color: var(--color-neutral-low-medium);
          margin: 12px 0 0 0;
          font-family: var(--font-family-primary, 'Figtree', sans-serif);
        }
        @media screen and (max-width: 1200px) {
          .docs-footer-content {
            max-width: 900px;
            margin: 0 80px;
            flex-direction: column;
            gap: 50px;
          }
          .docs-footer-titles {
            max-width: 100%;
          }
        }
        @media screen and (max-width: 1024px) {
          .docs-footer-content {
            margin: 0 120px;
          }
        }
        @media screen and (max-width: 768px) {
          .docs-footer-content {
            min-width: auto;
            margin: 0 var(--spacing-16, 16px);
          }
          .docs-footer h2 {
            font-size: 28px;
          }
          .docs-footer p {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};
