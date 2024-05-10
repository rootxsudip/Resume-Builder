import "./SecondSection.css";

function SecondSection() {
    return (
        <div className="PickTemplate">
            <div className="content">
                <h1>Resume Templates for every Career path</h1>
                <p>You can pick one of our handcrafted resume templates above. You can start building <br />your resume in less than 5 seconds, using predefined sections approved by recruiters<br /> worldwide. You can also customize it to your own needs and personality and hit<br /> 'Download'. It's THAT easy to use, even if you've never made a resume in your life before!</p>
            </div>
            <div className="photo">
                <div className="template">
                    <img src="/template0.png" alt="template-0"/>
                    <h2>Creative Resume Template</h2>
                    <p>A resume template as creative as your imagination</p>
                </div>
                <div className="template">
                    <img src="/template1.png" alt="template-1"/>
                    <h2>Professional Resume Template</h2>
                    <p>Put your best foot forward with a professional resume template</p>
                </div>
                <div className="template">
                    <img src="/template2.png" alt="template-2"/>
                    <h2>College Resume Template</h2>
                    <p>No experience? No problem!</p>
                </div>
            </div>
            <button className="discover-button">Discover more Resume Templates</button>
        </div>
    )
}

export default SecondSection;