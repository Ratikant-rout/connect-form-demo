import React from "react";
import heroImage from "../assets/hero.png";

export default function Hero() {
  return (
    <section className="portal-hero">

      <img
        src={heroImage}
        alt=""
        className="portal-hero-image"
      />

      <div className="portal-hero-overlay"></div>

      <div className="portal-hero-content">

        <div className="portal-hero-label">
          ENTERPRISE PLATFORM
        </div>

        <h1>
          Integration &
          <br />
          Connectivity Hub
        </h1>

        <p>
          Connect systems, manage integrations and monitor
          enterprise API activity from one centralized platform.
        </p>

      </div>

    </section>
  );
}