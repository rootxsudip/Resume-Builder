import "./ChooseUs.css";

function ChooseUs() {
    return (
        <>
        <h1 className="heading">Why use The <span className="purple-text">ResumeSnap</span> Resume builder? </h1>
        <div className="reasons-page">
            <div className="reason">
                <img src="/Free.png" alt="Icon 1" />
                <h2>Free and Premium</h2>
                <p>We offer both free and premium features. Want your resume to have that extra punch? Upgrade to Premium. On a budget? That's OK too - you can use our resume builder completely free of charge.</p>
            </div>
            <div className="reason">
                <img src="/Creative.png" alt="Icon 2" />
                <h2>Creative and Professional Templates</h2>
                <p>Whatever resume template you're looking for, we've got it. Whether it's a classic one or something out of the box, we have what you want.</p>
            </div>
            <div className="reason">
                <img src="/Hidden.png" alt="Icon 3" />
                <h2>No Hidden fees</h2>
                <p>With ResumeSnap, you won't spend hours working on your resume, just to be hit with a hidden paywall. Our resume builder will notify you if you're using any of our premium features in advance </p>
            </div>
            <div className="reason">
                <img src="/ATS.png" alt="Icon 4" />
                <h2>ATS Friendly</h2>
                <p>Our resume templates are ATS friendly, it means your resume won't automatically be rejected because an ATS can't read it.</p>
            </div>
        </div>
        </>
    )
}

export default ChooseUs;