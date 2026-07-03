import { Outlet } from 'react-router-dom';
import { LayoutShell } from './layout-shell';

export function RootLayout() {
  return (
    <LayoutShell>
      <Outlet />
    </LayoutShell>
  );
}
