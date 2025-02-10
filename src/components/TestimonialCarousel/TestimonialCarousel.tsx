import {
  TestimonialCard,
  TestimonialData,
} from "../TestimonialCard/TestimonialCard";

// TestimonialCarousel.tsx
interface TestimonialCarouselProps {
  testimonials: TestimonialData[];
  currentIndex: number;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  currentIndex,
}) => {
  return (
    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / 3)}%)`,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            {...testimonial} // Spread tất cả properties của testimonial
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
