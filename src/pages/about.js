import React from 'react'
import Header from '../components/header';
import MEDitor from "@uiw/react-md-editor";
const markdown = `# About

I'm a computer engineering student at University of California, San Diego. I'm currently a Software Engineer Intern at Northrop Grumman and planned to graduate after winter quarter of 2021. I enjoy skateboarding, skiing, and golf.

# Contact

- [Instagram](https://www.instagram.com/ohheyfriends/)
- [Linkedin](https://www.linkedin.com/in/mikekaufman4/)
- [Github](https://github.com/mikeck1)
- [Facebook](https://www.facebook.com/mikeck/)
- [Twitter](https://twitter.com/ohheyfriends)
`;
const About = () => {
    return (
        <div>
            <Header />
            <div style={{ width: "95%" }}>
                <div className="row">
                    <div className="column">

                    </div>
                    <div className="main-column" style={{ marginTop: "40px" }}>
                        <MEDitor.Markdown source={markdown} />
                    </div>
                    <div className="column">
                    </div>
                </div>
            </div>

        </div>
    )
}
export default About;