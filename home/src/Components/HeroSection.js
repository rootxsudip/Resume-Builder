import "./HeroSection.css";

function HeroSection() {
    return(
        <>
        <div className="hero-section">
            <div className="hero">
                <div className="video-container">
                    <video className="hero-video" autoPlay loop muted>
                        <source src="/heroRe.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="text-container">
                    <h1>The Best Online Resume Builder</h1>
                    <p>Easily create the perfect resume for any job using our best-in-class resume builder platform.</p>
                    <button className="create-button">Create now</button>
                    <p className="small">Subscribers have been hired by:-</p>
                </div>
            </div>
            <div className="logo">
                <div className="logo-slide">
                    <div className="slide">
                        <img src="/apple-logo.jpg" alt="Apple logo"/>
                        <img src="/meta-logo.png" alt="Meta logo"/>
                        <img src="/amazon-logo.jpg" alt="Amazon logo"/>
                        <img src="/google-logo.jpg" alt="Google logo"/>
                        <img src="/microsoft-logo.png" alt="Microsoft logo"/>
                        <img src="/tesla-logo.jpg" alt="Tesla logo"/>  
                    </div>

                    <div className="slide">
                        <img src="/apple-logo.jpg" alt="Apple logo"/>
                        <img src="/meta-logo.png" alt="Meta logo"/>
                        <img src="/amazon-logo.jpg" alt="Amazon logo"/>
                        <img src="/google-logo.jpg" alt="Google logo"/>
                        <img src="/microsoft-logo.png" alt="Microsoft logo"/>
                        <img src="/tesla-logo.jpg" alt="Tesla logo"/>  
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    );
}

export default HeroSection;