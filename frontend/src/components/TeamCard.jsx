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
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTeamCardStyles } from "./helpers/styles/landingPageStyles";
import AtaPic from "../images/canpolat_photo.jpeg";

const TeamSection = ({
  heading = "Meet These Fine Folks.",
  subheading = "Our Team",
  cards = [
    {
        imageSrc: AtaPic,
        name: "Ata Canpolat",
        links: [
          {
            url: "https://twitter.com",
            icon: TwitterIcon,
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
      {
        imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80",
        name: "Emanuele Salonico",
        links: [
          {
            url: "https://twitter.com",
            icon: TwitterIcon,
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
      {
        imageSrc: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80",
        name: "Nadia Coguric",
        links: [
          {
            url: "https://twitter.com",
            icon: TwitterIcon,
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
      {
        imageSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&facepad=2.95&w=512&h=512&q=80",
        name: "Kadir Erdem",
        links: [
          {
            url: "https://twitter.com",
            icon: TwitterIcon,
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
      }
  ],
}) => {
  const classes = useTeamCardStyles();

  return (
    <Container style={{paddingBottom:'80px'}}>
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
              <CardMedia
                className={classes.cardImage}
                image={card.imageSrc}
              />
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
                      {React.createElement(link.icon, { className: classes.icon })}
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
