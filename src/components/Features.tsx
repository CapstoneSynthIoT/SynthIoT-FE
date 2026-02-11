import { Zap, Table, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Start Generating Now",
    subtitle: "AM2320 Sensor",
    description: "Realistic temp & humidity with noise, drift, and weather patterns.",
  },
  {
    icon: Table,
    title: "Editable Dataset Interface",
    subtitle: "MS Excel like interface",
    description: "MS Excel like interface for editing the generated dataset.",
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    subtitle: "Natural language",
    description: 'Just say: "Give me 48h of rainy day data" – done.',
  },
];

const Features = () => {
  return (
    <section className="relative py-6">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-shine group rounded-xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:glow-primary"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-foreground">{feature.title}</h3>
              <p className="mb-3 text-sm font-medium text-primary">{feature.subtitle}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
