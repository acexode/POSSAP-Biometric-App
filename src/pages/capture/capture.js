import React from 'react';
import { Box, Card, Grid, Container } from "@material-ui/core";

// components
import Page from "../../components/Page";
import { CapturedDataCarousel, BiometricControl } from "../../components/capture-components";


export default function CapturePage() {
  const applicantInfo = {
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    cover: "https://d.newsweek.com/en/full/1916156/shorthair-cat-covid.webp?w=790&f=0d5da0facb3b8ddb7a997de2229b34cc",
    images: [
      "https://previews.123rf.com/images/rclassenlayouts/rclassenlayouts1201/rclassenlayouts120100408/18834360-animal-paw-pet-wolf-paw-paw-bear-footprint-animal-paw-cat-paw-fingerprint-impression.jpg",
      "https://images.pexels.com/photos/1774986/pexels-photo-1774986.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    name: "Nike Air Force 1 NDESTRUKT",
    code: "38BEE270",
    sku: "WW75K5210YW/SV",
    tags: [
      "Dangal",
      "The Sting",
      "2001: A Space Odyssey",
      "Singin' in the Rain",
    ],
    price: 16.19,
    priceSale: 16.19,
    totalRating: 2.5,
    totalReview: 2675,
    ratings: [
      {
        name: "1 Star",
        starCount: 5541,
        reviewCount: 6385,
      },
      {
        name: "2 Star",
        starCount: 3196,
        reviewCount: 2145,
      },
      {
        name: "3 Star",
        starCount: 3097,
        reviewCount: 1986,
      },
      {
        name: "4 Star",
        starCount: 7964,
        reviewCount: 8151,
      },
      {
        name: "5 Star",
        starCount: 1596,
        reviewCount: 3066,
      },
    ],
    colors: [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107",
    ],
    status: "sale",
    inventoryType: "in_stock",
    sizes: [
      "6",
      "7",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
      "10.5",
      "11",
      "11.5",
      "12",
      "13",
    ],
    available: 38,
    description:
      "\n<p><strong><small> SPECIFICATION</small></strong></p>\n<p>Leather panels. Laces. Rounded toe. Rubber sole.\n<br /><br />\n<p><strong><small> MATERIAL AND WASHING INSTRUCTIONS</small></strong></p>\n<p>Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole: 100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued.</p>\n",
    sold: 563,
    createdAt: "2023-08-13T20:30:14.387Z",
    category: "Shose",
    gender: "Kids",
  };

  return (
    <Page title="Capture | POSSAP Biometric">
      <Container maxWidth="lg">
        {applicantInfo && (
          <Box sx={{mt: 5, pt:2}} >
            <Card sx={{mt: 2}} >
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <CapturedDataCarousel applicantInfo={applicantInfo} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <BiometricControl applicantInfo={applicantInfo} />
                </Grid>
              </Grid>
            </Card>
          </Box>
        )}
      </Container>
    </Page>
  );
}
