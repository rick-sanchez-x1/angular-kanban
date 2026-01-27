# Research & Decisions

## State Management
**Decision**: NgRx Store (Global) + Signals (Component Consumption)
**Rationale**:
- **NgRx Store**: Fits the "optimistic updates" requirement perfectly via Effects. Provides a single source of truth for Tasks and Users.
- **Signals**: Angular 17's `selectSignal` (or `toSignal`) allows components to consume state in a fine-grained, zone-less ready manner.
- **Hybrid Approach**: We will not use `SignalStore` for the root state to ensure compatibility with standard Redux patterns requested (Actions/Effects), but will consume as signals.

## UI Architecture
**Decision**: PrimeNG (Lara Light Blue) + Tailwind CSS
**Rationale**:
- **PrimeNG**: Mandated. Theme is already configured in `angular.json`.
- **Tailwind**: Used for layout (Flexbox/Grid), spacing, and typography.
- **Integration**: PrimeNG components will be used for complex interactive elements (Dialogs, Inputs). Tailwind will handle the board layout and card styling.

## Persistence & Data
**Decision**: Primary: `db.json` (HTTP); Secondary: LocalStorage (Theme & Cache)
**Rationale**:
- **Optimistic Updates**: Required. Action dispatched -> Update Store -> Effect calls API. If API fails -> Undo Action.
- **db.json**: The spec defines this as the backend.
- **LocalStorage**: User input requested "persistence in local storage". We will use this for:
  1. **Theme Preference**: Dark/Light mode state.
  2. **Hydration**: Persist store state to LS to prevent FOUC (Flash of Unstyled Content) or empty state on reload before HTTP returns.

## Testing Strategy
**Decision**: No Automated Testing Stack (Manual Verification Only)
**Rationale**:
- The spec explicitly states no automated testing is required.

## Unknowns Resolved
- **NgRx + Signals**: Solved via `store.selectSignal`.
- **Persistence Conflict**: Resolved via "db.json = Remote, LS = Local Config/Cache".
