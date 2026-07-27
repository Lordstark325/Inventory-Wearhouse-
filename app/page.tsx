"use client";

import { useMemo, useState } from "react";

const categories = [
  { icon: "✦", name: "Décor", count: "1,240 items" },
  { icon: "▥", name: "Furniture", count: "860 items" },
  { icon: "◉", name: "Lighting & AV", count: "540 items" },
  { icon: "△", name: "Tents & staging", count: "320 items" },
  { icon: "♬", name: "Entertainment", count: "210 pros" },
  { icon: "◎", name: "Catering", count: "180 teams" },
];

const listings = [
  { id: 1, title: "Natural oak cross-back chair", supplier: "Gathered Hire Co.", place: "Kramerville, Sandton", price: 72, unit: "per chair", stock: 240, rating: "4.9", tag: "Instant booking", tone: "oak", glyph: "♧" },
  { id: 2, title: "Champagne shimmer wall", supplier: "Luxe Scene Studio", place: "Midrand, Gauteng", price: 1850, unit: "per event", stock: 3, rating: "4.8", tag: "Request to book", tone: "gold", glyph: "✦" },
  { id: 3, title: "Festoon lighting package", supplier: "Afterglow Technical", place: "Centurion, Gauteng", price: 3200, unit: "up to 100 guests", stock: 4, rating: "5.0", tag: "Instant booking", tone: "night", glyph: "☼" },
  { id: 4, title: "Modern white cocktail bar", supplier: "Form Event Rentals", place: "Lanseria, Gauteng", price: 2400, unit: "per event", stock: 6, rating: "4.9", tag: "Request to book", tone: "clay", glyph: "▱" },
];

const inventory = [
  { sku: "CHR-014", item: "Oak cross-back chair", total: 240, available: 168, status: "Available" },
  { sku: "TBL-006", item: "Harvest table · 2.4m", total: 36, available: 8, status: "Low stock" },
  { sku: "BAR-009", item: "White cocktail bar", total: 6, available: 0, status: "Booked out" },
  { sku: "LGT-021", item: "Festoon string · 25m", total: 20, available: 14, status: "Available" },
];

