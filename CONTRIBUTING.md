# Contributing to SiteForge

Thank you for your interest in contributing to SiteForge! We welcome contributions to improve the studio UI, add new section layout variants, expand the curated asset vault, or author new industry archetypes.

---

## 🛠️ Development Workflow

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/site-generator-app.git
   cd site-generator-app/builder-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up local environment**:
   ```bash
   cp .env.example .env
   npx prisma migrate dev
   npm run seed:admin
   ```

4. **Run the local development server**:
   ```bash
   npm run dev
   ```

5. **Verify code quality before submitting PR**:
   ```bash
   # 1. Type check
   npx tsc --noEmit

   # 2. Test the asset vault
   npx tsx src/lib/images/vault.test.ts

   # 3. Test the standalone code assembler
   npx tsx src/lib/assembler.test.ts

   # 4. Production build check
   npm run build
   ```

---

## 🧩 Adding a New Section Layout Variant

To add a new visual layout variant to an existing section (e.g. adding `carousel_3d` to `Hero`):

1. **Update Schema Types**:
   Open `src/site/schema.ts` and add your variant to the corresponding union:
   ```typescript
   export type HeroVariant = 'centered' | 'split' | 'lead_form' | 'asymmetric_bento' | 'carousel_3d';
   ```

2. **Implement the Section Renderer**:
   Open `src/site/sections/Hero.tsx` and implement the layout branch. Ensure:
   - Full dark and light mode support via Tailwind CSS variable tokens.
   - Mobile-first responsiveness (`sm:`, `md:`, `lg:`).
   - Zero layout shifts.

3. **Update Studio Inspector Controls**:
   Open `src/components/studio/panels/SectionEditor.tsx` and add your layout option into the `VariantPicker` so users can switch to it with 1 click.

---

## 🖼️ Adding Assets to the Curated Image Vault

1. Open `src/lib/images/vault.ts`.
2. Add high-resolution Unsplash photo references with full semantic taxonomy:
   ```typescript
   {
     id: 'img-new-01',
     url: 'https://images.unsplash.com/...',
     thumbnailUrl: 'https://images.unsplash.com/...',
     alt: 'Detailed description of subject',
     domain: 'ecommerce',
     category: 'apparel',
     subCategory: 'women_tops',
     role: 'product_thumbnail',
     aspectRatio: '4:5',
     background: 'studio_white',
     tags: ['women', 'linen', 'shirt', 'neutral'],
   }
   ```
3. Run `npx tsx src/lib/images/vault.test.ts` to verify asset integrity.

---

## 📜 Pull Request Guidelines

- Create a descriptive feature branch (`feat/new-bento-hero` or `fix/cart-drawer-mobile`).
- Write clear, concise commit messages following Conventional Commits format (`feat(...)`, `fix(...)`, `docs(...)`).
- Ensure all CI checks and `npm run build` pass cleanly before opening a pull request.
