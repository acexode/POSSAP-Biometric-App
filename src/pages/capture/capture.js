import React, {useEffect, useRef, useState} from 'react';
import { Box, Card, Grid, Container } from "@material-ui/core";

// components
import Page from "../../components/Page";
import { CapturedDataCarousel, BiometricControl } from "../../components/capture-components";


export default function CapturePage() {
  const [device,setDevice] = useState("")
  const [isDeviceConnected,setIsDeviceConnected] = useState(false)
  const [previewImg, setPreviewImg] = useState();
  const [rightFourFingers, setRightFourFingers] = useState();
  const [leftFourFingers, setLeftFourFingers] = useState();
  const [twoThumbs, setTwoThumbs] = useState();
  const fingerRef = useRef(null);

  const applicantInfo = {
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    cover: "https://d.newsweek.com/en/full/1916156/shorthair-cat-covid.webp?w=790&f=0d5da0facb3b8ddb7a997de2229b34cc",
    images: [
      "https://previews.123rf.com/images/rclassenlayouts/rclassenlayouts1201/rclassenlayouts120100408/18834360-animal-paw-pet-wolf-paw-paw-bear-footprint-animal-paw-cat-paw-fingerprint-impression.jpg",
      "https://previews.123rf.com/images/rclassenlayouts/rclassenlayouts1201/rclassenlayouts120100408/18834360-animal-paw-pet-wolf-paw-paw-bear-footprint-animal-paw-cat-paw-fingerprint-impression.jpg",
      "https://previews.123rf.com/images/rclassenlayouts/rclassenlayouts1201/rclassenlayouts120100408/18834360-animal-paw-pet-wolf-paw-paw-bear-footprint-animal-paw-cat-paw-fingerprint-impression.jpg",
      // "https://images.pexels.com/photos/1774986/pexels-photo-1774986.jpeg?auto=compress&cs=tinysrgb&w=600",
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

  useEffect(()=>{
    function Fun_DeviceInfo() {

      const url = "http://127.0.0.1:11121/rswas/DeviceInfo";
      let xhr;
      const ua = window.navigator.userAgent;
      const msie = ua.indexOf("MSIE ");
      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
      {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new XMLHttpRequest();
      }
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
          const status = xhr.status;

          if (status === 200) {
            const result = JSON.parse(xhr.responseText);
            console.log(result);
            setIsDeviceConnected(result.isConnected)
            if (result.isConnected) {
              setDevice(result?.model)
              console.log("Scanner is Connected..!")
            }
            else {
              console.log("Scanner is not Connected..!")
            }
          }
          else {
            console.log("Device Info : Suprema Service is not Running");

          }
        }
      };
      xhr.send();
    }
    Fun_DeviceInfo()
  },[])

  function Fun_CanvasInfo() {
    const url = "http://127.0.0.1:11121/rswas/CanvasInfo";
    let xhr;
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new XMLHttpRequest();
    }
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {

      if (xhr.readyState === 4) {
        const status = xhr.status;

        if (status === 200) {
          const result = JSON.parse(xhr.responseText);

          if(result.imgData!=="")
          {
            setPreviewImg(result);

            // document.getElementById('img_id').setAttribute('src', "data:image/png;base64,"+result.imgData);
          }
          else
          {
            setPreviewImg(undefined);

            // document.getElementById('img_id').setAttribute('src', "data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==");
          }
        }
        else {
          console.log("Fun_CanvasInfo:Suprema Service is not Ruuning");
          // document.getElementById("dstatus").value="";
        }
      }
    };
    xhr.send();
  }
  function Fun_Live_Preview() {
    setInterval(Fun_CanvasInfo, 30);
  }

  function Fun_LRTCapture(capType) {
    let capMode = "PLAIN";
;
    Fun_Live_Preview();
    fingerRef?.current?.scrollIntoView();
    let mf_value = "";

    const isNewSession_value = "Yes";


    const data = JSON.stringify({
      "captureMode": capMode,
      "captureType": capType,
      "missingFingers": mf_value,
      "imageFormat": "JPEG",
      "isoFMRFormat": "FMR2011",
      "isoFIRFormat": "FIR2011",
      "isNewSession": "Yes"
    });
    console.log(data);

    if(isNewSession_value==="Yes")
    {
      for (let i = 1; i < 11; i++)
      {
        const nfid = "nid" + i;
        const imgid = "img_id" + i;
        console.log({nfid,imgid})
      }
    }

    let xhr;
    const url = "http://127.0.0.1:11121/rswas/Capture";
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
      //IE browser
      //xhr = new ActiveXObject("Microsoft.XMLHTTP");
      xhr = new XMLHttpRequest();
    } else {
      //other browser
      xhr = new XMLHttpRequest();
    }
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const status = xhr.status;
        if (status === 200) {
          const result = JSON.parse(xhr.responseText);
          if(result.errMsg!=="")
            console.log(result);

          const scount = result.slapCount;
          for (let i = 0; i < scount; i++) {
            const stype = result.slaps[i].slapType;
            if(stype==="Left_Slap")
              setLeftFourFingers(result.slaps[i]);
            if(stype==="Two_Thumbs")
              setTwoThumbs(result.slaps[i]);
            if(stype==="Right_Slap")
              setRightFourFingers(result.slaps[i]);
          }


          const fcount = result.fingerCount;
          for (let i = 0; i < fcount; i++) {
            const fidx = result.fingers[i].fingerNo;
            const nfid = "nid" + fidx;
            const imgid = "img_id" + fidx;
            const tempid = "ftemplate" + fidx;

          }
        }
        else {
          console.log("Capture : Suprema RealScan Web Agent Service is not Ruuning");
        }
      }
    };
    xhr.send(data);
  }

  return (
    <Page title="Capture | POSSAP Biometric">
      <Container maxWidth="lg">
        {applicantInfo && (
          <Box sx={{mt: 5, pt:2}} >
            <Card sx={{mt: 2}} >
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <CapturedDataCarousel previewImg={previewImg} twoThumbs={twoThumbs} leftFourFingers={leftFourFingers} rightFourFingers={rightFourFingers} applicantInfo={applicantInfo} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <BiometricControl  applicantInfo={applicantInfo} device={device} Fun_LRTCapture={Fun_LRTCapture} isDeviceConnected={isDeviceConnected} />
                </Grid>
              </Grid>
            </Card>
          </Box>
        )}
      </Container>
    </Page>
  );
}