export default function Home() {
  const [mode, setMode] = useState<"market" | "supplier">("market");
  const [category, setCategory] = useState("All categories");
  const [location, setLocation] = useState("Johannesburg");
  const [date, setDate] = useState("2026-09-19");
  const [basket, setBasket] = useState<number[]>([1, 3]);
  const [searched, setSearched] = useState(false);
  const basketTotal = useMemo(() => basket.reduce((sum, id) => sum + (listings.find((x) => x.id === id)?.price ?? 0), 0), [basket]);

  const toggleBasket = (id: number) => setBasket((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => setMode("market")} aria-label="Vela home"><span className="brand-mark">V</span><span>VELA</span></button>
        <nav aria-label="Primary navigation">
          <button className={mode === "market" ? "active" : ""} onClick={() => setMode("market")}>Marketplace</button>
          <a href="#how">How it works</a>
          <button className={mode === "supplier" ? "active" : ""} onClick={() => setMode("supplier")}>For suppliers</button>
        </nav>
        <div className="header-actions"><button className="text-button">Sign in</button><button className="dark-button" onClick={() => setMode("supplier")}>List your business <span>↗</span></button></div>
      </header>

      {mode === "market" ? (
        <>
          <section className="hero">
            <div className="eyebrow"><span /> SOUTH AFRICA&apos;S SHARED EVENT WAREHOUSE</div>
            <h1>Everything your event<br />needs. <em>All in one place.</em></h1>
            <p>Discover live inventory from trusted event suppliers. Compare, combine and book across Gauteng—from one simple basket.</p>
            <div className="search-panel" aria-label="Search event inventory">
              <label><span>WHAT DO YOU NEED?</span><select value={category} onChange={(e) => setCategory(e.target.value)}><option>All categories</option>{categories.map((x) => <option key={x.name}>{x.name}</option>)}</select></label>
              <label><span>EVENT DATE</span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
              <label><span>LOCATION</span><select value={location} onChange={(e) => setLocation(e.target.value)}><option>Johannesburg</option><option>Pretoria</option><option>Midrand</option><option>Centurion</option></select></label>
              <button className="search-button" onClick={() => { setSearched(true); document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" }); }}><span>⌕</span> Search availability</button>
            </div>
            <div className="trust-row"><span>✓ Verified suppliers</span><span>◷ Live availability</span><span>⌁ One basket, multiple suppliers</span><span>♢ Secure agreements & payments</span></div>
            <div className="hero-shape shape-one" /><div className="hero-shape shape-two" />
          </section>

          <section className="category-section">
            <div className="section-heading"><div><span className="kicker">EXPLORE THE WAREHOUSE</span><h2>Build your event, piece by piece.</h2></div><button className="link-button">View all categories <span>→</span></button></div>
            <div className="category-grid">{categories.map((x) => <button key={x.name} className="category-card" onClick={() => { setCategory(x.name); document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" }); }}><span className="category-icon">{x.icon}</span><span><strong>{x.name}</strong><small>{x.count}</small></span><b>↗</b></button>)}</div>
          </section>

          <section className="listings-section" id="listings">
            <div className="section-heading"><div><span className="kicker">{searched ? `AVAILABLE IN ${location.toUpperCase()} · ${new Date(date).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }).toUpperCase()}` : "READY WHEN YOU ARE"}</span><h2>{category === "All categories" ? "Popular for your next event." : `${category} for your event.`}</h2></div><button className="link-button">See all results <span>→</span></button></div>
            <div className="listing-grid">{listings.map((item) => (
              <article className="listing-card" key={item.id}>
                <div className={`listing-image ${item.tone}`}><span className="availability">● {item.stock} available</span><span className="product-glyph">{item.glyph}</span><button className="heart" aria-label="Save listing">♡</button></div>
                <div className="listing-body"><span className={`booking-tag ${item.tag === "Instant booking" ? "instant" : "request"}`}>{item.tag}</span><h3>{item.title}</h3><p className="supplier">✓ {item.supplier} <span>★ {item.rating}</span></p><p className="place">⌖ {item.place}</p><div className="listing-foot"><p><strong>R{item.price.toLocaleString()}</strong><small>{item.unit}</small></p><button className={basket.includes(item.id) ? "added" : ""} onClick={() => toggleBasket(item.id)}>{basket.includes(item.id) ? "Added ✓" : "Add +"}</button></div></div>
              </article>
            ))}</div>
          </section>

          <section className="planner" id="how">
            <div><span className="kicker light">ONE EVENT. ONE WORKSPACE.</span><h2>Bring every moving part together.</h2><p>Combine products and professionals from different suppliers while Vela handles availability, separate orders, documents and payment allocation behind the scenes.</p><div className="steps"><span><b>01</b> Tell us about your event</span><span><b>02</b> Build one shared basket</span><span><b>03</b> Confirm, sign and pay</span></div></div>
            <div className="event-card"><div className="event-card-head"><span><small>YOUR EVENT</small><strong>Spring garden wedding</strong></span><span className="event-badge">Planning</span></div><div className="event-meta"><span>19 SEP 2026</span><span>120 GUESTS</span><span>JOHANNESBURG</span></div><div className="event-line"><span className="thumb oak">♧</span><span><strong>240 × Cross-back chairs</strong><small>Gathered Hire Co.</small></span><b>R17,280</b></div><div className="event-line"><span className="thumb night">☼</span><span><strong>Festoon lighting package</strong><small>Afterglow Technical</small></span><b>R3,200</b></div><div className="event-total"><span><small>{basket.length} SUPPLIERS</small><strong>Estimated total</strong></span><b>R{basketTotal.toLocaleString()}</b></div></div>
          </section>
        </>
      ) : (
        <SupplierView onMarketplace={() => setMode("market")} />
      )}

      <footer><div className="brand"><span className="brand-mark">V</span><span>VELA</span></div><p>The shared operating system for South Africa&apos;s event industry.</p><span>Gauteng pilot · 2026</span></footer>
      {mode === "market" && basket.length > 0 && <div className="basket-dock"><span><b>{basket.length}</b><span><strong>Your event basket</strong><small>{basket.length} items · {new Set(basket.map((id) => listings.find((x) => x.id === id)?.supplier)).size} suppliers</small></span></span><span><strong>R{basketTotal.toLocaleString()}</strong><button>Review basket →</button></span></div>}
    </main>
  );
}

function SupplierView({ onMarketplace }: { onMarketplace: () => void }) {
  return <section className="supplier-view">
    <div className="supplier-hero"><span className="kicker light">VELA FOR SUPPLIERS</span><h1>Your inventory should<br />work as hard as you do.</h1><p>Manage stock, bookings and availability in one free workspace—then publish selected items to South Africa&apos;s shared marketplace.</p><div><button className="cream-button">Start free →</button><button className="outline-button" onClick={onMarketplace}>Explore marketplace</button></div></div>
    <div className="dashboard-shell">
      <aside><div className="mini-brand">V</div>{["Overview", "Inventory", "Calendar", "Bookings", "Customers", "Documents", "Reports"].map((x, i) => <span key={x} className={i === 1 ? "selected" : ""}>{["⌂", "▦", "□", "◇", "○", "▤", "↗"][i]} {x}</span>)}</aside>
      <div className="dashboard-main"><div className="dash-head"><div><small>INVENTORY</small><h2>Good morning, Thandi.</h2></div><button>+ Add item</button></div><div className="metrics"><span><small>TOTAL ITEMS</small><b>1,284</b><em>↑ 4% this month</em></span><span><small>AVAILABLE TODAY</small><b>986</b><em>77% of inventory</em></span><span><small>UPCOMING BOOKINGS</small><b>24</b><em>Next 30 days</em></span><span><small>MARKETPLACE REVENUE</small><b>R48.6k</b><em>↑ 12% this month</em></span></div><div className="inventory-panel"><div className="inventory-title"><h3>Inventory</h3><span><button>⌕ Search</button><button>≡ Filter</button></span></div><div className="table-wrap"><table><thead><tr><th>ITEM</th><th>SKU</th><th>TOTAL</th><th>AVAILABLE</th><th>STATUS</th><th>MARKETPLACE</th></tr></thead><tbody>{inventory.map((x, i) => <tr key={x.sku}><td><span className={`table-thumb tone-${i}`}>{["♧", "▭", "▱", "☼"][i]}</span><strong>{x.item}</strong></td><td>{x.sku}</td><td>{x.total}</td><td>{x.available}</td><td><span className={`status ${x.status.replace(" ", "-").toLowerCase()}`}>● {x.status}</span></td><td><span className={`toggle ${i !== 2 ? "on" : ""}`}><i /></span></td></tr>)}</tbody></table></div></div></div>
    </div>
  </section>;
}
