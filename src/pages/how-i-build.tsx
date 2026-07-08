import { motion } from 'motion/react';
import { howIBuild } from '@/content/how-i-build';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePageTitle } from '@/lib/use-page-title';
import { useEntranceAnimation } from '@/lib/use-entrance-animation';

export function HowIBuild() {
  usePageTitle('How I Build');

  const animationProps = useEntranceAnimation();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div className="space-y-10" {...animationProps}>
        {/* Intro */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">How I Build</h1>
          <div className="space-y-4 text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {howIBuild.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <section className="space-y-3 pt-4">
          <h2 className="text-2xl font-bold tracking-tight">{howIBuild.philosophy.title}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
            {howIBuild.philosophy.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Toolchain */}
        <section className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold tracking-tight">Toolchain</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {howIBuild.toolchain.map((tool) => (
              <Card key={tool.name} className="border border-border bg-card/40 backdrop-blur-xs">
                <CardHeader>
                  <CardTitle>
                    <Badge variant="outline" className="text-sm px-2.5 py-0.5">
                      {tool.name}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold tracking-tight">Workflow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {howIBuild.workflow.map((stage) => (
              <Card key={stage.stage} className="border border-border bg-card/40 backdrop-blur-xs">
                <CardHeader>
                  <CardTitle>{stage.stage}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Verification */}
        <section className="space-y-3 pt-8 border-t border-border/50">
          <h2 className="text-2xl font-bold tracking-tight">{howIBuild.verification.title}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
            {howIBuild.verification.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
