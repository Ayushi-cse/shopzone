# AI Engineering Pair Programming Log & Technical Architecture (`Prompts.md`)

This document records the prompt engineering iterations, architectural decision records (ADRs), comprehensive QA test matrix, and the complete 3-minute QA demo video script for **Sprint 06: "ShopZone" SPA Module**.

---

## 🧠 Part 1: AI Pair Programming & Engineering Prompt Iterations

### 🤖 Prompt 1: Client-Side Routing Architecture & State Destruction Defense
**Engineer Query:**
> "I am setting up Phase 1 of our ShopZone e-commerce application using React Router v6. In our enterprise architecture, why does clicking a standard HTML `<a>` tag wipe out our global cart state, whereas `<Link to="...">` preserves it? How should we architect our static routes (`/`, `/shop`, `/contact`) to ensure zero browser reloads?"

**Engineering Analysis & Takeaways:**
- **The Browser Reload Anti-Pattern (Sprint FAQ #2)**: Standard anchor tags `<a href="/shop">` trigger native browser navigation. The browser dispatches an HTTP GET request to the server, discards the existing V8 JavaScript execution context, unmounts React, and re-executes the entire application bundle from scratch. This destroys any in-memory React state (`CartContext`, `AuthContext`) and empties the shopping cart.
- **Client-Side PushState Navigation**: React Router's `<Link>` and `<NavLink>` components intercept the DOM click event via `event.preventDefault()`, push a new history entry onto the browser's `window.history.pushState()`, and notify the `BrowserRouter` subscriber tree. React performs an in-memory component reconciliation, updating the viewport without refreshing the HTML document.
- **Persistent Header Architecture**: Positioned `<Navbar />` outside the `<Routes>` container inside `App.jsx`. By hoisting the navigation bar above the route switch, the navigation UI never unmounts, allowing the Cart badge to maintain seamless continuity across route transitions.

---

### 🤖 Prompt 2: Dynamic Route Data Hydration & React 18 `useEffect` Double Mount
**Engineer Query:**
> "In Phase 1, clicking a product on `/shop` must navigate to `/product/:id` and hydrate the view from `https://dummyjson.com/products/:id`. Why does my `useEffect` fire twice in development (Sprint FAQ #3), and how can I extract the dynamic URL parameter cleanly while handling unmounted component side-effects?"

**Engineering Analysis & Takeaways:**
- **Dynamic Route Extraction**: React Router DOM provides the `useParams()` hook, returning a key-value dictionary of dynamic route tokens (`const { id } = useParams()`).
- **React 18 StrictMode Concurrency Check (Sprint FAQ #3)**: In development, `<React.StrictMode>` intentionally mounts, unmounts, and re-mounts every component to uncover memory leaks, uncleared timers, and non-idempotent side effects.
- **Defensive Subscription Guard**:
  ```javascript
  useEffect(() => {
    let isSubscribed = true;
    const controller = new AbortController();

    async function hydrateProduct() {
      setLoading(true);
      try {
        const payload = await fetchProductById(id, { signal: controller.signal });
        if (isSubscribed) {
          setProduct(payload);
          setSelectedImage(payload.thumbnail || payload.images?.[0]);
        }
      } catch (err) {
        if (isSubscribed && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (isSubscribed) setLoading(false);
      }
    }

    hydrateProduct();

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [id]);
  ```
- **Resilient Fallback Fall-Through**: If the DummyJSON network endpoint experiences rate limiting or latency spikes, the product service safely serves pre-seeded realistic catalog items without crashing the UI.

---

### 🤖 Prompt 3: Global Cart State Management & Duplicate Prevention Logic
**Engineer Query:**
> "Phase 2 mandates the Context API for state management without Redux. When a user clicks 'Add to Cart' from the product view or shop grid, how do we prevent duplicate rows for the same product ID (Sprint FAQ #4), while dynamically re-rendering the Navbar badge and calculating derived aggregates like subtotal, shipping, and tax?"

**Engineering Analysis & Takeaways:**
- **Eliminating Prop Drilling**: Instantiated `CartContext` and `useCart()` custom hook at the root level of the application tree (`App.jsx`). This allows deeply nested components (`ProductCard`, `ProductDetails`, `Navbar`) to consume and mutate the global cart without passing props through intermediate components.
- **Duplicate Prevention Dispatch (Sprint FAQ #4)**: Rather than naively pushing every payload onto the cart array, the dispatch logic checks if `item.id` exists:
  ```javascript
  const addToCart = useCallback((product, qty = 1) => {
    const addQuantity = Math.max(1, Number(qty) || 1);
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: Math.min(item.quantity + addQuantity, item.stock || 99) }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: addQuantity }];
    });
  }, []);
  ```
- **Derived State Optimization with `useMemo`**: Rather than storing `subtotal`, `shipping`, `tax`, and `totalItems` as separate state variables (which could fall out of sync), we compute them as pure derived state via `useMemo([cart])`:
  - `totalItems`: `cart.reduce((sum, i) => sum + i.quantity, 0)`
  - `subtotal`: `cart.reduce((sum, i) => sum + (i.price * i.quantity), 0)`
  - `shipping`: `subtotal >= 50 ? 0 : 9.99` (Free shipping tier incentive)
  - `tax`: `subtotal * 0.08` (8% sales tax calculation)

---

### 🤖 Prompt 4: Production Vercel Deployment & SPA 404 Route Rewrites
**Engineer Query:**
> "When deploying a Single Page Application to Vercel, why does refreshing `/shop` or `/cart` trigger a '404 Not Found' error (Sprint FAQ #1), and how does a `vercel.json` rewrite rule resolve this?"

**Engineering Analysis & Takeaways:**
- **The Static Hosting Routing Conflict**: Traditional web servers (Apache, Nginx, Vercel edge routers) expect incoming URL paths (`/shop`, `/product/3`) to map directly to physical files on the filesystem (`dist/shop/index.html`). Because Vite builds a Single Page Application with only one entry file (`dist/index.html`), the server reports 404 for any client-side route.
- **The Root Rewrite Solution**: By introducing `vercel.json` at the root directory, we instruct Vercel's edge proxy to rewrite all incoming route requests back to `/index.html`:
  ```json
  {
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/"
      }
    ]
  }
  ```
- Once `/index.html` loads, the browser downloads `index.js`, mounts React, and React Router's `BrowserRouter` parses the browser URL (`/shop`), correctly rendering the routed component.

---

### 🤖 Prompt 5: Protected Route Redirection & Preserving User Intent
**Engineer Query:**
> "Phase 3 requires route protection on `/checkout`. If an unauthenticated user tries to access `/checkout`, how do we intercept them, redirect to `/login`, provide a 'Login as Guest' action, and seamlessly bounce them back to `/checkout` without losing their cart or destination?"

**Engineering Analysis & Takeaways:**
- **Route Interception Wrapper**: Architected `<ProtectedRoute>`, wrapping sensitive routes in `App.jsx`.
- **Preserving Navigation State**:
  ```javascript
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  ```
- **Consuming `location.state.from` in `Login.jsx`**:
  ```javascript
  const redirectDestination = location.state?.from?.pathname || '/shop';

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate(redirectDestination, { replace: true });
  };
  ```
- **Session & Cart Persistence**: Synced both `CartContext` and `AuthContext` to `localStorage` (`shopzone_cart_v1` and `shopzone_auth_user`). When the user hard-refreshes on `/checkout` or `/login`, state is hydrated immediately on initial mount via lazy `useState(() => JSON.parse(...))` evaluation.

---

## 🧪 Part 2: Comprehensive Quality Assurance (QA) Test Matrix

| Test ID | Module | Feature Tested | Action Performed | Expected Behavior | Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **QA-01** | Routing (P0) | Static Navigation | Click "Home", "Shop", "Contact" in Navbar | URL updates (`/`, `/shop`, `/contact`), page does NOT reload, active link highlights | ✅ PASS |
| **QA-02** | Routing (P0) | Dynamic Route Hydration | Click product card (#6 CK One) in `/shop` | URL changes to `/product/6`, `useParams()` extracts ID, fetches data, renders images & details | ✅ PASS |
| **QA-03** | State (P1) | Add to Cart Mutation | Click "Add to Bag" on `/product/6` | Item dispatches to `CartContext`, toast pops up, Navbar badge increments dynamically | ✅ PASS |
| **QA-04** | State (P1) | Duplicate Item Handling | Click "Add to Bag" on same product again | Quantity increments without creating duplicate row in cart array (FAQ #4 compliant) | ✅ PASS |
| **QA-05** | State (P1) | Cart Route & Aggregates | Navigate to `/cart` | Selected products list renders with quantity steppers; subtotal, tax, shipping accurately sum | ✅ PASS |
| **QA-06** | State (P2) | LocalStorage Hard Refresh | In `/cart`, trigger browser hard reload (`Ctrl+F5`) | All cart items, quantities, and computed totals survive intact | ✅ PASS |
| **QA-07** | Auth (P2) | Route Interception | While logged out, manually enter `/checkout` in URL | Protected route intercepts, redirects to `/login` with `state: { from: '/checkout' }` notice | ✅ PASS |
| **QA-08** | Auth (P2) | 1-Click Guest Login | Click "Login as Guest" button on `/login` | Global auth toggles to `true`, instantly redirects user to intended `/checkout` destination | ✅ PASS |
| **QA-09** | Checkout (P2)| Order Placement Flow | Fill shipping fields, click "Place Order" | Cart clears, order confirmation screen appears with generated `ORD-XXXXXX` identifier | ✅ PASS |
| **QA-10** | Contact (P0) | Functional Form UI | Submit contact message with name, email, topic | Form validates, presents success confirmation, displays Mr. Nakul sync details | ✅ PASS |

---

## 🎥 Part 3: Complete 3-Minute QA Demo Video Script

**Recording Objective**: Demonstrate all Sprint deliverables (P0, P1, P2) within 180 seconds, explicitly showing the browser URL changing dynamically without a single full page reload.

### Video Timeline & Cue Sheet (180 Seconds Total)

#### ⏱️ 0:00 – 0:30 | Base Routing Architecture (P0)
- **Visual**: Start on browser window at `http://localhost:3000/`. Highlight the address bar.
- **Narrator Script**:
  > *"Hello team, I am presenting the Sprint 06 ShopZone Single Page Application module. Notice our persistent Navbar at the top. When I click 'Shop Inventory', observe the URL bar updating instantly to `/shop` without any browser loading spinner or page reload. Our catalog hydrates live data from DummyJSON. When I click on 'Essence Mascara', React Router pushes the dynamic route `/product/1`. Using `useParams()`, our component extracts the ID and seamlessly hydrates the multi-image gallery, pricing, stock levels, and customer reviews."*

#### ⏱️ 0:30 – 1:15 | Global Cart State & Dynamic Badge (P1)
- **Visual**: On `/product/1`, increment quantity to 2, click "Add to Bag". Show toast notification and Navbar badge updating to "2". Return to `/shop`, click "Add" on a second product.
- **Narrator Script**:
  > *"Next, we demonstrate Global State Management via the Context API with Zero Prop Drilling. On this product, I'll select quantity 2 and click 'Add to Bag'. Notice two things: an instant non-blocking toast appears, and our Navbar Cart Badge immediately updates to '2' without unmounting the header. If I navigate back to the catalog and add another item, the badge dynamically reflects '3'. If I re-add the same product, our dispatch logic detects the existing ID and increments the quantity rather than creating a duplicate row, satisfying FAQ #4."*

#### ⏱️ 1:15 – 1:50 | Cart Route & Aggregate Calculations (P1)
- **Visual**: Click the Cart Icon in Navbar. Transition to `/cart`. Adjust quantity steppers.
- **Narrator Script**:
  > *"Now I click into `/cart`. Here we map over all selected items with full controls to increment, decrement, or remove items. Notice our Order Summary sidebar calculating real-time aggregates: Subtotal, Free Shipping tier above $50, and 8% estimated tax, summing to our grand total."*

#### ⏱️ 1:50 – 2:20 | State Persistence Hard Refresh & Route Protection (P2)
- **Visual**: On `/cart`, trigger a hard browser refresh (`Ctrl+F5`). Show cart data persisting. Then click "Proceed to Checkout". Show redirect to `/login`.
- **Narrator Script**:
  > *"To demonstrate Phase 3 state persistence, I am performing a hard browser refresh right now. Notice the URL remains `/cart` and our entire cart state rehydrates instantly from localStorage. Now, I will click 'Proceed to Checkout'. Because I am currently unauthenticated, our `<ProtectedRoute>` interceptor halts unauthorized access and automatically bounces me to `/login`, preserving my destination in location state."*

#### ⏱️ 2:20 – 2:50 | 1-Click Guest Login & Checkout Completion (P2)
- **Visual**: On `/login`, click "Login as Guest (1-Click)". Show automatic bounce to `/checkout`. Click "Place Order". Show order receipt.
- **Narrator Script**:
  > *"On `/login`, I click 'Login as Guest'. Our global auth toggles to true, persists to localStorage, and automatically redirects us forward to `/checkout`. I will review the prefilled shipping information, select simulated card payment, and click 'Place Order'. The transaction authorizes, our cart is automatically cleared, and we receive our unique confirmation order number."*

#### ⏱️ 2:50 – 3:00 | Contact Form & Standup Desk (P0)
- **Visual**: Navigate to `/contact`. Show form and Mr. Nakul's residency contact card.
- **Narrator Script**:
  > *"Finally, on `/contact`, we have our functional static support form and instructions to reach Mr. Nakul through the official residency channel. Thank you!"*

---

## 📞 Part 4: Mid-Pipeline 1-on-1 Standup Prep (Mr. Nakul Sync)

### Standup Talking Points (3-Minute Call Flow)
- **Introduction**: *"Hi Mr. Nakul, this is [Your Name] from the Engineering Residency. Calling for my mandatory 3-minute mid-pipeline sync."*
- **Sprint Experience & Velocity**:
  - *"Sprint 06 is fully architected. Successfully built the ShopZone SPA using React Router DOM, Context API, and DummyJSON endpoints."*
  - *"Implemented all P0 base routes, P1 global state synchronization with duplicate item detection, and P2 protected checkout with 1-click guest authentication and localStorage persistence."*
- **Architectural Solutions & Blockers Addressed**:
  - *"Resolved the SPA 404 refresh conflict by configuring a `vercel.json` wildcard rewrite rule back to root."*
  - *"Defended against React 18 StrictMode double-mounting by utilizing AbortController cleanup in our product hydration hooks."*
- **Career & Pipeline Question**:
  - *"I would love your guidance on how senior teams structure large-scale micro-frontends when scaling beyond a single React Router tree, and any tips for maximizing impact during the remaining residency sprints."*
