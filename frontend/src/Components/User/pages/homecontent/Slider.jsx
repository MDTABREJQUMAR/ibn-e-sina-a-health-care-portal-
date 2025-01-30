import React from "react";
import { Typography, Button, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import img from "../../assets/Ibn_e_sina.jpg";

const StyledSliderArea = styled("div")`
margin:0px
  position: relative;
  background-image:url(${img}) ;
  background-size: cover;
  background-position: center;
  display:flex;

  align-items:center;

  opacity:1;
  background-color:black;
  height:90vh;

`;
const AnimatedSpan = styled("span")`
  animation: fade-in 2s ease-in-out infinite;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const StyledSingleSlider = styled("div")`
  display: flex;
  align-items: center;
  position:relative;
  z-index:1
`;

const StyledHeroCaption = styled("div")`
  text-align: left;
`;

const Screen = () => {
  const words = ["health", "wellness", "stamina"];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const currentword = words[currentIndex];

  return (
    <StyledSliderArea>
      <div
        style={{ height: "90vh", width: "100%", position: "absolute",background:'rgba(0,0,0,0.5)' }}
      ></div>
      <div className="slider-active">
        <StyledSingleSlider>
          <Container>
            <Grid container>
              <Grid item xs={12} sm={9} md={8} lg={9} xl={7}>
                <StyledHeroCaption>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "black",
                      fontSize: "40px",
                      fontWeight: "bold",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  ></Typography>
                  <Typography
                    variant="h4"
                    component="h1"
                    color={"whitesmoke"}
                    className="cd-headline letters scale"
                  >
                    <p>&nbsp; &nbsp;</p>
                    <p>&nbsp;</p>
                    We care about your{" "}
                    <strong className="cd-words-wrapper">
                      <AnimatedSpan>{currentword}</AnimatedSpan>
                    </strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    data-animation="fadeInLeft"
                    data-delay="0.1s"
                    fontSize={20}
                  >
                    <span
                      style={{ color: "white" }}
                    >
                      Efficient hospital management system streamlining
                      operations, enhancing patient care, and optimizing
                      resource allocation
                    </span>
                  </Typography>
                </StyledHeroCaption>
              </Grid>
            </Grid>
          </Container>
        </StyledSingleSlider>
      </div>
    </StyledSliderArea>
  );
};

export default Screen;
