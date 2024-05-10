import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./TestimonialCarousal.css";

function TestimonialCarousal() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        adaptiveHeight: true
    };

    const testimonials = [
        {
            id: 1,
            name: "Dani Han",
            rating: 5,
            feedback: "Excellent platform! I found it very easy to create my resume, and the templates are top-notch.",
            photo: "/testimonial(1).jpg"
        },
        {
            id: 2,
            name: "Aaron Scherer",
            rating: 4,
            feedback: "Great service! I was able to create a professional resume in no time. Highly recommended.",
            photo: "/testimonial(2).jpg"
        },
        {
            id: 3,
            name: "Alice Johnson",
            rating: 3,
            feedback: "Good experience overall. Found the resume builder intuitive and user-friendly.",
            photo: "/testimonial(3).jpg"
        },
        {
            id: 4,
            name: "Michael Brown",
            rating: 5,
            feedback: "Amazing tool! Helped me create a standout resume that landed me several job interviews.",
            photo:"testimonial(4).png" 
        }
    ];

    return (
        <>
        <div className="testimonial-carousel">
            <h1>What users say about <span className="purple-text">ResumeSnap</span></h1>
            <Slider {...settings}>
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="testimonial">
                        <div className="user-photo">
                            <img src={testimonial.photo} alt={testimonial.name} />
                        </div>
                        <h3>{testimonial.name}</h3>
                        <div className="rating">
                            {Array.from({ length: testimonial.rating }, (_, i) => (
                                <span key={i} className="star">&#9733;</span>
                            ))}
                        </div>
                        <p className="feedback">"{testimonial.feedback}"</p>
                    </div>
                ))}
            </Slider>
        </div>

        </>
    );
};

export default TestimonialCarousal;