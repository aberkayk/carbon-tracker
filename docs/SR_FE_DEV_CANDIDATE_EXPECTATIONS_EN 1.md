# Senior Frontend Developer Candidate Expectations (EN)

## 1. Purpose
This document defines candidate expectations for implementing the frontend product described in the BRD.

This is expected to be a production-grade implementation, not a prototype.

## 2. References
- BRD: `SR_FE_DEV_BRD_EN.md`
- Figma file (base): `https://www.figma.com/design/ttptKCMGMKDnVtU0Yo2J7f/CW---Case-Study`

## 3. Mandatory Technology Requirements
- React is mandatory.
- TypeScript is mandatory.
- Strict typing is expected; `any` should be minimal and justified.
- Responsive implementation is mandatory for desktop, tablet, and mobile.

## 4. Mandatory Functional Scope
- Candidate must implement all functional requirements, business rules, and acceptance criteria defined in `SR_FE_DEV_BRD_EN.md`.
- Candidate must follow the interaction behavior and UI intent in Figma while implementing BRD requirements.
- If any ambiguity remains, candidate must document assumptions in `README`.

## 5. Data and Persistence Expectations
### 5.1 Minimum Acceptable
- Local state + `localStorage` persistence

### 5.2 Plus
- Mock API layer (for example: `json-server`, `MSW`, or lightweight Node service)
- Clear separation between data access layer and UI layer

## 6. Engineering Quality Expectations
### 6.1 Mandatory
- Modular and maintainable component architecture
- Business logic isolated from presentational UI (especially calculation logic)
- Robust form validation and explicit error handling
- Code quality baseline:
  - Linting and formatting setup
  - Consistent folder structure
  - Reusable UI patterns

### 6.2 Optional (Plus)
- Explicit empty/loading/error states

## 7. Testing Expectations
### 7.1 Minimum Required
- Unit tests for calculation logic
- At least one integration test for a critical user flow

### 7.2 Strongly Recommended
- Additional integration tests for add/edit/download flows

### 7.3 Plus
- End-to-end tests (for example Playwright/Cypress)

## 8. Delivery and Developer Experience
### 8.1 Mandatory
- Clear `README` including:
  - Setup steps
  - Run steps
  - Build steps
  - Test steps
  - Assumptions
  - Trade-off decisions
- Project must run with standard Node package manager commands.

### 8.2 Plus
- Dockerized setup (`Dockerfile`, optional `docker-compose`)
- CI pipeline for lint/test/build
- Deployment preview link

## 9. Evaluation Criteria
- Functional completeness against BRD
- Correct implementation of interaction rules
- UI fidelity and responsive behavior
- Correctness and consistency of calculation logic
- Code quality and architecture decisions
- Test coverage and reliability
- Documentation and developer experience

### 9.1 Bonus Points
- Mock API architecture quality
- Dockerization quality
- E2E test quality
- Production-grade error handling and observability approach
- Replacing lorem/placeholder text with coherent product copy and consistent UI microcopy

## 10. Submission Checklist
- Source code repository
- Working implementation aligned with BRD and Figma
- README with run/build/test instructions
- Short architecture notes
- Test instructions and results
