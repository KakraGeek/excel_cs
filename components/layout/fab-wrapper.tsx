/**
 * FAB Wrapper Component
 * 
 * This component wraps the Floating Action Button (FAB) component.
 * The FAB is conditionally rendered based on the current route
 * (hidden on /contact page).
 * 
 * Story: 3.3 - Floating Action Button (FAB)
 */

import FAB from './fab';

/**
 * FABWrapper Component
 * 
 * Wraps the FAB component for integration into the root layout.
 * The FAB component itself handles route-based conditional rendering.
 * 
 * @returns FAB component
 */
export default function FABWrapper() {
  return <FAB />;
}
