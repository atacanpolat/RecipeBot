import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Link,
} from "@material-ui/core";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTeamCardStyles } from "./helpers/styles/landingPageStyles";

import AtaPic from "../images/canpolat_photo.jpeg";
import EmanuelePic from "../images/emanuele_photo.jpg";
import NadiaPic from "../images/nadia_photo.jpg";
import KadirPic from "../images/kadir_photo.png";

const TeamSection = ({
  heading = "Meet These Fine Folks.",
  subheading = "Our Team",
  cards = [
    {
      imageSrc: AtaPic,
      name: "Ata Canpolat",
      links: [
        {
          url: "mailto:ata.canpolat@tum.de",
          icon: EmailIcon,
        },
        {
          url: "https://www.linkedin.com/in/ata-canpolat-106994185/",
          icon: LinkedInIcon,
        },
        {
          url: "https://github.com/atacanpolat",
          icon: GitHubIcon,
        },
      ],
    },
    {
      imageSrc: EmanuelePic,
      name: "Emanuele Salonico",
      links: [
        {
          url: "mailto:emanuele.salonico@tum.de",
          icon: EmailIcon,
        },
        {
          url: "https://www.linkedin.com/in/esalonico/",
          icon: LinkedInIcon,
        },
        {
          url: "https://github.com/esalonico",
          icon: GitHubIcon,
        },
      ],
    },
    {
      imageSrc: NadiaPic,
      name: "Nadia Coguric",
      links: [
        {
          url: "mailto:ge84fas@mytum.de",
          icon: EmailIcon,
        },
        {
          url: "http://www.linkedin.com/in/na%C4%91a-%C4%8Doguri%C4%87-b7526115b",
          icon: LinkedInIcon,
        },
        {
          url: "https://github.com/Nadia1998",
          icon: GitHubIcon,
        },
      ],
    },
    {
      imageSrc: KadirPic,
      name: "Kadir Erdem",
      links: [
        {
          url: "mailto:kadir.erdem@tum.de",
          icon: EmailIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedInIcon,
        },
        {
          url: "https://github.com",
          icon: GitHubIcon,
        },
      ],
    },
  ],
}) => {
  const classes = useTeamCardStyles();

  return (
    <Container style={{ paddingBottom: "80px" }}>
      <Typography variant="h2" className={classes.heading}>
        {heading}
      </Typography>
      <Typography variant="h4" className={classes.subheading}>
        {subheading}
      </Typography>
      <Grid container spacing={6}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className={classes.card}>
              <CardMedia className={classes.cardImage} image={card.imageSrc} />
              <CardContent className={classes.cardContent}>
                <Typography variant="overline" className={classes.position}>
                  {card.position}
                </Typography>
                <Typography variant="h6" className={classes.name}>
                  {card.name}
                </Typography>
                <div className={classes.cardLinks}>
                  {card.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.url}
                      className={classes.link}
                    >
                      {React.createElement(link.icon, {
                        className: classes.icon,
                      })}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamSection;
