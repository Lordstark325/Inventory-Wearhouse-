# Vela Event Marketplace

Vela is a working marketplace prototype for South Africa's event industry. It demonstrates live inventory discovery, verified supplier listings, multi-supplier event baskets, planning workflows, and a supplier inventory dashboard.

## Development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Validate a production build with:

```bash
npm run build
```

## Repository roles

- `Inventory-Wearhouse-` contains the Vinext implementation and privately hosted Vela preview.
- `stockmaster-pro` contains the production Base44 application and remains the source of truth for Base44 data, authentication, storage, and deployment.

See [docs/ENGINEERING_WORKFLOW.md](docs/ENGINEERING_WORKFLOW.md) for the agreed AI-assisted development and review process.
