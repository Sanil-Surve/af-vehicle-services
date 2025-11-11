import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import one from "@/assets/images/one.jpeg"
import two from "@/assets/images/two.jpeg"
import three from "@/assets/images/three.jpeg"
import four from "@/assets/images/four.jpeg"

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            id: 1,
            title: 'Beautiful Landscapes',
            description: 'Explore stunning mountain views and natural wonders',
            color: 'from-blue-500 to-cyan-500',
            image: one
        },
        {
            id: 2,
            title: 'Urban Architecture',
            description: 'Discover modern cityscapes and iconic buildings',
            color: 'from-purple-500 to-pink-500',
            image: two
        },
        {
            id: 3,
            title: 'Ocean Paradise',
            description: 'Experience the serenity of coastal destinations',
            color: 'from-teal-500 to-emerald-500',
            image: three
        },
        {
            id: 4,
            title: 'Desert Adventures',
            description: 'Journey through vast golden sand dunes',
            color: 'from-orange-500 to-amber-500',
            image: four
        }
    ];

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-950">
                    {/* Carousel Container */}
                    <div className="relative h-96 md:h-[500px]">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                                    ? 'opacity-100 translate-x-0'
                                    : index < currentIndex
                                        ? 'opacity-0 -translate-x-full'
                                        : 'opacity-0 translate-x-full'
                                    }`}
                            >
                                <div className="w-full h-full relative">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    <div className="text-center text-white">
                                        <h2 className="text-4xl md:text-6xl font-bold mb-4">
                                            {slide.title}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-12 h-12" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-12 h-12" />
                    </button>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentIndex
                                    ? 'w-8 h-3 bg-white'
                                    : 'w-3 h-3 bg-white/50 hover:bg-white/75'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;