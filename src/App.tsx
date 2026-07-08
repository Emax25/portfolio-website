import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { RootLayout } from '@/components/root-layout';
import { Home } from '@/pages/home';
import { NotFound } from '@/pages/not-found';

const ProjectDetail = lazy(() =>
  import('@/pages/project-detail').then((m) => ({ default: m.ProjectDetail }))
);

const HowIBuild = lazy(() =>
  import('@/pages/how-i-build').then((m) => ({ default: m.HowIBuild }))
);

const Journey = lazy(() =>
  import('@/pages/journey').then((m) => ({ default: m.Journey }))
);

function LoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl space-y-10 animate-pulse">
      <div className="h-8 w-32 bg-muted rounded-md" />
      <div className="space-y-4">
        <div className="h-12 w-3/4 bg-muted rounded-md" />
        <div className="h-6 w-1/4 bg-muted rounded-md" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="h-24 bg-muted rounded-md" />
        <div className="h-24 bg-muted rounded-md" />
        <div className="h-24 bg-muted rounded-md" />
      </div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-muted rounded-md" />
        <div className="h-4 w-5/6 bg-muted rounded-md" />
        <div className="h-4 w-4/5 bg-muted rounded-md" />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route
              path="projects/:slug"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <ProjectDetail />
                </Suspense>
              }
            />
            <Route
              path="how-i-build"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <HowIBuild />
                </Suspense>
              }
            />
            <Route
              path="journey"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Journey />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
