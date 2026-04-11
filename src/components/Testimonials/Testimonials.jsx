import React from 'react';

// Reusable standard Indian face placeholders (using Unsplash IDs)
const faceUrls = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=150&q=80"
];

// Generate sets for the 3 marquee rows
const generateRow = (offset) => {
  const arr = [];
  const names = ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Neha Gupta", "Vikram Singh"];
  const comments = [
    "Flawless installation. Wiring is completely invisible. Highly highly recommended.",
    "The 4K clarity on the night vision setups completely changed how we secure our warehouse.",
    "Very professional team. They audited our office and placed cameras perfectly.",
    "App integration is seamless. I check on my house from my phone instantly.",
    "Zero downtime. Top tier corporate surveillance service."
  ];
  for (let i = 0; i < 5; i++) {
    arr.push({ id: Math.random(), name: names[(i + offset) % 5], text: comments[(i + offset) % 5], img: faceUrls[(i + offset) % 5] });
  }
  return arr;
};

const defaultRow1 = generateRow(0);
const defaultRow2 = generateRow(2);
const defaultRow3 = generateRow(4);

const Testimonials = ({ 
  title = "Trusted By Hundreds", 
  description = "We've secured over 500 premises across the region. Here is what our partners have to say.",
  row1 = defaultRow1,
  row2 = defaultRow2,
  row3 = defaultRow3
}) => {
  return (
    <section className="hp-testimonials">
      <div className="sec-header animate-on-scroll">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="marquee-container">
        {/* Row 1: Scroll Left */}
        <div className="marquee-row scroll-left">
          {[...row1, ...row1].map((test, idx) => (
            <div key={idx} className="test-card">
              <div className="test-user">
                <img src={test.img} alt={test.name} loading="lazy" />
                <div className="test-info">
                  <h4>{test.name}</h4>
                  <div className="test-stars">★★★★★</div>
                </div>
              </div>
              <p className="test-body">"{test.text}"</p>
            </div>
          ))}
        </div>

        {/* Row 2: Scroll Right */}
        <div className="marquee-row scroll-right">
          {[...row2, ...row2].map((test, idx) => (
            <div key={idx} className="test-card">
              <div className="test-user">
                <img src={test.img} alt={test.name} loading="lazy" />
                <div className="test-info">
                  <h4>{test.name}</h4>
                  <div className="test-stars">★★★★★</div>
                </div>
              </div>
              <p className="test-body">"{test.text}"</p>
            </div>
          ))}
        </div>

        {/* Row 3: Scroll Left */}
        <div className="marquee-row scroll-left">
          {[...row3, ...row3].map((test, idx) => (
            <div key={idx} className="test-card">
              <div className="test-user">
                <img src={test.img} alt={test.name} loading="lazy" />
                <div className="test-info">
                  <h4>{test.name}</h4>
                  <div className="test-stars">★★★★★</div>
                </div>
              </div>
              <p className="test-body">"{test.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
