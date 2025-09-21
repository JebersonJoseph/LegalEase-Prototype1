'use client';

import React, { useEffect, useRef } from 'react';

export default function LegalEaseAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollY = window.scrollY;
      const start = rect.top + scrollY - window.innerHeight;
      const end = rect.bottom + scrollY - window.innerHeight;
      const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));

      if (documentRef.current && finalRef.current) {
        // Frame 1: Document (0 to 0.5)
        if (progress < 0.5) {
          documentRef.current.style.opacity = '1';
          finalRef.current.style.opacity = '0';
        } else {
          // Frame 2: Final Text (0.5 to 1)
          documentRef.current.style.opacity = '0';
          finalRef.current.style.opacity = '1';
        }
      }
    };

    let ticking = false;
    const rafScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', rafScroll);
    rafScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', rafScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Frame 1: Complex Document */}
        <div ref={documentRef} className="absolute w-2/3 h-2/3 bg-white shadow-lg rounded-lg p-8 border border-gray-200 transition-opacity duration-500" style={{ opacity: 0 }}>
            <div className="h-full overflow-y-auto text-sm text-gray-500" style={{ whiteSpace: 'pre-wrap' }}>
1. Definition of Confidential Information

“Confidential Information” means all non-public, proprietary, or confidential information disclosed by the Disclosing Party to the Receiving Party, whether in written, oral, electronic, or any other form, including but not limited to business plans, strategies, financial information, trade secrets, software, designs, and customer data.

2. Obligations of Receiving Party

The Receiving Party agrees to:
a. Maintain the confidentiality of the Confidential Information with the same degree of care it uses to protect its own confidential information, but no less than reasonable care.
b. Not disclose any Confidential Information to third parties without prior written consent of the Disclosing Party.
c. Use the Confidential Information solely for the purpose of [state the purpose, e.g., evaluating a potential business relationship].

3. Exclusions from Confidential Information

Confidential Information does not include information that:
a. Is or becomes publicly available without breach of this Agreement;
b. Was lawfully known to the Receiving Party before disclosure;
c. Is lawfully obtained from a third party without restriction; or
d. Is independently developed by the Receiving Party without use of or reference to the Confidential Information.

4. Term and Termination

This Agreement shall commence on the Effective Date and continue for [X years] unless terminated earlier by either party with [30 days’] written notice.
The confidentiality obligations shall survive for [X years] after termination.
            </div>
        </div>

        {/* Frame 2: LEGAL EASE */}
        <div ref={finalRef} className="absolute w-2/3 h-2/3 bg-white shadow-lg rounded-lg p-8 border border-gray-200 flex items-center justify-center transition-opacity duration-500" style={{ opacity: 0 }}>
            <div className="relative w-full h-full flex items-center justify-center">
                <h2 className="absolute text-7xl font-serif font-bold text-black whitespace-nowrap">LEGAL EASE</h2>
            </div>
        </div>
      </div>
    </div>
  );
}
