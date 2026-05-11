import React, { useState, useEffect, useRef } from "react";
import {
  BLOG_POSTS,
  TRENDING,
  SIM_SCENARIOS,
  GEO_TIPS,
  MICRO_ACTIONS,
} from "../data/mockData";
import MicroFeed from "./MicroFeed";
import XPWidget from "./XPWidget";
import BurnoutWidget from "./BurnoutWidget";
import Chart from "chart.js/auto";

export default function SimulatorSection() {
  const [active, setActive] = useState("save");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const scenario = SIM_SCENARIOS[active];
  const statLabels = [
    "Extra Savings/Year",
    "Life Score Impact",
    "Timeline",
    "Risk Level",
  ];
  const statColors = {
    save: ["var(--teal)", "var(--navy)", "var(--gold)", "var(--teal)"],
    job: ["var(--accent)", "var(--accent)", "var(--accent)", "var(--accent)"],
    gym: ["var(--ink3)", "#6b35a3", "var(--navy)", "var(--teal)"],
    invest: ["var(--teal)", "var(--navy)", "var(--gold)", "var(--gold)"],
    debt: ["var(--teal)", "var(--teal)", "var(--navy)", "var(--teal)"],
  };

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new Chart(chartRef.current.getContext("2d"), {
      type: "line",
      data: {
        labels: ["Now", "6mo", "1yr", "2yr", "3yr", "5yr"],
        datasets: [
          {
            label: "Savings Projection",
            data: scenario.data,
            borderColor: scenario.color,
            backgroundColor: scenario.color + "18",
            borderWidth: 2.5,
            pointBackgroundColor: scenario.color,
            pointRadius: 4,
            tension: 0.45,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: {
              color: "#6a6a8a",
              font: { size: 10, family: "'Inter',sans-serif" },
            },
            grid: { color: "rgba(0,0,0,0.04)" },
          },
          y: {
            ticks: {
              color: "#6a6a8a",
              font: { size: 10 },
              callback: (v) => "$" + v.toLocaleString(),
            },
            grid: { color: "rgba(0,0,0,0.04)" },
          },
        },
      },
    });
  }, [active]);

  return (
    <section
      className="py-5"
      style={{
        background: "var(--cream2)",
        borderTop: "3px solid var(--ink)",
        borderBottom: "3px solid var(--ink)",
      }}
    >
      <div className="container">
        <div className="row g-4 align-items-stretch">
          {/* LEFT */}
          <div className="col-lg-7">
            <div className="sim-card h-100">
              <div className="sim-header">
                <h5>
                  <i className="bi bi-stars me-2"></i>"What If" Life Simulator
                </h5>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.75)",
                    marginTop: "0.25rem",
                    marginBottom: 0,
                  }}
                >
                  Simulate any life or financial decision and see your future
                  projected in a graph.
                </p>
              </div>
              <div className="p-3">
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {Object.entries(SIM_SCENARIOS).map(([key, s]) => (
                    <button
                      key={key}
                      className={`sim-tab-btn ${active === key ? "active" : ""}`}
                      onClick={() => setActive(key)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <canvas ref={chartRef} height="200"></canvas>
                <div className="row g-2 mt-3">
                  {scenario.stats.map((val, i) => (
                    <div className="col-6 col-md-3" key={i}>
                      <div className="sim-stat-box">
                        <div
                          className="sim-stat-val"
                          style={{ color: statColors[active][i] }}
                        >
                          {val}
                        </div>
                        <div className="sim-stat-lbl">{statLabels[i]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Feed + XP + Burnout */}
          <div className="col-lg-5">
            <div className="row g-3 h-100">
              {/* Micro Feed */}
              <div className="col-12">
                <MicroFeed />
              </div>
              {/* XP */}
              <div className="col-sm-6">
                <XPWidget />
              </div>
              {/* Burnout */}
              <div className="col-sm-6">
                <BurnoutWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
