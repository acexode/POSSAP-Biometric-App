import React from 'react';
import Slider from 'react-slick';
import { findIndex } from 'lodash';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
// material
import { alpha, styled } from '@material-ui/core/styles';
import {Box, Typography} from '@material-ui/core';

import LightboxModal from '../LightboxModal';
import CarouselControlsArrowsIndex from '../CarouselControlsArrowsIndex';
import RightDummy from "../../assets/static/home/RightFingers.png"
import LeftDummy from "../../assets/static/home/LeftFingers.png"
import ThumbDummy from "../../assets/static/home/TwoThumbs.png"

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' }
  }
}));

const ThumbWrapperStyle = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  width: THUMB_SIZE,
  overflow: 'hidden',
  height: THUMB_SIZE,
  position: 'relative',
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadiusSm,
  '&:hover': {
    opacity: 0.72,
    transition: theme.transitions.create('opacity')
  },
  '& .isActive': {
    top: 0,
    zIndex: 9,
    opacity: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: theme.shape.borderRadiusSm,
    border: `solid 3px ${theme.palette.primary.main}`,
    backgroundColor: alpha(theme.palette.grey[900], 0.48)
  }
}));

const LargeImgStyle = styled('img')({
  top: 0,
  width: '498px',
  height: '523px',
  objectFit: 'cover',
  position: 'absolute'
});

const ThumbImgStyle = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
});

// ----------------------------------------------------------------------
const defaultImg = "https://previews.123rf.com/images/rclassenlayouts/rclassenlayouts1201/rclassenlayouts120100408/18834360-animal-paw-pet-wolf-paw-paw-bear-footprint-animal-paw-cat-paw-fingerprint-impression.jpg"
LargeItem.propTypes = {
  item: PropTypes.string,
  onOpenLightbox: PropTypes.func
};

function LargeItem({ item, onOpenLightbox }) {
  return (
    <Box sx={{ cursor: 'zoom-in', paddingTop: '100%', position: 'relative',display:"flex",justifyContent:"center",alignItems:"center" }}>

      <LargeImgStyle  id={item?.id} alt={item.img} src={item?.img} onClick={() => onOpenLightbox(item?.img)} />

    </Box>
  );
}

ThumbnailItem.propTypes = {
  item: PropTypes.string
};

function ThumbnailItem({ item }) {
  return (
    <ThumbWrapperStyle>
      <Box className="isActive" />
      <ThumbImgStyle alt="thumb image" src={item}  />
    </ThumbWrapperStyle>
  );
}

export default function CapturedDataCarousel({applicantInfo,previewImg,twoThumbs,leftFourFingers,rightFourFingers, passportImage}) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const imagesLightbox = applicantInfo?.images?.map((_image) => _image);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(imagesLightbox, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };
  useEffect(() => {
   console.log(applicantInfo);
  }, [])

    const capturedImages =[
        {
            id:1,
            title:"Left Hand",
            img: leftFourFingers ? `data:image/${leftFourFingers?.imgType};base64,${leftFourFingers?.imgData}` : previewImg ? `data:image/png;base64,${previewImg.imgData}` : LeftDummy
        },
        {
            id:2,
            title:"Right Hand",
            img: rightFourFingers ? `data:image/${rightFourFingers?.imgType};base64,${rightFourFingers?.imgData}` : previewImg ? `data:image/png;base64,${previewImg.imgData}` : RightDummy
        },
        {
            id:3,
            title:"Two Thumbs",
            img: twoThumbs ? `data:image/${twoThumbs?.imgType};base64,${twoThumbs?.imgData}` : previewImg ? `data:image/png;base64,${previewImg.imgData}` : ThumbDummy

        },
        {
            id:4,
            title:"Passport Image",
            img: passportImage ? passportImage  : defaultImg

        },

    ]

  const settings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next)
  };

  const settings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: applicantInfo.images.length > 4 ? 4 : applicantInfo.images.length
  };

  useEffect(() => {

    setNav1(slider1.current);
    setNav2(slider2.current);
   }, [currentIndex]);

  const handlePrevious = () => {
    slider2.current.slickPrev();
  };

  const handleNext = () => {
    slider2.current.slickNext();
  };

  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            zIndex: 0,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative'
          }}
        >

          <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {capturedImages?.map((item,index) => (
             <>
                 <Typography style={{ textAlign: "center", margin: 2 }}>
                     {" "}
                     <span id="cmsg_id" style={{ fontSize: "15px", fontWeight: "bold" }}>
                    {previewImg?.msg}
                    </span>
                 </Typography> <Typography style={{ textAlign: "center", margin: 2 }}>
                     {" "}
                     <span id="cmsg_id" style={{ fontSize: "15px", fontWeight: "bold" }}>
                    {previewImg?.cmsg}
                    </span>
                 </Typography>
                 <LargeItem key={index} item={item} onOpenLightbox={handleOpenLightbox}   />

             </>
            ))}

          </Slider>
          <CarouselControlsArrowsIndex
            index={currentIndex}
            total={applicantInfo.images.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Box>
      </Box>

      <Box
        sx={{
          my: 3,
          mx: 'auto',
          display:"flex",
          justifyContent:"center",
          '& .slick-current .isActive': { opacity: 1 },
          ...(applicantInfo.length === 1 && { maxWidth: THUMB_SIZE * 1 + 16 }),
          ...(applicantInfo.length === 2 && { maxWidth: THUMB_SIZE * 2 + 32 }),
          ...(applicantInfo.length === 3 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(applicantInfo.length === 4 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(applicantInfo.length >= 5 && { maxWidth: THUMB_SIZE * 6 }),
          ...(applicantInfo.length > 2 && {
            position: 'relative',
            '&:before, &:after': {
              top: 0,
              zIndex: 9,
              content: "''",
              height: '100%',
              position: 'absolute',
              width: (THUMB_SIZE * 2) / 3,
              backgroundImage: (theme) =>
                `linear-gradient(to left, ${alpha(theme.palette.background.paper, 0)} 0%, ${
                  theme.palette.background.paper
                } 100%)`
            },
            '&:after': { right: 0, transform: 'scaleX(-1)' }
          })
        }}
      >
        <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {capturedImages?.map((item,index) => (
            <ThumbnailItem key={index} item={item.img} />
          ))}
        </Slider>
      </Box>

      <LightboxModal
        images={imagesLightbox}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </RootStyle>
  );
}
