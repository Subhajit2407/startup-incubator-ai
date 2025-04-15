
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  name: string;
  position: string;
  avatar: string;
  index: number;
}

function TestimonialCard({ quote, name, position, avatar, index }: TestimonialCardProps) {
  return (
    <Card className={`p-6 shadow-lg border border-border/40 bg-card animate-fade-up animation-delay-${index * 100}`}>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-500 inline-block"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          ))}
        </div>

        <blockquote className="flex-1">
          <p className="text-foreground/80 mb-4 italic">"{quote}"</p>
        </blockquote>

        <div className="flex items-center mt-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-sm text-foreground/60">{position}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Incredible tool! Helped me finalize my pitch deck in 10 minutes. The market validation data alone is worth every penny.",
      name: "Alex Chen",
      position: "Startup Founder",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "After struggling for months to find a viable idea, IdeasAI generated three solid concepts in under an hour. We're now securing seed funding for one of them.",
      name: "Priya Singh",
      position: "Tech Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "The tech stack recommendations saved us weeks of research. We launched our MVP in half the time we expected thanks to the blueprint.",
      name: "Marco Rossi",
      position: "CTO, EduTech Startup",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up">Success Stories</h2>
          <p className="text-xl text-foreground/70 animate-fade-up animation-delay-100">
            See how founders are building successful startups with our AI-powered idea generator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              position={testimonial.position}
              avatar={testimonial.avatar}
              index={index + 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
