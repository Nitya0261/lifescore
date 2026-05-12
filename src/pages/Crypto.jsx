import React from "react";
import BlogGrid from "../components/BlogGrid";

export default function Crypto() {
  const coins = [
    { name: "Bitcoin", symbol: "BTC", price: "$72,140.50", change: "+4.2%", up: true },
    { name: "Ethereum", symbol: "ETH", price: "$3,850.20", change: "+2.1%", up: true },
    { name: "Solana", symbol: "SOL", price: "$165.40", change: "-1.5%", up: false },
    { name: "Cardano", symbol: "ADA", price: "$0.52", change: "+0.4%", up: true },
  ];

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* Category Hero */}
      <div style={{ background: "linear-gradient(135deg, #2c3e50, #000000)", color: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: "#f39c12" }}>
            <i className="bi bi-currency-bitcoin me-2"></i>Digital Assets
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem" }}>
            Crypto Markets
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", fontFamily: "var(--serif2)" }}>
            Track the latest movements in Bitcoin, Ethereum, and web3. Cut through the noise and understand the true value of digital assets.
          </p>
        </div>
      </div>

      {/* Ticker Cards */}
      <div className="container" style={{ marginTop: "-2rem", position: "relative", zIndex: 10 }}>
        <div className="row g-3">
          {coins.map((coin, i) => (
            <div className="col-md-3 col-6" key={i}>
              <div style={{ background: "var(--card-bg)", padding: "1.25rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow)", border: "1px solid var(--border)", height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--ink3)", fontWeight: 600 }}>
                    {coin.name}
                  </span>
                  <span style={{ fontSize: "0.65rem", background: "var(--cream2)", padding: "0.15rem 0.4rem", borderRadius: "10px", fontWeight: 700 }}>
                    {coin.symbol}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 900, color: "var(--ink)", margin: "0.3rem 0" }}>
                  {coin.price}
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: coin.up ? "var(--teal)" : "var(--accent)" }}>
                  <i className={`bi bi-arrow-${coin.up ? 'up' : 'down'}-right me-1`}></i>
                  {coin.change} (24h)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-5">
        <BlogGrid />
      </div>
    </div>
  );
}
