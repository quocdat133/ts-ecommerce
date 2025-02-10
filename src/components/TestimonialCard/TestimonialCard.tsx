import React from "react";

export interface TestimonialData {
  name: string;
  verified: boolean;
  rating: number;
  content: string;
  date?: string;
}

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

export const TestimonialCard: React.FC<TestimonialData> = ({
  name,
  verified,
  rating,
  content,
  date,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Rating Stars */}
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            } fill-current`}
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
        ))}
      </div>

      {/* Name and Verification Badge */}
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        {verified && (
          <svg
            className="w-5 h-5 text-green-500 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        )}
      </div>

      {/* Testimonial Content */}
      <p className="text-gray-600 mb-3">"{content}"</p>

      {/* Posted Date - Only shown if date prop is provided */}
      {date && <p className="text-gray-500 text-sm">{date}</p>}
    </div>
  );
};

const TestimonialGrid: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialGrid;
